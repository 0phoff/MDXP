import {useRootWithSetter} from './use-root.js';
import {useSetDeck} from './use-deck.js';
import {
  next,
  nextSlide,
  previous,
  previousSlide,
  navigate,
  setMode,
} from '../util/navigation.js';


/**
 * Use Navigation functions
 * This hooks returns a number of usefull navigation functions.
 * You can use negative numbers for the slide/step numbers
 * and these functions will compute the correct slide/step numbers, relative to the maximum.
 *
 * @return  {object} navigation
 * @return  {() => void} navigation.next
 *          Navigate to the next step or slide
 * @return  {() => void} navigation.previous
 *          Navigate to the previous step or slide
 * @return  {(step=0:Integer) => void} navigation.nextSlide
 *          Navigate to the next slide and specified step
 * @return  {(step=0:Integer) => void} navigation.previousSlide
 *          Navigate to the previous slide and specified step
 * @return  {(slide:Integer, step=0:Integer, replace:Boolean) => void} navigation.navigate
 *          Navigate to the specified slide and step, deciding whether to replace history or add a new page to it
 * @return  {(mode:deckMode) => void} navigation.setMode
 *          Set the display mode the presentation
 */
const useNavigation = () => {
  const [root, setRoot] = useRootWithSetter();
  const [deck, setDeck] = useSetDeck();

  return {
    next:           () => {next(root, deck, setDeck)},
    previous:       () => {previous(root, deck, setDeck)},
    nextSlide:      (step=0) => {nextSlide(root, deck, setDeck, step)},
    previousSlide:  (step=-1) => {previousSlide(root, deck, setDeck, step)},
    navigate:       (slide, step=0, replace=false) => {navigate(root, deck, setDeck, slide, step, replace)},
    setMode:        (mode) => {setMode(root, deck, setRoot, mode)},
  };
};
export default useNavigation;
