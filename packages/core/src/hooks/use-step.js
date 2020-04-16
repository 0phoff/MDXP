import {useEffect} from 'react';
import useRoot from './use-root';
import {useDeckWithSetter} from './use-deck.js';


const useStep = (length) => {
  const [deck, setDeck] = useDeckWithSetter();

  let newDeck = {};
  if (length > deck.stepLength) {
    let stepIndex = deck.rawStepIndex;
    if (stepIndex >= length) {
      stepIndex = length - 1;
    }
    else if (stepIndex < 0) {
      stepIndex = Math.max(0, length + stepIndex);
    }

    newDeck.stepLength = length;
    newDeck.stepIndex = stepIndex;
  }

  useEffect(() => {setDeck(newDeck)}, []);
  return deck.preview ? length : newDeck.stepIndex || deck.stepIndex;
};
export default useStep;
