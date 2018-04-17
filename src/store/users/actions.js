import * as types from './actionTypes';

export function updateInputEmail(email) {
  return(
    { 
      type: types.INPUT_EMAIL_CHANGED, 
      email: email
    }
  );
}