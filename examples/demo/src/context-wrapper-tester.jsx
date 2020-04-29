import React, {useContext} from 'react';
import {ContextWrapperContext} from './context-wrapper.jsx';

const ContextWrapperTester = ({idx}) => {
  const value = useContext(ContextWrapperContext);
  return (<p>{value[idx]}</p>);
};

export default ContextWrapperTester;
