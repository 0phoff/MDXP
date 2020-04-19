import React from 'react';
import {useStep} from '@MDXP/core';


const SteppingComponent = ({children, style}) => {
  const colors = ['red', 'green', 'blue'];
  const step = useStep(colors.length);
  const col = colors[step];

  return React.cloneElement(React.Children.only(children), {style: {...style, color: col}});
}
export default SteppingComponent
