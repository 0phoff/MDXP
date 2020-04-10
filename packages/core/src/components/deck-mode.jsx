import React from 'react';
import useDeck from '../hooks/use-deck.js';
import deckModes from '../util/deck-modes.js';


const DeckMode = ({children, ...props}) => {
  const [deck, setDeck] = useDeck();
  const ModeComponent = deckModes.properties[deck.mode].component

  return (
    <ModeComponent {...props}>
      {children}
    </ModeComponent>
  );
};
export default DeckMode;
