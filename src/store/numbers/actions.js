import * as types from './actionTypes';
import * as numbersSelectors from '../numbers/reducer';

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