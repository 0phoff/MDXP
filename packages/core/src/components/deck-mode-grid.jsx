import React, {useRef} from 'react';
import Routing from './routing.jsx';
import DeckState from './deck-state.jsx';
import Extracted from './extracted.jsx';
import Zoom from './zoom.jsx';
import Slide from './slide.jsx';
import Navigation from './navigation.jsx';
import useDeck from '../hooks/use-deck.js';
import useRoot from '../hooks/use-root.js';
import useNavigation from '../hooks/use-navigation.js'
import useSetMode from '../hooks/use-set-mode.js';
import deckModes from '../util/deck-modes.js';

const GridItem = ({children, element, slide}) => {
  const deck = useDeck();
  const root = useRoot();
  const {navigate} = useNavigation();
  const clickHandler = e => {
    e.preventDefault();
    const step = e.shiftKey ? -1 : 0;
    navigate({slide, step, mode: root.previousMode});
  };

  return (
    <DeckState slide={slide} step={0} preview={true}>
      <Extracted />
      <Zoom
        sizeReference={element}
        alignX='center' scaleOn='width'
        sx={{
          width: '256px',
          m: '5px',
          outline: (slide === deck.slideIndex) ? t => `5px solid ${t.colors.primary}` : 'none',
          userSelect: 'none'
        }}
        onClick={clickHandler}
      >
        <Slide>{children}</Slide>
      </Zoom>
    </DeckState>
  );
};


const GridMode = ({children, keyboardTarget, touchTarget, basepath, extracted}) => {
  const element = useRef();
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  useSetMode(deckModes.GRID);

  return (
    <Routing>
      <DeckState>
        <div
          ref={element}
          style={{
            width: '100%',
            height: '100%',
            padding: '5px',
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            overflowX: 'hidden',
          }}
        >
          {
            children.map((_, i) => (
              <GridItem
                element={element}
                slide={i}
                key={`slide_${i}`}
              >
                {children}
              </GridItem>
            ))
          }
        </div>
        <Navigation
          keyboardReference={keyboardReference}
          touchReference={touchReference}
          slideNav={false}
          storageNav={false}
        />
      </DeckState>
    </Routing>
  );
};

export default GridMode;
