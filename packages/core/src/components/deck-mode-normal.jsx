import React from 'react';
import {Router, Redirect} from '@reach/router';
import DeckState from './deck-state.jsx';
import deckModes from '../util/deck-modes.js';


const Slide = ({children, slideIndex, stepIndex, ...props}) => {
  // Check bounds
  slideIndex = parseInt(slideIndex);
  stepIndex = parseInt(stepIndex);
  // TODO : check if slideIndex/stepIndex are in bounds -> navigate

  // Get Content
  const slide = React.Children.only(children).props.children[slideIndex];
  const state = {
    slideIndex,
    stepIndex,
    stepLength: 1,
  };

  return (
    <DeckState value={state}>
      <article style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        {slide}
      </article>
    </DeckState>
  );
};


const NormalMode = ({children, basepath, ...props}) => {
  const newBasepath = basepath + deckModes.properties[deckModes.NORMAL].path + '/';

  const slides = React.Children.only(children).props.children;
  const state = {
    mode: deckModes.NORMAL,
    slideLength: slides.length,
  };

  return (
    <DeckState value={state}>
      <section>
        <Router>
          <Redirect from='/' to={newBasepath + '0'} noThrow />
          <Redirect from='/:slideIndex' to={newBasepath + ':slideIndex/0'} noThrow />

          <Slide path=':slideIndex/:stepIndex'>
            {slides}
          </Slide>
        </Router>
      </section>
    </DeckState>
  );
};
export default NormalMode;
