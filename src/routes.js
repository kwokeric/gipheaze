import React from 'react';
import { Route } from 'react-router';
import App from './components/App.js';
import Search from './components/Search.js';

const routes = (
  <Route path="/" component={App}>
    <Route path="/search(/:query)" component={Search} />
  </Route>
)

export default routes;
