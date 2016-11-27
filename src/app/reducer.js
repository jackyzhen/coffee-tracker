import { combineReducers } from 'redux';
import peopleReducer from './reducers/people';
import outingReducer from './reducers/outing';

export default (apolloClient) => combineReducers({
  people: peopleReducer,
  outings: outingReducer,
  apollo: apolloClient.reducer(),
});