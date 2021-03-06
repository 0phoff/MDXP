import {useEffect, useState} from 'react';
import useDeck from './use-deck.js';
import useNavigation from './use-navigation.js';

const navigationKey = 'MDXP_index';
const separator = '|';

const useStorageNavigation = (setStorage = true) => {
  const deck = useDeck();
  const {navigate} = useNavigation();
  const [focus, setFocus] = useState(document.hasFocus());
  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  // Setup localStorage event listeners
  useEffect(() => {
    const handleLocalStorage = e => {
      if (e.key === navigationKey) {
        const [slide, step] = e.newValue.split(separator).map(val => parseInt(val));
        if (isNaN(slide) || isNaN(step)) {
          return;
        }

        navigate({slide, step, replace: slide === deck.slideIndex});
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
  }, [focus, deck]);

  // Set localStorage
  useEffect(() => {
    if (focus && setStorage) {
      localStorage.setItem(navigationKey, `${deck.slideIndex} ${separator} ${deck.stepIndex}`);
    }
  }, [setStorage, focus, deck.slideIndex, deck.stepIndex]);
};

export default useStorageNavigation;
