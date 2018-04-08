import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  maxStackLength: 5,
  minStackValue: 1,
  maxStackValue: 70,
  currentStackFacts: {},
  remainingStackLength: 5,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NUMBER_SETTINGS_CHANGED:
      console.log(state);
      console.log(`action:`, action)
      switch (action.setting.target) {
        case 'numberLength':
          return state.merge({
            maxStackLength: action.setting.value,
            currentStackFacts: {},
            remainingStackLength: action.setting.value,
          });
        case 'minStackValue':
          return state.merge({
            minStackValue: action.setting.value,
          });
        case 'maxStackValue':
          return state.merge({
            maxStackValue: action.setting.value,
          });
      }
    case types.ADD_NUMBER_FACT_TO_STACK:
      const currentStackFacts = Immutable({
        currentStackFacts: {
          ...state.currentStackFacts,
        [action.number]: action.fact
        }
      });
      return state.merge(currentStackFacts);
    default:
      return state;
  }
}

// selectors

export function getCurrentNumberSettings(state) {
  console.log('In numbers reducer');
  return state.numbers;
}