import React, {useRef} from 'react';
import Routing from './routing.jsx';
import DeckState from './deck-state.jsx';
import DivSx from './div-sx.jsx';
import Zoom from './zoom.jsx';
import Slide from './slide.jsx';
import Extracted from './extracted.jsx';
import Navigation from './navigation.jsx';
import {PreviewDeckState, NavigationButtons, Time, Notes} from './presenter-tools.jsx';
import useSetMode from '../hooks/use-set-mode.js';
import deckModes from '../util/deck-modes.js';


const PresenterMode = ({children, keyboardTarget, touchTarget, basepath, extracted}) => {
  const element = useRef();
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  useSetMode(deckModes.PRESENTER);
  
  return (
    <div ref={element} tabIndex={-1} onMouseDown={e => e.preventDefault()} style={{width: '100%', height: '100%'}}>
      <Routing>
        <DeckState>
          <Extracted />
          <DivSx
            sx={{
              width: '100%',
              height: '100%',
              padding: '10px',
              display: 'grid',
              gridGap: '10px',
              gridTemplateColumns: '2fr 5fr 3fr',
              gridTemplateRows: '3fr 4fr 1fr 1fr 1fr',
              gridTemplateAreas: '"slide slide preview" "slide slide notes" "navigation navigation notes" ". . notes" "time time notes"',
            }}
          >
            <Zoom sizeReference={element} sx={{gridArea: 'slide'}}>
              <Slide>{children}</Slide>
            </Zoom>

            <Zoom sizeReference={element} sx={{gridArea: 'preview'}} alignX='right'>
              <PreviewDeckState>
                <Slide>{children}</Slide>
              </PreviewDeckState>
            </Zoom>

            <NavigationButtons sx={{gridArea: 'navigation'}} />
            <Time keyboardTarget={keyboardReference} sx={{gridArea: 'time'}} />
            <Notes sx={{gridArea: 'notes'}} />
          </DivSx>
          <Navigation keyboardReference={keyboardReference} touchReference={touchReference} />
        </DeckState>
      </Routing>
    </div>
  );
};

export default PresenterMode;
