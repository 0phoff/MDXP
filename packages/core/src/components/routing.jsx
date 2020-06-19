import React from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';

const Routing = ({children}) => {
  const {path, url} = useRouteMatch();

  return (
    <Switch>
      <Redirect exact from={path} to={`${url}/0/0`}/>
      <Route path={`${path}/:slide/:step`}>
        {children}
      </Route>
    </Switch>
  );
};

export default Routing;
