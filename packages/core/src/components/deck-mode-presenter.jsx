import React, {useRef} from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import RootState from './root-state.jsx';
import DeckState from './deck-state.jsx';
import DivSx from './div-sx.jsx';
import Zoom from './zoom.jsx';
import Slide from './slide.jsx';
import Extracted from './extracted.jsx';
import {PreviewDeckState, Navigation, Time, Notes} from './presenter-tools.jsx';
import deckModes from '../util/deck-modes.js';


const PresenterMode = ({children, keyboardTarget, touchTarget, basepath, extracted}) => {
  // Data
  const element = useRef();
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  const {path, url} = useRouteMatch();
  
  return (
    <RootState mode={deckModes.PRESENTER} basepath={basepath} extracted={extracted} slideLength={children.length}>
      <div ref={element} tabIndex={-1} onMouseDown={e => e.preventDefault()} style={{width: '100%', height: '100%'}}>
        <Switch>
          <Redirect exact from={path} to={`${url}/0/0`}/>

          <Route path={`${path}/:slide/:step`}>
            <DeckState>
              <Extracted />
              <DivSx
                sx={{
                  width: '100%',
                  height: '100%',
                  padding: '10px',
                  display: 'grid',
                  gridGap: '10px',
                  gridTemplateColumns: '2fr 5fr 3fr',
                  gridTemplateRows: '3fr 4fr 1fr 1fr 1fr',
                  gridTemplateAreas: '"slide slide preview" "slide slide notes" "navigation navigation notes" ". . notes" "time time notes"',
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
                <Notes sx={{gridArea: 'notes'}} />
              </DivSx>
            </DeckState>
          </Route>
        </Switch>
      </div>
    </RootState>
  );
};

export default PresenterMode;
