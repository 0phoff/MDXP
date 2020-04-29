import React from 'react';
import {MDXPTypes, setMDXPType} from '@mdxp/core';

export const ContextWrapperContext = React.createContext(null);

const ContextWrapper = ({value, children}) => (
  <ContextWrapperContext.Provider value={value}>
    {children}
  </ContextWrapperContext.Provider>
);
export default setMDXPType(ContextWrapper, MDXPTypes.WRAPPER);
