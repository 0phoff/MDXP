import React, {useContext} from 'react';
import {ContextGroupContext} from './context-group.jsx';

const ContextGroupTester = ({idx}) => {
  const value = useContext(ContextGroupContext);
  return (<p>{value[idx]}</p>);
};

export default ContextGroupTester;
