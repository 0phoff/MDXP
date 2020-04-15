import useDeck from './use-deck.js';


const useIndex = (slide, step) => {
  const [context] = useDeck();
  slide = parseInt(slide);
  step = parseInt(step);

  // Get slide index
  const {slideLength} = context;
  if (slide >= slideLength) {
    slide = slideLength - 1;
  }
  else if (slide < 0) {
    slide = Math.max(0, slideLength + slide);
  }

  // Get step index
  const stepLength = context._internal.stepLengths[slide];
  if (step >= stepLength) {
    step = stepLength - 1;
  }
  else if (step < 0) {
    step = Math.max(0, stepLength + step);
  }

  return [slide, step];
};
export default useIndex;
