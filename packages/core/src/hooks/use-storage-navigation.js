import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useRoot} from './use-root.js';
import {useSetDeck} from './use-deck.js';
import {navigate} from '../util/navigation.js';

const navigationKey = 'MDXP_index';
const separator = '|';

const useStorageNavigation = (enabled = true) => {
  const [focus, setFocus] = useState(document.hasFocus());
  const history = useHistory();
  const root = useRoot();
  const [deck, setDeck] = useSetDeck();
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  // Setup localStorage event listeners
  useEffect(() => {
    if (enabled) { 
      const handleLocalStorage = e => {
        if (e.key === navigationKey) {
          const [slide, step] = e.newValue.split(separator).map(val => parseInt(val));
          if (isNaN(slide) || isNaN(step)) {
            return;
          }

          navigate(history, root, deck, setDeck, slide, step, slide === deck.slideIndex);
        }
      };

      if (!focus) {
        window.addEventListener('storage', handleLocalStorage);
      }

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      return () => {
        window.removeEventListener('storage', handleLocalStorage);
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
      };
    }
  }, [focus, deck, root, enabled]);

  // Set localStorage
  useEffect(() => {
    if (enabled && focus) {
      localStorage.setItem(navigationKey, `${deck.slideIndex} ${separator} ${deck.stepIndex}`);
    }
  }, [enabled, focus, deck.slideIndex, deck.stepIndex]);
};

export default useStorageNavigation;
