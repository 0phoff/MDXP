import React, {useRef} from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';
import Slide from './slide.jsx';
import RootContext from '../util/root-context.js';
import useMerger from '../hooks/use-merger.js';
import deckModes from '../util/deck-modes.js';


const NormalMode = ({children, basepath, ...props}) => {
  // Data
  const element = useRef(null);
  const {path, url} = useRouteMatch();
  const [state, setState] = useMerger({
    basepath,
    mode: deckModes.NORMAL,
    slideLength: children.length,
  });

  return (
    <RootContext.Provider value={[state, setState]}>
      <div ref={element} tabIndex={-1} >
        <Switch>
          <Redirect exact from={path} to={`${url}/0/0`}/>

          <Route path={`${path}/:slide/:step`}>
            <Slide reference={element}>
              {children}
            </Slide>
          </Route>
        </Switch>
      </div>
    </RootContext.Provider>
  );
};
export default NormalMode;
