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