import PropTypes from 'prop-types';
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

Note.propTypes = {
  /** On which stepIndex to show this note. */
  start: PropTypes.number,

  /** Until which stepIndex to show this note. If the number is smaller or equal to zero, we start counting backwards from the StepLength. */
  end: PropTypes.number,

  children: PropTypes.node
}

export default setMDXPType(Note, MDXPTypes.NOTE);
