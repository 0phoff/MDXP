import {useContext} from 'react';
import {DeckContext} from '../components/slide.jsx';


/**
 * Use Deck Context
 * This hook returns the deck context (read-only).
 *
 * @return  {object} 
 *          Deck context object
 */
export const useDeck = () => useContext(DeckContext)[0];
export default useDeck;


/**
 * Use Deck Context and Setter function
 * This hook returns the deck context and its setter function.
 *
 * Note that you should use the setter function inside of a useEffect().
 *
 * @return  {Array} context
 * @return  {object} context[0]
 *          Deck context object
 * @return  {newState => void} context[1]
 *          Deck context setter, generated with useMerger()
 */
export const useSetDeck = () => useContext(DeckContext);
