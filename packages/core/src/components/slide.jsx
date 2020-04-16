/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import useRoot from '../hooks/use-root.js';
import useMerger from '../hooks/use-merger.js';
import useIndex from '../hooks/use-index.js';


export const DeckContext = React.createContext(undefined);
DeckContext.displayName = 'MDXP/DeckContext';


const Slide = ({children, slide, step=0, preview=false, sx={}}) => {
  const rootContext = useRoot();
  const slideIndex = useIndex(slide);
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
