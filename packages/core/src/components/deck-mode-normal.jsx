import React from 'react';
import {Router, Redirect} from '@reach/router';
import Slide from './slide.jsx';
import RootContext from '../root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';


const NormalMode = ({children, basepath, ...props}) => {
  const newBasepath = basepath + deckModes.properties[deckModes.NORMAL].path + '/';
  const slides = React.Children.only(children).props.children;
  const [state, setState] = useMerger({
    slideLength: slides.length,
    mode: deckModes.NORMAL,
  });

  return (
    <RootContext.Provider value={state}>
      <section>
        <Router>
          <Redirect from='/' to={newBasepath + '0'} noThrow />
          <Redirect from='/:slide' to={newBasepath + ':slide/0'} noThrow />

          <Slide path=':slide/:step'>
            {slides}
          </Slide>
        </Router>
      </section>
    </RootContext.Provider>
  );
};
export default NormalMode;
