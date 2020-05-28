import React from 'react';
import DeckState from './deck-state.jsx';
import Extracted from './extracted.jsx';
import Slide from './slide.jsx';
import useSetMode from '../hooks/use-set-mode.js';
import deckModes from '../util/deck-modes.js';

const PrintMode = ({children, basepath, extracted}) => {
  useSetMode(deckModes.PRINT);

  return children.map((_, i) => (
    <DeckState slide={i} step={0} preview={true} key={`slide_${i}`}>
      <Extracted />
      <Slide sx={{width: '100vw', height: '100vh'}}>
        {children}
      </Slide>
    </DeckState>
  ))
};

export default PrintMode;
