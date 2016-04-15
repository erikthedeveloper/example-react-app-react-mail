import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './App';
import { MessageBrowserContainer } from './components/MessageBrowser/MessageBrowserContainer';
import { MessageDetailContainer } from './components/MessageDetail/MessageDetailContainer';

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MessageBrowserContainer} />
      <Route path=":id" component={MessageDetailContainer} />
    </Route>
  </Router>
);
