import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import useRoot from '../hooks/use-root.js';
import useStep from '../hooks/use-step.js';
import useHOReducer from '../hooks/use-ho-reducer.js';
import getComponentType from '../util/component-type.js';
import getAsComponent from '../util/get-as-component.js';

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

const getStepableChildren = (children, {useColumns, subChildren}) => {
  const length = React.Children.count(children);
  if (!subChildren || length > 1 || !children.hasOwnProperty('props')) {
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
  as: Element = 'div',
  offset = null,
  useColumns = false,
  subChildren = true,
  styles = {before: {visibility: 'hidden'}, after: {visibility: 'visible'}},
  ...props
}) => {
  const [length, render] = getStepableChildren(children, {useColumns, subChildren});
  const [_, setStep] = useContext(StepContext);
  const {shortCodeComponents} = useRoot();
  Element = getAsComponent(Element, shortCodeComponents);

  offset = parseInt(offset);
  if (isNaN(offset)) {
    offset = (setStep ? 0 : 1);
  }

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
    const endIndex = startIndex + state[i].innerLength;

    let style = child.hasOwnProperty('props') ? child.props.style : undefined;
    if (startIndex > step) {
      style = {
        ...style,
        ...styles.base,
        ...styles.before
      };
    } else if ((startIndex <= step) && (endIndex > step)) {
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
    if ((typeof(child) === 'string') || (child instanceof String)) {
      return (
        <StepContext.Provider value={[state[i], setNthState(i)]}>
          <p {...childProps}>{child}</p>
        </StepContext.Provider>
      );
    } else {
      return (
        <StepContext.Provider value={[state[i], setNthState(i)]}>
          {React.cloneElement(child, childProps)}
        </StepContext.Provider>
      );
    }
  };

  return (
    <Element {...props}>
      {render(children, createStyledElement, {useColumns})}
    </Element>
  );
};

Step.propTypes = {
  /** Type of the surrounding styled block. HTML elements will be styled using theme-ui's `Styled.*` components. If you passed any components to your [Deck](#deck), you can access them by writing their name as a string. */
  as: PropTypes.elementType,

  /** The number of elements you want to show at start. Defaults to 0 if used inside another Step component or 1 otherwise. */
  offset: PropTypes.number,

  /** Whether to step through rows or columns of a table. This property is only used if the component has a single table child. */
  useColumns: PropTypes.bool,

  /** Whether to step through children when there is only one child element */
  subChildren: PropTypes.bool,

  /** Styles that will be applied to the children (see note). */
  styles: PropTypes.shape({
    before: PropTypes.object,
    after: PropTypes.object,
    current: PropTypes.object,
    base: PropTypes.object
  }),

  /** Additional props which will be set to a surrounding div. */
  props: PropTypes.object,

  children: PropTypes.node
};

export default Step;
