import React from 'react';
import {useStep, useDeck} from '@MDXP/core';


const Appear = ({children, ...props}) => {
  const length = React.Children.count(children);
  const step = useStep(length);

  return (
    <React.Fragment>
      {
        React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {style: {visibility: i <= step ? 'visible' : 'hidden'}});
        })
      }
    </React.Fragment>
  );
};
export default Appear;
