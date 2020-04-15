import React from 'react';
import DeckState from './deck-state.jsx';
import Slide from './slide.jsx';
import deckModes from '../util/deck-modes.js';


const PrintMode = ({children, ...props}) => {
  const slides = React.Children.only(children).props.children;
  const state = {
    mode: deckModes.PRINT,
  };

  return (
    <DeckState value={state}>
      <section>
        {
          slides.map((child, i) => (
            <Slide
              slide={i}
              preview
              sx={{width: '100vw', height: '100vh'}}
              key={`slide_${i}`}
            >
              {slides}
            </Slide>
          ))
        }
      </section>
    </DeckState>
  );
};
export default PrintMode;
