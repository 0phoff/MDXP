import {useHistory} from 'react-router-dom';
import {useSetRoot} from './use-root.js';
import {useSetDeck} from './use-deck.js';
import {
  next,
  nextSlide,
  previous,
  previousSlide,
  navigate,
  setMode
} from '../util/navigation.js';

const useNavigation = () => {
  const history = useHistory();
  const [root, setRoot] = useSetRoot();
  const [deck, setDeck] = useSetDeck();

  return {
    next: () => {
      next(history, root, deck, setDeck);
    },
    previous: () => {
      previous(history, root, deck, setDeck);
    },
    nextSlide: (step = 0) => {
      nextSlide(history, root, deck, setDeck, step);
    },
    previousSlide: (step = 0) => {
      previousSlide(history, root, deck, setDeck, step);
    },
    navigate: (slide, step = 0, replace = false) => {
      navigate(history, root, deck, setDeck, slide, step, replace);
    },
    setMode: mode => {
      setMode(history, root, deck, setRoot, mode);
    }
  };
};

export default useNavigation;
