import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import RootState from './root-state.jsx';
import deckModes from '../util/deck-modes.js';

const DeckMode = ({
  children,
  extracted,
  keyboardTarget,
  touchTarget,
  slideNavigation=true,
  modeNavigation=true,
  ...props
}) => {
  const basepath = props.basepath ? props.basepath : '';
  const slides = React.Children.toArray(children);

  return (
    <HashRouter {...props}>
      <RootState mode={deckModes.NORMAL} basepath={basepath} extracted={extracted} slideLength={slides.length}>
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
                  slideNavigation={slideNavigation}
                  modeNavigation={modeNavigation}
                >
                  {slides}
                </Component>
              </Route>
            ))
          }
        </Switch>
      </RootState>
    </HashRouter>
  );
};

export default DeckMode;
