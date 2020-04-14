import {useContext} from 'react';
import {DeckContext} from '../components/deck-state.jsx'

export const useDeck = () => useContext(DeckContext);
export default useDeck;
