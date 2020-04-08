import {useContext} from 'react';
import {DeckContext} from '../components/deck-state.jsx'

const useDeck = () => useContext(DeckContext);
export default useDeck;
