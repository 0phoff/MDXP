import React from 'react';
import {useMDXComponents} from '@mdx-js/react';
import RootContext from '../util/root-context.js';
import useMerger from '../hooks/use-merger.js';

const RootState = ({children, ...props}) => {
  const shortCodeComponents = useMDXComponents();
  const [state, setState] = useMerger({
    shortCodeComponents,
    ...props
  });
  
  return (
    <RootContext.Provider value={[state, setState]}>
      {children}
    </RootContext.Provider>
  );
};

export default RootState;
