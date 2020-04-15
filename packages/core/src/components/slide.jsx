/** @jsx jsx */
import {jsx} from 'theme-ui';
import React from 'react';
import DeckState from './deck-state.jsx';
import useDeck from '../hooks/use-deck.js';
import useIndex from '../hooks/use-index.js';


const Slide = ({children, slide, step=0, preview=false, sx={}}) => {
  const [deckContext, setDeckContext] = useDeck();
  const [slideIndex, stepIndex] = useIndex(slide, step);

  // Get Content
  const slideElement = React.Children.count(children) == 1 ?
    React.Children.only(children).props.children[slideIndex] : children[slideIndex];
  const state = {
    slideIndex,
    stepIndex,
    stepLength: deckContext._internal.stepLengths[slideIndex],
    preview,
  };

  return (
    <DeckState value={state}>
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
    </DeckState>
  );
};
export default Slide;
