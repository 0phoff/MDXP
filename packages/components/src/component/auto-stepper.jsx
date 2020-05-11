import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDeck, useNavigation} from '@mdxp/core';

const AutoStepper = ({start=0, end=-1, time=1000}) => {
  const {stepIndex, stepLength} = useDeck();
  const {next} = useNavigation();

  start, end, time = parseInt(start), parseInt(end), parseInt(time);
  if (end <= 0) {
    end = stepLength + end;
  }

  useEffect(() => {
    if ((stepIndex >= start) && (stepIndex < end)) {
      const timer = setTimeout(() => {
        if ((stepIndex >= start) && (stepIndex <= end)) {
          next();
        }
      }, time);

      return () => clearTimeout(timer);
    }
  });

  return null;
};

AutoStepper.propTypes = {
  /** Fist stepIndex for the AutoStepper. */
  start: PropTypes.number,

  /** Last stepIndex for the AutoStepper. If you pass 0 or a negative number, it starts to count from the end. */
  end: PropTypes.number,

  /** Time in milliseconds it should wait before automatically stepping. */
  time: PropTypes.number,
};

export default AutoStepper;
