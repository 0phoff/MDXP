import React from 'react';
import {setMDXPGroupType} from '@mdxp/core';

export const ContextGroupContext = React.createContext(null);

const ContextGroup = ({value, children}) => (
  <ContextGroupContext.Provider value={value}>
    {children}
  </ContextGroupContext.Provider>
);
export default setMDXPGroupType(ContextGroup);
