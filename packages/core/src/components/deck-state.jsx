import React, {useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';
import useRoot from '../hooks/use-root.js';
import useMerger from '../hooks/use-merger.js';

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

const DeckState = ({children, slide, step, preview = false}) => {
  const params = useParams();
  const rootContext = useRoot();
  const slideNum = (slide !== undefined) ? parseInt(slide) || 0 : parseInt(params.slide) || 0;
  const stepNum = (step !== undefined) ? parseInt(step) || 0 : parseInt(params.step) || 0;
  const slideIndex = getIndex(slideNum, rootContext.slideLength);
  const [state, setState] = useMerger({
    mode: rootContext.mode,
    slideLength: rootContext.slideLength,
    slideIndex,
    stepLength: 1,
    stepIndex: 0,
    rawStepIndex: stepNum,
    preview
  });

  useLayoutEffect(() => {
    if (slideIndex !== state.slideIndex) {
      setState({slideIndex, rawStepIndex: stepNum, stepIndex: 0, stepLength: 1});
    } else if ((stepNum !== state.rawStepIndex)) {
      setState({rawStepIndex: stepNum});
    }
  }, [slideIndex, stepNum]);

  useLayoutEffect(() => {
    if (rootContext.mode !== state.mode) {
      setState({mode: rootContext.mode});
    }
  }, [rootContext.mode]);

  return (
    <DeckContext.Provider value={[state, setState]}>
      {children}
    </DeckContext.Provider>
  );
};

export default DeckState;
