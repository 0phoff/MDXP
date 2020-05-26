import React from 'react';
import RootState from './root-state.jsx';
import DeckState from './deck-state.jsx';
import Slide from './slide.jsx';
import deckModes from '../util/deck-modes.js';

const PrintMode = ({children, basepath, extracted}) => (
  <RootState mode={deckModes.PRINT} basepath={basepath} extracted={extracted} slideLength={children.length}>
    {
      children.map((_, i) => (
        <DeckState slide={i} step={0} preview={true} key={`slide_${i}`}>
          <Slide sx={{width: '100vw', height: '100vh'}}>
            {children}
          </Slide>
        </DeckState>
      ))
    }
  </RootState>
);

export default PrintMode;
