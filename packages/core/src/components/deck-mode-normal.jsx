import React, {useRef} from 'react';
import Routing from './routing.jsx';
import DeckState from './deck-state.jsx';
import Extracted from './extracted.jsx';
import Slide from './slide.jsx';
import Navigation from './navigation.jsx';
import useSetMode from '../hooks/use-set-mode.js';
import deckModes from '../util/deck-modes.js';

const NormalMode = ({
  children,
  basepath,
  extracted,
  keyboardTarget,
  touchTarget,
  slideNavigation,
  modeNavigation,
}) => {
  const element = useRef();
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  useSetMode(deckModes.NORMAL);

  return (
    <div ref={element} tabIndex={-1} style={{width: '100%', height: '100%'}}>
      <Routing>
        <DeckState>
          <Extracted />
          <Slide>{children}</Slide>
          <Navigation
            keyboardReference={keyboardReference}
            touchReference={touchReference}
            slideNavigation={slideNavigation}
            modeNavigation={modeNavigation}
          />
        </DeckState>
      </Routing>
    </div>
  );
};

export default NormalMode;
