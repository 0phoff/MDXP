/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import useRoot from '../hooks/use-root.js';
import useMerger from '../hooks/use-merger.js';
import useKeyboard from '../hooks/use-keyboard.js';


export const DeckContext = React.createContext(null);
DeckContext.displayName = 'MDXP/DeckContext';


const getIndex = (slide, slideLength) => {
  if (slide >= slideLength) {
    slide = slideLength - 1;
  }
  else if (slide < 0) {
    slide = Math.max(0, slideLength + slide);
  }

  return slide;
};


const Slide = ({children, slide, reference, step=0, preview=false, sx={}}) => {
  // Data
  const rootContext = useRoot();
  const slideIndex = getIndex(parseInt(slide), rootContext.slideLength);
  const [state, setState] = useMerger({
    mode: rootContext.mode,
    slideLength: rootContext.slideLength,
    slideIndex,
    stepLength: 1,
    stepIndex: 0,
    rawStepIndex: parseInt(step),
    preview,
  });
  const slideElement = React.Children.count(children) == 1 ?
    React.Children.only(children).props.children[slideIndex] : children[slideIndex];

  // Keyboard
  useKeyboard(reference, state, setState);

  return (
    <DeckContext.Provider value={[state, setState]}>
      <article
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
          ...sx
        }}
      >
        {slideElement}
      </article>
    </DeckContext.Provider>
  );
};
export default Slide;
