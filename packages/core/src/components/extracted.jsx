import React from 'react';
import useRoot from '../hooks/use-root.js';
import useDeck from '../hooks/use-deck.js';

const Extracted = () => {
  const {extracted} = useRoot();
  const {slideIndex} = useDeck();

  return (
    <React.Fragment>
      {
        extracted.map((slideExtracted, idx) => (
          slideExtracted.extract.map(e => (
            React.cloneElement(e, {slideIndex, slide:idx})
          ))
        ))
      }
    </React.Fragment>
  );
};

export default Extracted;
