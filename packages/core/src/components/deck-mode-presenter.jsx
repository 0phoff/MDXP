import React, {useRef} from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import {useMDXComponents} from '@mdx-js/react';
import Slide from './slide.jsx';
import DeckState from './deck-state.jsx';
import RootContext from '../util/root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';
import Zoom from './zoom.jsx';
import DivSx from './div-sx.jsx';
import {PreviewDeckState, Navigation, Time} from './presenter-tools.jsx';


const PresenterMode = ({children, keyboardTarget, touchTarget, basepath}) => {
  // Data
  const element = useRef();
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  const {path, url} = useRouteMatch();
  const shortCodeComponents = useMDXComponents();
  const [state, setState] = useMerger({
    basepath,
    mode: deckModes.PRESENTER,
    slideLength: children.length,
    shortCodeComponents
  });
  
  return (
    <RootContext.Provider value={[state, setState]}>
      <div ref={element} tabIndex={-1} onMouseDown={e => e.preventDefault()} style={{width: '100%', height: '100%'}}>
        <Switch>
          <Redirect exact from={path} to={`${url}/0/0`}/>

          <Route path={`${path}/:slide/:step`}>
            <DeckState>
              <DivSx
                sx={{
                  width: '100%',
                  height: '100%',
                  padding: '10px',
                  display: 'grid',
                  gridGap: '10px',
                  gridTemplateColumns: '2fr 5fr 3fr',
                  gridTemplateRows: '3fr 4fr 1fr 1fr 1fr',
                  gridTemplateAreas: '"slide slide preview" "slide slide ." "navigation navigation ." ". . ." "time time ."',
                  variant: 'mdxp.presenter'
                }}
              >
                <Zoom sizeReference={element} sx={{gridArea: 'slide'}}>
                  <Slide keyboardReference={keyboardReference} touchReference={touchReference}>
                    {children}
                  </Slide>
                </Zoom>

                <Zoom sizeReference={element} sx={{gridArea: 'preview'}} alignX='right'>
                  <PreviewDeckState>
                    <Slide keyboardReference={keyboardReference} touchReference={touchReference}>
                      {children}
                    </Slide>
                  </PreviewDeckState>
                </Zoom>

                <Navigation sx={{gridArea: 'navigation'}} />
                <Time sx={{gridArea: 'time'}} />
              </DivSx>
            </DeckState>
          </Route>
        </Switch>
      </div>
    </RootContext.Provider>
  );
};

export default PresenterMode;
