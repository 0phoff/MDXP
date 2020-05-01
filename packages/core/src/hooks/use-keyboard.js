import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSetRoot} from './use-root.js';
import {
  next,
  nextSlide,
  previous,
  previousSlide,
  setMode as _setMode
} from '../util/navigation.js';

const keys = {
  right: 39,
  left: 37,
  up: 38,
  down: 40,
  space: 32,
  p: 80,
  o: 79,
  g: 71,
  esc: 27,
  pageUp: 33,
  pageDown: 34
};

const useKeyboard = (target, deck, setDeck) => {
  const history = useHistory();
  const [root, _setRoot] = useSetRoot();

  const handleKeyboard = e => {
    const {metaKey, ctrlKey, shiftKey, _altKey} = e;
    if (metaKey || ctrlKey) {
      return;
    }

    switch (e.keyCode) {
    case keys.left:
    case keys.up:
    case keys.pageUp:
      if (shiftKey) {
        previousSlide(history, root, deck, setDeck);
      } else {
        previous(history, root, deck, setDeck);
      }

      break;

    case keys.right:
    case keys.down:
    case keys.pageDown:
      if (shiftKey) {
        nextSlide(history, root, deck, setDeck);
      } else {
        next(history, root, deck, setDeck);
      }

      break;

    case keys.space:
      if (shiftKey) {
        previous(history, root, deck, setDeck);
      } else {
        next(history, root, deck, setDeck);
      }

      break;

    default:
      break;
    }
  };

  useEffect(() => {
    const currentTarget = (target && target.hasOwnProperty('current')) ? target.current : target;
    if (currentTarget) {
      currentTarget.addEventListener('keydown', handleKeyboard);
    }

    return () => {
      if (currentTarget) {
        currentTarget.removeEventListener('keydown', handleKeyboard);
      }
    };
  }, [root, deck, target]);
};

export default useKeyboard;
