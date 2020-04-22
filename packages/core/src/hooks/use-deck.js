import {useContext} from 'react';
import {DeckContext} from '../components/slide.jsx';

export const useDeck = () => useContext(DeckContext)[0];
export default useDeck;

export const useSetDeck = () => useContext(DeckContext);
