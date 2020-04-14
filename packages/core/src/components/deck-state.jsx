import React from 'react';
import useDeckState from '../hooks/use-deck-state.js';
import useDeck from '../hooks/use-deck.js';


export const DeckContext = React.createContext(undefined);
DeckContext.displayName = 'MDXPresenter/DeckContext';


const DeckState = ({children, value}) => {
  const context = useDeck();
  const [state, setState] = useDeckState(value, context);

  return (
    <DeckContext.Provider value={[state, setState]}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckState;
