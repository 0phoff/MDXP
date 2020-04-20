import React, {useRef} from 'react';
import {Router, Redirect} from '@reach/router';
import Slide from './slide.jsx';
import RootContext from '../util/root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';


const NormalMode = ({children, basepath, ...props}) => {
  // Data
  const element = useRef(null);
  const modepath = basepath + deckModes.properties[deckModes.NORMAL].path + '/';
  const slides = React.Children.only(children).props.children;
  const [state, setState] = useMerger({
    slideLength: slides.length,
    mode: deckModes.NORMAL,
    basepath,
    modepath, 
  });

  return (
    <RootContext.Provider value={[state, setState]}>
      <div ref={element}>
        <Router>
          <Redirect from='/' to={modepath + '0'} noThrow />
          <Redirect from='/:slide' to={modepath + ':slide/0'} noThrow />

          <Slide path=':slide/:step' reference={element}>
            {slides}
          </Slide>
        </Router>
      </div>
    </RootContext.Provider>
  );
};
export default NormalMode;
