import React, {useEffect} from 'react';
import Slide from './slide.jsx';
import RootContext from '../root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';


const PrintMode = ({children, ...props}) => {
  const slides = React.Children.only(children).props.children;
  const [state, setState] = useMerger({
    slideLength: slides.length,
    mode: deckModes.PRINT,
  });

  return (
    <RootContext.Provider value={state}>
      <section>
        {
          slides.map((child, i) => (
            <Slide
              slide={i}
              preview
              sx={{width: '100vw', height: '100vh'}}
              key={`slide_${i}`}
            >
              {slides}
            </Slide>
          ))
        }
      </section>
    </RootContext.Provider>
  );
};
export default PrintMode;
