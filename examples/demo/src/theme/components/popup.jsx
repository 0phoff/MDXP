/** @jsx jsx */
import {useState, useEffect} from 'react';
import {jsx} from 'theme-ui';
import {useDeck, deckModes} from '@mdxp/core';
import {Place} from '@mdxp/components';

// Pop-up message that comes after Xms of inactivity on a certain step.
// USE SPARINGLY as it is quite annoying
const Popup = ({children, time = 5000, step = 0}) => {
  const {stepIndex, mode} = useDeck();
  const [showPopup, setPopup] = useState(false);
  const style = (showPopup && (step === stepIndex) && (mode === deckModes.NORMAL)) ? {
    opacity: 1,
    transition: 'all 0.3s ease-out',
    width: '75%'
  } : {
    opacity: 0,
    transform: 'translate(-50%, 25%)',
    width: '75%'
  };

  useEffect(() => {
    if (step === stepIndex) {
      const timer = setTimeout(() => setPopup(true), time);
      return () => clearTimeout(timer);
    }

    setPopup(false);
  });

  return (
    <Place
      bottom="15px"
      sx={{
        ...style,
        bg: t => t.colors.MDXPYellow.slice(0, -1) + '22)',
        padding: 2,
        paddingLeft: t => t.space[3] - t.space[1],
        borderLeftWidth: t => t.space[1],
        borderLeftStyle: 'solid',
        borderLeftColor: 'MDXPYellow',
        borderRadius: '10px',
        '& p': {my: 0},
        fontSize: 'xsmall',
        lineHeight: '140%'
      }}
    >
      {children}
    </Place>
  );
};

export default Popup;
