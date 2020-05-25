import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDeck, useNavigation} from '@mdxp/core';

const AutoStepper = ({start=0, end=-1, time=1000}) => {
  const {stepIndex, stepLength, preview} = useDeck();
  const {next} = useNavigation();

  start = parseInt(start);
  end = parseInt(end);
  time = parseInt(time);
  if (end <= 0) {
    end = stepLength + end;
  }

  useEffect(() => {
    if (!preview && document.hasFocus()) {
      if ((stepIndex >= start) && (stepIndex < end)) {
        const timer = setTimeout(() => {
          if ((stepIndex >= start) && (stepIndex <= end)) {
            next();
          }
        }, time);

        return () => clearTimeout(timer);
      }
    }
  });

  return null;
};

AutoStepper.propTypes = {
  /** Fist stepIndex for the AutoStepper. */
  start: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Last stepIndex for the AutoStepper. If you pass 0 or a negative number, it starts to count from the end. */
  end: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** Time in milliseconds it should wait before automatically stepping. */
  time: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default AutoStepper;
