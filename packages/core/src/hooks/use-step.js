import useDeck from './use-deck.js';

const useStep = (length) => {
  const [context, setContext] = useDeck();
  const {slideIndex} = context;
  const {stepLengths} = context._internal;

  if (length > stepLengths[slideIndex]) {
    const internal = {
      ...context._internal,
      stepLengths: [...stepLengths.slice(0, slideIndex), length, ...s.slice(slideIndex+1)],
    }
    setContext({_internal: internal});
  }

  return (context.preview) ? length : context.stepIndex;
}; 
export default useStep;
