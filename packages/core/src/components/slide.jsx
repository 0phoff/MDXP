/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import useDeck from '../hooks/use-deck.js';

const Slide = ({
  children,
  sx = {},
  ...props
}) => {
  const deck = useDeck();
  const slideElement = children[deck.slideIndex];

  return (
    <React.Fragment>
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
        {...props}
      >
        {slideElement}
      </div>
    </React.Fragment>
  );
};

export default Slide;
