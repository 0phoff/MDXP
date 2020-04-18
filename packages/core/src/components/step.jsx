/** @jsx jsx */
import {jsx} from 'theme-ui';
import React, {useContext, useEffect, useReducer} from 'react';
import useStep from '../hooks/use-step.js';


export const StepContext = React.createContext([{start: 0, length: 0}]);
StepContext.displayName = 'MDXP/StepContext';


/**
 * Step Component
 * This component generates a step for each of its direct children
 * and can style them depending on their respective order and the current stepIndex.
 * The most common use case is to make items appear or disappear in order.
 * If this component only has one child, it will implement the stepping behaviour on it's children.
 *
 * TODO : add params
 * TODO : add examples
 */
const Step = ({
  children,
  offset=1,
  styles={before: {'visibility': 'hidden'}, after: {'visibility': 'visible'}},
  useSx=false,
}) => {
  // Figure out children
  let rootChild;
  length = React.Children.count(children);
  if (length == 1 && children.props && children.props.hasOwnProperty('children')) {
    rootChild = React.Children.only(children);
    children = rootChild.props.children;
    length = React.Children.count(children);
  }

  // Setup steps
  offset = parseInt(offset);
  const step = useStep(length + offset) - offset;

  // Functions
  const createStyledElement = (child, i, props) => {
    let style = child.props.style;
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

  if (rootChild) {
    return (React.cloneElement(rootChild, null,
      React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))
    ));
  }
  else {
    return (
      <React.Fragment>
        {React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))}
      </React.Fragment>
    );
  }
};
export default Step;
