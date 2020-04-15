import React from 'react';
import {Router, Redirect} from '@reach/router';
import DeckState from './deck-state.jsx';
import deckModes from '../util/deck-modes.js';


const DeckMode = ({children, ...props}) => {
  const basepath = props.basepath ? props.basepath + '/' : '/';
  const slides = React.Children.toArray(children);
  const state = {
    slideLength: slides.length,
    _internal: {
      stepLengths: Array(slides.length).fill(1)
    }
  };

  return (
    <DeckState value={state}>
      <Router {...props}>
        <Redirect from='/' to={basepath + deckModes.properties[deckModes.NORMAL].path} noThrow />
        {
          deckModes.properties.map(({Component, name, path}, i) => (
            <Component path={path} basepath={basepath} key={name}>
              {slides}
            </Component>
          ))
        }
      </Router>
    </DeckState>
  );
};
export default DeckMode;
