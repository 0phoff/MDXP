import React from 'react';
import useDeck from '../hooks/use-deck.js';
import deckModes from '../util/deck-modes.js';


const DeckMode = ({children, ...props}) => {
  const [deck, setDeck] = useDeck();
  const ModeComponent = deckModes.properties[deck.mode].component

  return (
    <section {...props}>
    {
      React.Children.map(
        children,
        (child, i) => (React.cloneElement(child, {key: i}))
      )
    }
    </section>
  );
};
export default DeckMode;
