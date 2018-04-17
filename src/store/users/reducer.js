import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  email: undefined
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.INPUT_EMAIL_CHANGED:
      return state.merge({
        email: action.email
      })
    default:
      return state;
  }
}

// selectors

export function getUserEmail(state) {
  return state.user.email;
}