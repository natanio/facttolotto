import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  currentNumberLength: 5,
  minValue: 1,
  maxValue: 70,
  currentStackLength: 5,
  currentStackFacts: {},
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NUMBER_SETTINGS_CHANGED:
      console.log(state);
      console.log(`action:`, action)
      switch (action.setting.target) {
        case 'numberLength':
          return state.merge({
            currentNumberLength: action.setting.value,
          });
        case 'minValue':
          return state.merge({
            minValue: action.setting.value,
          });
        case 'maxValue':
          return state.merge({
            maxValue: action.setting.value,
          });
      }
    case types.ADD_NUMBER_FACT_TO_STACK:
      return {
        currentStackFacts: {
          ...state.currentStackFacts,
          [action.number]: action.fact
        }
      }
    default:
      return state;
  }
}

// selectors

export function getCurrentNumberSettings(state) {
  console.log('In numbers reducer');
  return state.numbers;
}