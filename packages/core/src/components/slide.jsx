/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import {useParams} from 'react-router-dom';
import useRoot from '../hooks/use-root.js';
import useMerger from '../hooks/use-merger.js';
import useKeyboard from '../hooks/use-keyboard.js';
import useTouch from '../hooks/use-touch.js';
import useStorageNavigation from '../hooks/use-storage-navigation.js';

export const DeckContext = React.createContext(null);
DeckContext.displayName = 'MDXP/DeckContext';

const getIndex = (slide, slideLength) => {
  if (slide >= slideLength) {
    slide = slideLength - 1;
  } else if (slide < 0) {
    slide = Math.max(0, slideLength + slide);
  }

  return slide;
};

const Slide = ({
  children,
  keyboardReference,
  touchReference,
  slideNum,
  preview = false,
  sx = {}
}) => {
  // Data
  const {slide = slideNum, step = 0} = useParams();
  const rootContext = useRoot();
  const slideIndex = getIndex(parseInt(slide), rootContext.slideLength);
  const slideElement = children[slideIndex];
  const [state, setState] = useMerger({
    mode: rootContext.mode,
    slideLength: rootContext.slideLength,
    slideIndex,
    stepLength: 1,
    stepIndex: 0,
    rawStepIndex: parseInt(step),
    preview
  });

  useKeyboard(keyboardReference, state, setState);
  useTouch(touchReference, state, setState, 25);
  useStorageNavigation(state, setState);

  return (
    <DeckContext.Provider value={[state, setState]}>
      <div
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
          variant: 'mdxp.slide',
          ...sx
        }}
      >
        {slideElement}
      </div>
    </DeckContext.Provider>
  );
};

export default Slide;
