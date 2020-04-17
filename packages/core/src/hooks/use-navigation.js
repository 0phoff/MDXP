import {useRootWithSetter} from './use-root.js';
import {useDeckWithSetter} from './use-deck.js';
import {
  next,
  nextSlide,
  previous,
  previousSlide,
  navigate,
  setMode,
} from '../util/navigation.js';


const useNavigation = () => {
  const [root, setRoot] = useRootWithSetter();
  const [deck, setDeck] = useDeckWithSetter();

  return {
    next:           () => {next(root, deck, setDeck)},
    nextSlide:      (step=0) => {nextSlide(root, deck, setDeck, step)},
    previous:       () => {previous(root, deck, setDeck)},
    previousSlide:  (step=-1) => {previousSlide(root, deck, setDeck, step)},
    navigate:       (slide, step=0, replace=false) => {navigate(root, deck, setDeck, slide, step, replace)},
    setMode:        (mode) => {setMode(root, deck, setRoot, mode)},
  };
};
export default useNavigation;
