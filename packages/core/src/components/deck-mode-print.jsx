import React from 'react';
import {useMDXComponents} from '@mdx-js/react';
import Slide from './slide.jsx';
import RootContext from '../util/root-context.js';
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
            <Slide
              slideNum={i}
              preview
              sx={{width: '100vw', height: '100vh'}}
              key={`slide_${i}`}
            >
              {children}
            </Slide>
          ))
        }
      </div>
    </RootContext.Provider>
  );
};

export default PrintMode;
