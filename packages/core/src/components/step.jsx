import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useStep from '../hooks/use-step.js';
import useHOReducer from '../hooks/use-ho-reducer.js';
import getComponentType from '../util/component-type.js';

export const StepContext = React.createContext([{start: 0, length: 1, innerLength: 1}]);
StepContext.displayName = 'MDXP/StepContext';

const renderRegular = (children, createStyledElement) => (
  <React.Fragment>
    {React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))}
  </React.Fragment>
);

const renderSingle = (child, createStyledElement) => {
  const children = child.props.children;

  return (React.cloneElement(child, null, React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))
  ));
};

const renderTable = (table, createStyledElement, {useColumns}) => {
  const children = table.props.children;

  if (useColumns) {
    return React.cloneElement(table, null, React.Children.map(children, child => {
      if (getComponentType(child) === 'tr') {
        let colNum = 0;
        return React.cloneElement(child, null, React.Children.map(child.props.children, child => (
          createStyledElement(child, colNum++)
        ))
        );
      }

      return React.cloneElement(child, null, React.Children.map(child.props.children, child => {
        let colNum = 0;
        return React.cloneElement(child, null, React.Children.map(child.props.children, child => (
          createStyledElement(child, colNum++)
        ))
        );
      })
      );
    })
    );
  }

  let rowNum = 0;
  return React.cloneElement(table, null, React.Children.map(children, child => {
    if (getComponentType(child) === 'tr') {
      return createStyledElement(child, rowNum++);
    }

    return React.cloneElement(child, null, React.Children.map(child.props.children, child => (
      createStyledElement(child, rowNum++)
    ))
    );
  })
  );
};

const getStepableChildren = (children, {useColumns}) => {
  const length = React.Children.count(children);
  if (length > 1 || !children.hasOwnProperty('props')) {
    return [length, renderRegular];
  }

  if (getComponentType(children) === 'table') {
    if (useColumns) {
      let colLength = 0;
      React.Children.map(children.props.children, child => {
        if (getComponentType(child) === 'tr') {
          colLength = Math.max(colLength, React.Children.count(child.props.children));
        } else {
          React.Children.map(child.props.children, child => {
            colLength = Math.max(colLength, React.Children.count(child.props.children));
          });
        }
      });
      return [colLength, renderTable];
    }

    let rowLength = 0;
    React.Children.map(children.props.children, child => {
      if (getComponentType(child) === 'tr') {
        rowLength++;
      } else {
        React.Children.map(child.props.children, child => {
          if (getComponentType(child) === 'tr') {
            rowLength++;
          }
        });
      }
    });
    return [rowLength, renderTable];
  }

  return [
    React.Children.count(children.props.children),
    renderSingle
  ];
};

const Step = ({
  children,
  offset = null,
  useColumns = false,
  styles = {before: {visibility: 'hidden'}, after: {visibility: 'visible'}},
  ...props
}) => {
  const [length, render] = getStepableChildren(children, {useColumns});
  const [_, setStep] = useContext(StepContext);
  offset = parseInt(offset) || (setStep ? 0 : 1);
  const [state, setState] = useHOReducer(Array.from({length}, (_, i) => ({
    start: i + offset,
    length: length + offset,
    innerLength: 1
  })));
  const step = useStep(Math.max(...state.map(s => s.length)));

  const setNthState = n => newChildState => {
    setState(oldState => {
      const diffInnerLength = newChildState.innerLength - oldState[n].innerLength;
      const length = oldState[n].length + diffInnerLength;

      return oldState.map((childState, i) => {
        if (i < n) {
          return {...childState, length};
        }

        if (i === n) {
          return {...childState, ...newChildState, length};
        }

        return {...childState, length, start: childState.start + diffInnerLength};
      });
    });
  };

  const createStyledElement = (child, i, props) => {
    const startIndex = state[i].start;
    let style = child.props.style;
    if (startIndex > step) {
      style = {
        ...style,
        ...styles.base,
        ...styles.before
      };
    } else if (startIndex === step) {
      style = {
        ...style,
        ...styles.base,
        ...styles.after,
        ...styles.current
      };
    } else {
      style = {
        ...style,
        ...styles.base,
        ...styles.after
      };
    }

    const childProps = {...props, style};
    return (
      <StepContext.Provider value={[state[i], setNthState(i)]}>
        {React.cloneElement(child, childProps)}
      </StepContext.Provider>
    );
  };

  return (
    <div {...props}>
      {render(children, createStyledElement, {useColumns})}
    </div>
  );
};

Step.propTypes = {
  /** The number of elements you want to show at start. */
  offset: PropTypes.number,

  /** Whether to step through rows or columns of a table. This property is only used if the component has a single table child. */
  useColumns: PropTypes.bool,

  /** Styles that will be applied to the children (see note). */
  styles: PropTypes.shape({
    before: PropTypes.object,
    after: PropTypes.object,
    current: PropTypes.object,
    base: PropTypes.object
  }),

  /** Additional props which will be set to a surrounding div. */
  props: PropTypes.object
};

export default Step;
