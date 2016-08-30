import { combineReducers } from 'redux';
import peopleReducer from './reducers/people';
import outingReducer from './reducers/outing';

export default combineReducers({
  people: peopleReducer,
  outings: outingReducer,
});