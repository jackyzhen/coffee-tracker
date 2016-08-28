import { createReducer } from 'redux-immutablejs';
import { createSelector } from 'reselect';
import Immutable from 'immutable';

// consts
export const ALL_PEOPLE = 'ALL_PEOPLE';

// actions

export function fetchAllPeople() {
  return dispatch => {
    return fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic Y29mZmVldHJhY2tlcjpTdXBlclNlY3JldFBhc3N3b3Jk',
      },
      body: JSON.stringify({
        query: `{
          people {
            id
            name
            number_coffee_drank
            number_coffee_paid
            coffee_price
            created_at
            updated_at
            outingIds
          }
        }`,
      }),
    })
    .then(response => response.json())
    .then(res => {
      dispatch({
        type: ALL_PEOPLE,
        payload: res.data.people,
      });
    });
  };
}

// reducers
const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
  [ALL_PEOPLE]: (state, action) => {
    let newState = state;
    const allPeople = action.payload;
    allPeople.forEach(person => {
      newState = newState.set(person.id, Immutable.fromJS(person));
    });
    return newState;
  },
});

// selectors
const people = (state) => state.people;

export const getAllPeople = createSelector(
  people,
  people => people
);