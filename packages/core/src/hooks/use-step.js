import {useContext, useEffect} from 'react';
import {useSetDeck} from './use-deck.js';
import {StepContext} from '../components/step.jsx';

const useStep = length => {
  const [deck, setDeck] = useSetDeck();
  const [step, setStep] = useContext(StepContext);
  const totalLength = length + step.length - step.innerLength;

  const stepUpdater = state => {
    if (totalLength > state.stepLength) {
      let stepIndex = state.rawStepIndex;
      if (stepIndex >= totalLength) {
        stepIndex = totalLength - 1;
      } else if (stepIndex < 0) {
        stepIndex = Math.max(0, totalLength + stepIndex);
      }

      return {
        stepLength: totalLength,
        stepIndex: stepIndex
      };
    }
  };

  useEffect(() => {
    setDeck(stepUpdater);
  }, [totalLength]);

  const newStep = {
    innerLength: length
  };
  useEffect(() => {
    if (setStep) {
      setStep(newStep);
    }
  }, [length]);

  return deck.preview ?
    length - 1 : Math.max(-1, Math.min(length - 1, deck.stepIndex - step.start));
};

export default useStep;
