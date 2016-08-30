import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import AppContainer from './containers/AppContainer';
import PeopleContainer from './containers/PeopleContainer';
import OutingContainer from './containers/OutingContainer';
import AddPerson from './components/people/addPerson/';
import EditPerson from './components/people/editPerson/';
import ViewPeople from './components/people/viewPeople/';
import ViewOuting from './components/outing/viewOuting';
import { fetchAllPeople } from './reducers/people';
import { fetchAllOutings } from './reducers/outing';


module.exports = {
  getRouter: (store) => {
    const onEnterRoot = (nextState, replace, callback) => {
      return store.dispatch(fetchAllPeople())
              .then(() => store.dispatch(fetchAllOutings()))
              .then(() => {
                callback();
              });
    };
    const onEnterIndex = (nextState, replace, callback) => {
      replace('/outing');
      callback();
    };
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer} onEnter={onEnterRoot}>
          <IndexRoute onEnter={onEnterIndex} />
          <Route path="people" component={PeopleContainer}>
            <IndexRoute component={ViewPeople} />
            <Route path="add" component={AddPerson} />
            <Route path="edit/:id" component={EditPerson} />
          </Route>
          <Route path="outing" component={OutingContainer}>
            <IndexRoute component={ViewOuting} />
          </Route>
        </Route>
      </Router>);
  },
};