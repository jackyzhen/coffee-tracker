import { combineReducers } from 'redux';

export default (apolloClient) => combineReducers({
  apollo: apolloClient.reducer(),
});