import {useEffect} from 'react';
import useRoot from './use-root.js';
import useNavigation from './use-navigation.js';
import deckModes from '../util/deck-modes.js';

const keys = {
  right: 39,
  left: 37,
  up: 38,
  down: 40,
  space: 32,
  g: 71,
  n: 78,
  o: 79,
  p: 80,
  esc: 27,
  pageUp: 33,
  pageDown: 34
};

const useKeyboard = (target, slideNav=true, modeNav=true) => {
  const root = useRoot();
  const {next, nextSlide, previous, previousSlide, setMode} = useNavigation();

  const handleKeyboard = e => {
    const {metaKey, ctrlKey, shiftKey, altKey} = e;
    if (metaKey || ctrlKey) {
      return;
    }

    if (modeNav) {
      if (altKey) {
        switch (e.keyCode) {
        case keys.g:
            if (root.mode === deckModes.GRID) {
              setMode(root.previousMode);
            } else {
              setMode(deckModes.GRID);
            }
            return;

        case keys.n:
            if (root.mode === deckModes.NORMAL) {
              setMode(root.previousMode);
            } else {
              setMode(deckModes.NORMAL);
            }
            return;

        case keys.p:
            if (root.mode === deckModes.PRESENTER) {
              setMode(root.previousMode);
            } else {
              setMode(deckModes.PRESENTER);
            }
            return;
          
        }
      } 
    } 

    if (slideNav) {
      switch (e.keyCode) {
      case keys.left:
      case keys.up:
      case keys.pageUp:
        if (shiftKey) {
          previousSlide();
        } else {
          previous();
        }
        return;

      case keys.right:
      case keys.down:
      case keys.pageDown:
        if (shiftKey) {
          nextSlide();
        } else {
          next();
        }
        return;

      case keys.space:
        if (shiftKey) {
          previous();
        } else {
          next();
        }
        return;

      default:
        break;
      }
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
  }, [root, target, slideNav, modeNav, next, nextSlide, previous, previousSlide, setMode]);
};

export default useKeyboard;
