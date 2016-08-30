import { createReducer } from 'redux-immutablejs';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
// import { push } from 'react-router-redux';

// consts
export const ALL_OUTINGS = 'ALL_OUTINGS';
export const OUTING_ADDED = 'OUTING_ADDED';

// actions
export function fetchAllOutings() {
  return dispatch => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic Y29mZmVldHJhY2tlcjpTdXBlclNlY3JldFBhc3N3b3Jk',
      },
      body: JSON.stringify({
        query: `{
          outings {
            id
            payer_id
            total_cost
            created_at
            personIds
          }
        }`,
      }),
    })
    .then(response => response.json())
    .then(res => {
      dispatch({
        type: ALL_OUTINGS,
        payload: res.data.outings,
      });
    });
  };
}

// reducers
const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [ALL_OUTINGS]: (state, action) => {
    let newState = state;
    const outings = action.payload;
    outings.forEach(outing => {
      newState = newState.set(outing.id, Immutable.fromJS(outing));
    });
    return newState;
  },
});

// selectors
const outings = (state) => state.outings;

export const getAllOutings = createSelector(
  outings,
  outings => outings
);