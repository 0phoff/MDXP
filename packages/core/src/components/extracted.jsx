import React from 'react';
import useRoot from '../hooks/use-root.js';
import useDeck from '../hooks/use-deck.js';

const Extracted = () => {
  const {extracted} = useRoot();
  const {slideIndex} = useDeck();
  return (<React.Fragment>{extracted[slideIndex].extract}</React.Fragment>);
};

export default Extracted;
