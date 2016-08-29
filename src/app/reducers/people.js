import { createReducer } from 'redux-immutablejs';
import { createSelector } from 'reselect';
import Immutable from 'immutable';
import { push } from 'react-router-redux';

// consts
export const ALL_PEOPLE = 'ALL_PEOPLE';
export const PERSON_EDITED = 'PERSON_EDITED';
export const PERSON_ADDED = 'PERSON_ADDED';

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

export function editPerson(id, name, coffeeCost) {
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
          editPerson(
            id: ${id},
            name: "${name}",
            coffee_price: ${coffeeCost}
          ){
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
        type: PERSON_EDITED,
        payload: res.data.editPerson,
      });
      dispatch(push('/people'));
    });
  };
}


export function addPerson(name, coffeeCost) {
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
          createPerson(
            name: "${name}",
            coffee_price: ${coffeeCost}
          ){
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
        type: PERSON_ADDED,
        payload: res.data.createPerson,
      });
      dispatch(push('/people'));
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
  [PERSON_EDITED]: (state, action) => {
    const person = action.payload;
    return state.set(person.id, Immutable.fromJS(person));
  },
  [PERSON_ADDED]: (state, action) => {
    const person = action.payload;
    return state.set(person.id, Immutable.fromJS(person));
  },
});

// selectors
const people = (state) => state.people;

export const getAllPeople = createSelector(
  people,
  people => people
);