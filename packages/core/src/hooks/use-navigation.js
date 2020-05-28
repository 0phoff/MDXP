import {useHistory} from 'react-router-dom';
import useRoot from './use-root.js';
import useDeck from './use-deck.js';
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
  const root = useRoot();
  const deck = useDeck();

  return {
    next: () => {
      next(history, root, deck);
    },
    previous: () => {
      previous(history, root, deck);
    },
    nextSlide: (step = 0) => {
      nextSlide(history, root, deck, step);
    },
    previousSlide: (step = 0) => {
      previousSlide(history, root, deck, step);
    },
    navigate: (slide, step = 0, mode, replace = false) => {
      navigate(history, root, {mode, slide, step, replace});
    },
    setMode: mode => {
      setMode(history, root, deck, mode);
    }
  };
};

export default useNavigation;
