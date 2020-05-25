import deckModes from './deck-modes.js';

export const navigate = (history, root, deck, setDeckContext, slide, step = 0, replace = false) => {
  const {mode} = root;
  const {slideIndex, slideLength, stepLength} = deck;
  const modepath = deckModes.properties[mode].path;

  const newDeckContext = {
    slideIndex: slide,
    rawStepIndex: step
  };
  if (slide < 0) {
    newDeckContext.slideIndex = slideLength + slide;
  }

  if (slide === slideIndex) {
    if (step >= stepLength) {
      newDeckContext.stepIndex = stepLength - 1;
    } else if (step < 0) {
      newDeckContext.stepIndex = Math.max(0, stepLength + step);
    } else {
      newDeckContext.stepIndex = step;
    }
  } else {
    newDeckContext.stepIndex = 0;
    newDeckContext.stepLength = 1;
  }

  if (replace) {
    history.replace(`/${modepath}/${slide}/${step}`);
  } else {
    history.push(`/${modepath}/${slide}/${step}`);
  }

  setDeckContext(newDeckContext);
};

export const next = (history, root, deck, setDeckContext) => {
  const {slideIndex, slideLength, stepIndex, stepLength} = deck;

  if (stepIndex < stepLength - 1) {
    navigate(history, root, deck, setDeckContext, slideIndex, stepIndex + 1, true);
  } else if (slideIndex < slideLength - 1) {
    navigate(history, root, deck, setDeckContext, slideIndex + 1, 0);
  }
};

export const nextSlide = (history, root, deck, setDeckContext, step = 0) => {
  const {slideIndex, slideLength} = deck;

  if (slideIndex < slideLength - 2) {
    navigate(history, root, deck, setDeckContext, slideIndex + 1, step);
  }
};

export const previous = (history, root, deck, setDeckContext) => {
  const {slideIndex, stepIndex} = deck;

  if (stepIndex > 0) {
    navigate(history, root, deck, setDeckContext, slideIndex, stepIndex - 1, true);
  } else if (slideIndex > 0) {
    navigate(history, root, deck, setDeckContext, slideIndex - 1, -1);
  }
};

export const previousSlide = (history, root, deck, setDeckContext, step = 0) => {
  const {slideIndex} = deck;

  if (slideIndex > 0) {
    navigate(history, root, deck, setDeckContext, slideIndex - 1, step);
  }
};

export const setMode = (history, root, deck, setRootContext, mode) => {
  const {mode: oldMode} = root;
  if (oldMode === mode) {
    return;
  }

  const modepath = deckModes.properties[mode].path || deckModes.properties[deckModes.NORMAL].path;
  const {slideIndex, stepIndex} = deck;

  history.push(`/${modepath}/${slideIndex}/${stepIndex}`);
  setRootContext({mode});
};
