import {useEffect} from 'react';
import useRoot from './use-root.js';


const useIndex = (slide) => {
  const {slideLength} = useRoot();
  slide = parseInt(slide);

  // Get slide index
  if (slide >= slideLength) {
    slide = slideLength - 1;
  }
  else if (slide < 0) {
    slide = Math.max(0, slideLength + slide);
  }

  return slide;
};
export default useIndex;
