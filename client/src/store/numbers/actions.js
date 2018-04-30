import * as types from './actionTypes';

export function updateNumbersSettings(target, value) {
  return(
    { 
      type: types.NUMBER_SETTINGS_CHANGED, 
      setting: {
        target: target, value: value
      }
    }
  );
}

export function addNumberFactToStack(number, fact) {
  return(
    {
      type: types.ADD_NUMBER_FACT_TO_STACK,
      number: number,
      fact: fact,
    }
  );
}

export function generateRandomNumberFromState() {
  return (
    {
      type: types.GENERATE_NUMBER,
      payload: true
    }
  );
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  // Create a new array first since the stack is immutable
  var j, x, i;
  let array = [];
  for (i = a.length - 1; i >= 0; i--) {
    array.push(a[i]);
  }
  // Now loop through that array to shuffle
  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }
  return ({ type: types.SHUFFLE, newStack: array });
}

export function startOver() {
  return(
    {
      type: types.START_OVER,
      payload: true
    }
  );
}