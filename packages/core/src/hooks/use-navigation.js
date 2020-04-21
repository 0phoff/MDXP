import {useSetRoot} from './use-root.js';
import {useSetDeck} from './use-deck.js';
import {
  next,
  nextSlide,
  previous,
  previousSlide,
  navigate,
  setMode,
} from '../util/navigation.js';


const useNavigation = () => {
  const [root, setRoot] = useSetRoot();
  const [deck, setDeck] = useSetDeck();

  return {
    next:           () => {next(root, deck, setDeck)},
    previous:       () => {previous(root, deck, setDeck)},
    nextSlide:      (step=0) => {nextSlide(root, deck, setDeck, step)},
    previousSlide:  (step=0) => {previousSlide(root, deck, setDeck, step)},
    navigate:       (slide, step=0, replace=false) => {navigate(root, deck, setDeck, slide, step, replace)},
    setMode:        (mode) => {setMode(root, deck, setRoot, mode)},
  };
};
export default useNavigation;
