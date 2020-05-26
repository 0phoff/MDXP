import React, {useRef} from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import DeckState from './deck-state.jsx';
import RootState from './root-state.jsx';
import Slide from './slide.jsx';
import Extracted from './extracted.jsx';
import deckModes from '../util/deck-modes.js';

const NormalMode = ({children, keyboardTarget, touchTarget, basepath, extracted}) => {
  // Data
  const element = useRef();
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  const {path, url} = useRouteMatch();

  return (
    <RootState mode={deckModes.NORMAL} basepath={basepath} extracted={extracted} slideLength={children.length}>
      <div ref={element} tabIndex={-1} onMouseDown={e => e.preventDefault()} style={{width: '100%', height: '100%'}}>
        <Switch>
          <Redirect exact from={path} to={`${url}/0/0`}/>

          <Route path={`${path}/:slide/:step`}>
            <DeckState>
              <Extracted />
              <Slide keyboardReference={keyboardReference} touchReference={touchReference}>
                {children}
              </Slide>
            </DeckState>
          </Route>
        </Switch>
      </div>
    </RootState>
  );
};

export default NormalMode;
