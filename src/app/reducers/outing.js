import { createReducer } from 'redux-immutablejs';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { push } from 'react-router-redux';
import { PERSON_EDITED } from './people';
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


export function addOuting(payerId, totalCost, peopleIds) {
  const peopleIdsFormated = peopleIds.join(',');
  return dispatch => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic Y29mZmVldHJhY2tlcjpTdXBlclNlY3JldFBhc3N3b3Jk',
      },
      body: JSON.stringify({
        query: `
        mutation {
          createOuting(
            payer_id: ${payerId},
            total_cost: ${totalCost},
            people_ids: [${peopleIdsFormated}]
          ){
            id
            payer_id
            total_cost
            created_at
            personIds
            people {
              id
              name
              number_coffee_drank
              number_coffee_paid
              coffee_price
              created_at
              updated_at
            }
          }
        }`,
      }),
    })
    .then(response => response.json())
    .then(res => {
      dispatch({
        type: OUTING_ADDED,
        payload: {
          newOuting: res.data.createOuting,
        },
      });
      res.data.createOuting.people.forEach(person => {
        dispatch({
          type: PERSON_EDITED,
          payload: person,
        });
      });
      dispatch(push('/outing'));
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
  [OUTING_ADDED]: (state, action) => {
    const newOuting = action.payload.newOuting;
    return state.set(newOuting.id, Immutable.fromJS(newOuting));
  },
});

// selectors
const outings = (state) => state.outings;

export const getAllOutings = createSelector(
  outings,
  outings => outings
);