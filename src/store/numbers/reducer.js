import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import ArraySubtract from 'array-subtract';
import numberService from '../../services/numbers';

const initialState = Immutable({
  maxStackLength: 5,
  minStackValue: 1,
  maxStackValue: 70,
  currentStackFacts: {},
  remainingStackLength: 5,
  stackNumbers: [],
  generatedNumber: 0,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.NUMBER_SETTINGS_CHANGED:
      console.log(state);
      console.log(`action:`, action)
      switch (action.setting.target) {
        case 'numberLength':
          console.log(`stack length is: ${state.currentStackFacts}`);
          if (_.size(state.currentStackFacts) > 0) {
            if (!window.confirm('This action will remove your current numbers. Are you sure?')) return state;
          }
          return state.merge({
            maxStackLength: action.setting.value,
            currentStackFacts: {},
            remainingStackLength: action.setting.value,
            stackNumbers: [],
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
    case types.GENERATE_NUMBER:
      const generatedNumber = numberService.generateNumber(state);
      return state.merge({
        generatedNumber: generatedNumber
      })
    case types.ADD_NUMBER_FACT_TO_STACK:
      // Process the number to be added to the stack fitting the
      // user's requirements
      const stackNumbers = Immutable(state.stackNumbers).concat(numberService.formatStackNumber(state, action.number));
      console.log(`remaining stack: ${state.remainingStackLength}`);
      console.log(`stack length: ${stackNumbers.length}`);
      console.log(`state stack length: ${state.stackNumbers.length}`);
      const calculatedRemainingStack = state.remainingStackLength - stackNumbers.length + state.stackNumbers.length;
      console.log('returned stack numbers');
      console.log(stackNumbers);
      const currentStackFacts = Immutable({
        currentStackFacts: {
          ...state.currentStackFacts,
        [action.number]: action.fact
        },
        stackNumbers: stackNumbers,
        remainingStackLength: calculatedRemainingStack < 0 ? 0 : calculatedRemainingStack,
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

// export function generateNumber(state) {
//   console.log('Generating number...');
//   const generatedNumber = numberService.generateNumber(state);
//   console.log(generatedNumber);
//   return state.merge({
//     generatedNumber: generatedNumber
//   });
// }