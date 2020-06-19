import React from 'react';
import {useMDXComponents} from '@mdx-js/react';
import RootContext from '../util/root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';

const RootState = ({children, ...props}) => {
  const shortCodeComponents = useMDXComponents();
  const [state, setState] = useMerger({
    shortCodeComponents,
    previousMode: deckModes.NORMAL,
    ...props
  });

  return (
    <RootContext.Provider value={[state, setState]}>
      {children}
    </RootContext.Provider>
  );
};

export default RootState;
