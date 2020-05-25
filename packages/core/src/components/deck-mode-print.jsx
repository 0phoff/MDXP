import React from 'react';
import {useMDXComponents} from '@mdx-js/react';
import Slide from './slide.jsx';
import RootContext from '../util/root-context.js';
import DeckState from './deck-state.jsx';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';


const PrintMode = ({children}) => {
  const shortCodeComponents = useMDXComponents();
  const [state, setState] = useMerger({
    slideLength: children.length,
    mode: deckModes.PRINT,
    shortCodeComponents,
  });

  return (
    <RootContext.Provider value={[state, setState]}>
      <div>
        {
          children.map((_, i) => (
            <DeckState slide={i} step={0} preview={true} key={`slide_${i}`}>
              <Slide sx={{width: '100vw', height: '100vh'}}>
                {children}
              </Slide>
            </DeckState>
          ))
        }
      </div>
    </RootContext.Provider>
  );
};

export default PrintMode;
