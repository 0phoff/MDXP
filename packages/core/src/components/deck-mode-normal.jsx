import React, {useRef} from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import {useMDXComponents} from '@mdx-js/react';
import Slide from './slide.jsx';
import RootContext from '../util/root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';

const NormalMode = ({children, keyboardTarget, touchTarget, basepath}) => {
  // Data
  const element = useRef(null);
  const keyboardReference = keyboardTarget || element;
  const touchReference = touchTarget || element;
  const {path, url} = useRouteMatch();
  const shortCodeComponents = useMDXComponents();
  const [state, setState] = useMerger({
    basepath,
    mode: deckModes.NORMAL,
    slideLength: children.length,
    shortCodeComponents
  });

  return (
    <RootContext.Provider value={[state, setState]}>
      <div ref={element} tabIndex={-1} style={{width: '100%', height: '100%'}}>
        <Switch>
          <Redirect exact from={path} to={`${url}/0/0`}/>

          <Route path={`${path}/:slide/:step`}>
            <Slide keyboardReference={keyboardReference} touchReference={touchReference}>
              {children}
            </Slide>
          </Route>
        </Switch>
      </div>
    </RootContext.Provider>
  );
};

export default NormalMode;
