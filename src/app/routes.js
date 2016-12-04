import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import AppContainer from './containers/AppContainer';
import PeopleContainer from './containers/PeopleContainer';
import OutingContainer from './containers/OutingContainer';
import AddPerson from './components/people/addPerson/';
import EditPerson from './components/people/editPerson/';
import ViewPeople from './components/people/viewPeople/';
import ViewOuting from './components/outing/viewOuting';
import AddOuting from './components/outing/addOuting';
import OutingDetail from './components/outing/outingDetail';


module.exports = {
  getRouter: () => {
    const onEnterIndex = (nextState, replace, callback) => {
      replace('/outing');
      callback();
    };
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRoute onEnter={onEnterIndex} />
          <Route path="people" component={PeopleContainer}>
            <IndexRoute component={ViewPeople} />
            <Route path="add" component={AddPerson} />
            <Route path="edit/:id" component={EditPerson} />
          </Route>
          <Route path="outing" component={OutingContainer}>
            <IndexRoute component={ViewOuting} />
            <Route path="add" component={AddOuting} />
            <Route path=":id" component={OutingDetail} />
          </Route>
        </Route>
      </Router>);
  },
};