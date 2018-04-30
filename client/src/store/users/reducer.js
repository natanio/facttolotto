import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  authenticated: true, 
  email: undefined,
  emailSent: false,
  touched: {
    email: false,
  }
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.INPUT_EMAIL_CHANGED:
      return state.merge({
        email: action.email.toLowerCase()
      })
    case types.TOUCHED_STATE_UPDATED:
      const touched = Immutable({
        touched: {
          [action.field]: true
        }
      });
      return state.merge(touched);
    case types.AUTHORIZE_USER:
      return state.merge({
        authenticated: action.authenticated,
      });
    case types.EMAIL_SENT:
      return state.merge({
        emailSent: action.value
      })
    default:
      return state;
  }
}

// selectors

export function isAuthenticated(state) {
  return state.user.authenticated;
}

export function getUserEmail(state) {
  return state.user.email;
}

export function getTouched(state) {
  return state.user.touched;
}

export function emailSent(state) {
  return state.user.emailSent;
}