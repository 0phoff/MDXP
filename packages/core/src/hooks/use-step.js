import {useEffect} from 'react';
import {useSetStep} from './use-deck.js';


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
  const [deck, setStep] = useSetStep();
  useEffect(() => {setStep(length)}, [length]);

  return deck.preview ? length : deck.stepIndex;
};
export default useStep;
