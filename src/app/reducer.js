import { combineReducers } from 'redux';
import peopleReducer from './reducers/people';

export default combineReducers({
  people: peopleReducer,
});