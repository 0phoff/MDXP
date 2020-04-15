import React from 'react';
import {Router, Redirect} from '@reach/router';
import DeckState from './deck-state.jsx';
import Slide from './slide.jsx';
import deckModes from '../util/deck-modes.js';


const NormalMode = ({children, basepath, ...props}) => {
  const newBasepath = basepath + deckModes.properties[deckModes.NORMAL].path + '/';
  const slides = React.Children.only(children).props.children;
  const state = {
    mode: deckModes.NORMAL,
  };

  return (
    <DeckState value={state}>
      <section>
        <Router>
          <Redirect from='/' to={newBasepath + '0'} noThrow />
          <Redirect from='/:slide' to={newBasepath + ':slide/0'} noThrow />

          <Slide path=':slide/:step'>
            {slides}
          </Slide>
        </Router>
      </section>
    </DeckState>
  );
};
export default NormalMode;
