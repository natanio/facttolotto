import * as types from './actionTypes';

export function updateInputEmail(email) {
  return(
    { 
      type: types.INPUT_EMAIL_CHANGED, 
      email: email
    }
  );
}

export function updateTouchedState(field) {
  return (
    {
      type: types.TOUCHED_STATE_UPDATED,
      field: field,
    }
  )
}

export function showEmailSentConfirmation(value) {
  return (
    {
      type: types.EMAIL_SENT,
      value: value
    }
  )
}

export function authenticate(val) {
  return (
    {
      type: types.AUTHORIZE_USER,
      authenticated: val
    }
  )
}