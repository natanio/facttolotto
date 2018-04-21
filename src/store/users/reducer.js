import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  email: undefined,
  touched: {
    email: false,
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.INPUT_EMAIL_CHANGED:
      return state.merge({
        email: action.email
      })
    case types.TOUCHED_STATE_UPDATED:
      const touched = Immutable({
        touched: {
          [action.field]: true
        }
      });
      return state.merge(touched);
    default:
      return state;
  }
}

// selectors

export function getUserEmail(state) {
  return state.user.email;
}

export function getTouched(state) {
  return state.user.touched;
}