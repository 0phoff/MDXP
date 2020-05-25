/** @jsx jsx */
import {jsx} from 'theme-ui';
import React, {useEffect} from 'react';
import useDeck from '../hooks/use-deck.js';
import useMerger from '../hooks/use-merger.js';
import useKeyboard from '../hooks/use-keyboard.js';
import useTouch from '../hooks/use-touch.js';
import useStorageNavigation from '../hooks/use-storage-navigation.js';

const Slide = ({
  children,
  keyboardReference,
  touchReference,
  sx = {}
}) => {
  const deck = useDeck();
  const slideElement = children[deck.slideIndex];

  useKeyboard(keyboardReference, !deck.preview);
  useTouch(touchReference, 15, !deck.preview);
  useStorageNavigation(!deck.preview);

  return (
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
  );
};

export default Slide;
