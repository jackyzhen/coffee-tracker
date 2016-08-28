import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import AppContainer from './containers/AppContainer';
import PeopleContainer from './containers/PeopleContainer';
import OutingContainer from './containers/OutingContainer';

module.exports = {
  getRouter: () => {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <Route path="people" component={PeopleContainer} />
          <Route path="outing" component={OutingContainer} />
        </Route>
      </Router>);
  },
};