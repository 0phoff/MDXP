import deckModes from './deck-modes.js';

export const navigate = (
  history,
  root,
  {mode, slide, step = 0, replace = false}
) => {
  mode = (mode === undefined) ? root.mode : mode;
  const modepath = deckModes.properties[mode]?.path || deckModes.properties[deckModes.NORMAL].path;

  if (replace) {
    history.replace(`/${modepath}/${slide}/${step}`);
  } else {
    history.push(`/${modepath}/${slide}/${step}`);
  }
};

export const next = (history, root, deck) => {
  const {slideIndex, slideLength, stepIndex, stepLength} = deck;

  if (stepIndex < stepLength - 1) {
    navigate(history, root, {slide: slideIndex, step: stepIndex + 1, replace: true});
  } else if (slideIndex < slideLength - 1) {
    navigate(history, root, {slide: slideIndex + 1});
  }
};

export const nextSlide = (history, root, deck, step = 0) => {
  const {slideIndex, slideLength} = deck;

  if (slideIndex < slideLength - 1) {
    navigate(history, root, {slide: slideIndex + 1, step});
  }
};

export const previous = (history, root, deck) => {
  const {slideIndex, stepIndex} = deck;

  if (stepIndex > 0) {
    navigate(history, root, {slide: slideIndex, step: stepIndex - 1, replace: true});
  } else if (slideIndex > 0) {
    navigate(history, root, {slide: slideIndex - 1, step: -1});
  }
};

export const previousSlide = (history, root, deck, step = 0) => {
  const {slideIndex} = deck;

  if (slideIndex > 0) {
    navigate(history, root, {slide: slideIndex - 1, step});
  }
};

export const setMode = (history, root, deck, mode) => {
  const {mode: oldMode} = root;
  if (oldMode === mode) {
    return;
  }

  const {slideIndex, rawStepIndex} = deck;
  navigate(history, root, {mode, slide: slideIndex, step: rawStepIndex});
};
