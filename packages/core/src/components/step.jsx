/** @jsx jsx */
import {jsx} from 'theme-ui';
import React, {useContext, useEffect, useReducer} from 'react';
import useStep from '../hooks/use-step.js';
import getComponentType from '../util/component-type.js';


export const StepContext = React.createContext([{start: 0, length: 0}]);
StepContext.displayName = 'MDXP/StepContext';


const renderRegular = (children, createStyledElement) => (
  <React.Fragment>
    {React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))}
  </React.Fragment>
);


const renderSingle = (child, createStyledElement) => {
  const children = child.props.children;

  return (React.cloneElement(child, null,
    React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))
  ));
};


const renderTable = (table, createStyledElement, {useColumns}) => {
  const children = table.props.children;

  if (useColumns) {
    return React.cloneElement(table, null,
      React.Children.map(children, (child) => {
        if (getComponentType(child) === 'tr') {
          let colNum = 0;
          return React.cloneElement(child, null, 
            React.Children.map(child.props.children, (child) => (
              createStyledElement(child, colNum++)
            ))
          );
        }
        else {
          return React.cloneElement(child, null, 
            React.Children.map(child.props.children, (child) => {
              let colNum = 0;
              return React.cloneElement(child, null, 
                React.Children.map(child.props.children, (child) => (
                  createStyledElement(child, colNum++)
                ))
              );
            })
          );
        }
      })
    );
  }
  else {
    let rowNum = 0;
    return React.cloneElement(table, null, 
      React.Children.map(children, (child) => {
        if (getComponentType(child) === 'tr') {
          return createStyledElement(child, rowNum++);
        }
        else {
          return React.cloneElement(child, null,
            React.Children.map(child.props.children, (child) => (
              createStyledElement(child, rowNum++)
            ))
          );
        }
      })
    );
  }
};


const getStepableChildren = (children, {useColumns}) => {
  const length = React.Children.count(children);
  if (length > 1 || !children.hasOwnProperty('props')) {
    return [length, renderRegular];
  }
  else if (getComponentType(children) === 'table') {
    if (useColumns) {
      let colLength = 0;
      React.Children.map(children.props.children, (child) => {
        if (getComponentType(child) === 'tr') {
          colLength = Math.max(colLength, React.Children.count(child.props.children));
        }
        else {
          React.Children.map(child.props.children, (child) => {
            colLength = Math.max(colLength, React.Children.count(child.props.children));
          });
        }
      });
      return [colLength, renderTable];
    }
    else {
      let rowLength = 0;
      React.Children.map(children.props.children, (child) => {
        if (getComponentType(child) === 'tr') {
          rowLength++;
        }
        else {
          React.Children.map(child.props.children, (child) => {
            if (getComponentType(child) === 'tr') {
              rowLength++;
            }
          });
        }
      });
      return [rowLength, renderTable];
    }
  }
  else {
    return [
      React.Children.count(children.props.children),
      renderSingle
    ];
  }
};


/**
 * Step Component
 * This component generates a step for each of its direct children
 * and can style them depending on their respective order and the current stepIndex.
 * The most common use case is to make items appear or disappear in order.
 *
 * If this component only has one child, it will implement the stepping behaviour on it's children.
 * If the child component happens to be a table, it will step through its rows or columns,
 * depending on the `useColumns` parameter.
 *
 * @param   {Integer} offset
 *          Offset to the stepping algorithm; Usually the number of elements you want to show at start (default: 1)
 * @param   {Boolean} useSx
 *          Whether to apply the styles as a `style` or `sx` property (default: false)
 * @param   {Boolean} useColumns
 *          [Tables only] Whether to step through rows or columns of a table (default: false)
 * @param   {object} styles
 *          styles to apply to the child elements
 * @param   {object} styles.before
 *          styles to apply to the child elements before the step reaches them (default: {visibility: 'hidden'})
 * @param   {object} styles.after
 *          styles to apply to the child elements after the step has reached them (default: {visibility: 'visible'})
 * @param   {object} styles.current
 *          styles to apply to the child elements when the step reaches them (default: same as `styles.after`)
 * @param   {object} styles.base
 *          styles to apply to all child elements
 *
 * TODO : add examples
 */
const Step = ({
  children,
  offset=1,
  useSx=false,
  useColumns=false,
  styles={before: {visibility: 'hidden'}, after: {visibility: 'visible'}},
}) => {
  // Figure out children
  const [length, render] = getStepableChildren(children, {useColumns});
  offset = parseInt(offset);
  const step = useStep(length + offset) - offset;
  const createStyledElement = (child, i, props) => {
    let style = useSx ? child.props.sx : child.props.style;
    if (i > step) {
      style = {
        ...style,
        ...styles.base,
        ...styles.before,
      }
    }
    else if (i == step) {
      style = {
        ...style,
        ...styles.base,
        ...(styles.current || styles.after),
      }
    }
    else {
      style = {
        ...style,
        ...styles.base,
        ...styles.after,
      }
    }

    const childProps = {...props};
    if (useSx) {
      childProps.sx = style;
    }
    else {
      childProps.style = style;
    }

    return React.cloneElement(child, childProps);
  };

  return render(children, createStyledElement, {useColumns});
};
export default Step;
