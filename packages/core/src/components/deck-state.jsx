import React from 'react';
import useDeckState from '../hooks/use-deck-state.js';
import deckModes from '../util/deck-modes.js';


export const DeckContext = React.createContext([{}, () => {}]);
DeckContext.displayName = 'MDXPresenter/DeckContext';


const DeckState = ({children}) => {
  const [state, setState] = useDeckState({
    slideIndex: 0,
    slideLength: 0,
    stepIndex: 0,
    stepLength: 0,
    mode: deckModes.PRINT
  });

  return (
    <DeckContext.Provider value={[state, setState]}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckState;
