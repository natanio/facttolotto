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