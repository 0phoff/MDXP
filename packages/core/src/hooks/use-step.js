import {useEffect} from 'react';
import {useSetDeck} from './use-deck.js';


/**
 * Use Steps
 * This hook requests a number of steps for the current slide.
 * After running this hook, the stepLength of the slide should be at least what you requested (but can be more).
 *
 * @param   {Integer > 0} length
 *          Number of steps you require
 * @return  {Integer > 0}
 *          The current stepIndex you should follow
 */
const useStep = (length) => {
  const [deck, setDeck] = useSetDeck();

  const stepUpdater = (state) => {
    if (length > state.stepLength) {
      let stepIndex = state.rawStepIndex;
      if (stepIndex >= length) {
        stepIndex = length - 1;
      }
      else if (stepIndex < 0) {
        stepIndex = Math.max(0, length + stepIndex);
      }

      return {
        stepLength: length,
        stepIndex: stepIndex,
      };
    }
  };
  useEffect(() => {setDeck(stepUpdater)}, [length]);

  return deck.preview ? length : deck.stepIndex;
};
export default useStep;
