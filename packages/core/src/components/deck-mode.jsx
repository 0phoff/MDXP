import React from 'react';
import {Router, Redirect} from '@reach/router';
import deckModes from '../util/deck-modes.js';


const DeckMode = ({children, ...props}) => {
  const basepath = props.basepath ? props.basepath + '/' : '/';

  return (
    <Router {...props}>
      <Redirect from='/' to={basepath + deckModes.properties[deckModes.NORMAL].path} noThrow />
      {
        deckModes.properties.map(({Component, name, path}, i) => (
          <Component path={path} basepath={basepath} key={name}>
            {
              React.Children.map(children, (child, i) => (
                React.cloneElement(child, {key: i})
              ))
            }
          </Component>
        ))
      }
    </Router>
  );
};
export default DeckMode;
