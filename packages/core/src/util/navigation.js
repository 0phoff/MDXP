import {navigate as reachNavigate} from '@reach/router';
import deckModes from './deck-modes.js';


export const navigate = (root, deck, setDeckContext, slide, step=0, replace=false) => {
  const {modepath} = root;
  const {slideIndex, stepLength} = deck;

  const newDeckContext = {
    slideIndex: slide,
    rawStepIndex: step,
  }
  if (slide === slideIndex) {
    if (step >= stepLength) {
      newDeckContext.stepIndex = stepLength - 1;
    }
    else if (step < 0) {
      newDeckContext.stepIndex = Math.max(0, stepLength + step);
    }
    else {
      newDeckContext.stepIndex = step;
    }
  }
  else {
    newDeckContext.stepIndex = 0;
    newDeckContext.stepLength = 1;
  }

  reachNavigate(`${modepath}${slide}/${step}`, {replace});
  setDeckContext(newDeckContext);
};


export const next = (root, deck, setDeckContext) => {
  const {slideIndex, slideLength, stepIndex, stepLength} = deck;

  if (stepIndex < stepLength - 1) {
    navigate(root, deck, setDeckContext, slideIndex, stepIndex + 1, true);
  }
  else if (slideIndex < slideLength - 1) {
    navigate(root, deck, setDeckContext, slideIndex + 1, 0);
  }
};


export const nextSlide = (root, deck, setDeckContext, step=0) => {
  const {slideIndex, slideLength} = deck;

  if (slideIndex < slideLength - 1) {
    navigate(root, deck, setDeckContext, slideIndex + 1, step);
  }
};


export const previous = (root, deck, setDeckContext) => {
  const {slideIndex, stepIndex} = deck;

  if (stepIndex > 0) {
    navigate(root, deck, setDeckContext, slideIndex, stepIndex - 1, true);
  }
  else if (slideIndex > 0){
    navigate(root, deck, setDeckContext, slideIndex - 1, -1);
  }
};


export const previousSlide = (root, deck, setDeckContext, step=0) => {
  const {slideIndex} = deck;
  
  if (slideIndex > 0) {
    navigate(root, deck, setDeckContext, slideIndex - 1, step);
  }
}


export const setMode = (root, deck, setRootContext, mode) => {
  const {slideIndex, stepIndex} = deck;
  const {basepath} = root;
  const modepath = deckModes.properties[mode].path || deckModes.properties[deckModes.NORMAL].path;
  reachNavigate(`${basepath}/${modepath}/${slideIndex}/${stepIndex}`)
  setRootContext({mode, modepath: `/${modepath}/`});
}
