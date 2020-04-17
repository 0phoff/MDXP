import React, {useContext, useEffect, useReducer} from 'react';
import useStep from '../hooks/use-step.js';


export const StepContext = React.createContext([{start: 0, length: 0}]);
StepContext.displayName = 'MDXP/StepContext';


/**
 * Step Component
 * This component generates a step for each of its direct children
 * and can style them depending on their respective order and the current stepIndex.
 * The most common use case is to make items appear or disappear in order.
 *
 * This component behaves differently when it has only one child and that child is one of ol, ul or table.
 * It will then take the list items or table rows (or columns, see paramters) and apply its steps to those elements.
 *
 * TODO : add params
 * TODO : add examples
 */
const Step = ({
  children,
  offset=1,
  styles={before: {'visibility': 'hidden'}, after: {'visibility': 'visible'}},
  useSx=false,
  useColumns=false,
}) => {
  const length = React.Children.count(children);
  const step = useStep(length + offset) - offset;
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

  return (
    <React.Fragment>
      {React.Children.map(children, (child, i) => createStyledElement(child, i, {key: i}))}
    </React.Fragment>
  );
};
export default Step;
