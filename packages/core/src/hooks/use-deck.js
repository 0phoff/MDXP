import {useContext} from 'react';
import {DeckContext} from '../components/slide.jsx';


export const useDeckWithSetter = () => useContext(DeckContext)


const useDeck = () => useContext(DeckContext)[0];
export default useDeck;
