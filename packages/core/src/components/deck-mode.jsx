import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import deckModes from '../util/deck-modes.js';

const DeckMode = ({children, extracted, keyboardTarget, touchTarget, ...props}) => {
  const basepath = props.basepath ? props.basepath : '';
  const slides = React.Children.toArray(children);

  return (
    <HashRouter {...props}>
      <Switch>
        <Redirect exact from="/" to={deckModes.properties[deckModes.NORMAL].path} />
        {
          deckModes.properties.map(({Component, name, path}) => (
            <Route path={`/${path}`} key={name}>
              <Component
                basepath={basepath}
                keyboardTarget={keyboardTarget}
                touchTarget={touchTarget}
                extracted={extracted}
              >
                {slides}
              </Component>
            </Route>
          ))
        }
      </Switch>
    </HashRouter>
  );
};

export default DeckMode;
