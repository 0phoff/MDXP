import useDeck from '../hooks/use-deck.js';
import MDXPTypes from '../util/mdxp-types.js';
import {setMDXPType} from '../util/mdxp-type-util.jsx';

const Note = ({children, start = 0, end = 0}) => {
  const {stepIndex, stepLength} = useDeck();

  start = parseInt(start);
  if (start < 0) {
    start = stepLength + start;
  }

  end = parseInt(end);
  if (end <= 0) {
    end = stepLength + end;
  }

  if ((stepIndex >= start) && (stepIndex < end)) {
    return children;
  }

  return null;
};

export default setMDXPType(Note, MDXPTypes.NOTE);
