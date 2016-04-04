import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { AppContainer } from './components/containers/AppContainer';
import { MessageBrowserContainer } from './components/containers/MessageBrowserContainer';
import { MessageDetailsContainer } from './components/containers/MessageDetailsContainer';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={MessageBrowserContainer} />
      <Route path=":id" component={MessageDetailsContainer} />
    </Route>
  </Router>
);
