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
      // Process the number to be added to the stack fitting the
      // user's requirements
      const stackNumbers = Immutable(state.stackNumbers).concat(numberService.formatStackNumber(state, action.number));
      console.log('returned stack numbers');
      console.log(stackNumbers);
      const currentStackFacts = Immutable({
        currentStackFacts: {
          ...state.currentStackFacts,
        [action.number]: action.fact
        },
        stackNumbers: stackNumbers
        
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

export function getCurrentStackNumbers(state) {
  console.log('inside number formatter');
  // determine what number of digits are allowed
  // based on the user input. 1-70 would allow 1 and two digit numbers up to 70.
  // But 10-70 would only allow two digit numbers up to 70
  const { maxStackLength, minStackValue, maxStackValue, currentStackFacts } = state.numbers;
  const allowedDigitLength = () => {
    let minLength = minStackValue.toString().length;
    let maxLength = maxStackValue.toString().length;
    console.log(`min length: ${minLength}`);
    console.log(`max length: ${maxLength}`);

    if (minLength < maxLength) {
      return parseInt(maxLength);
    }
    return parseInt(minLength);
  };

  // Placeholder for numbers
  let numbers = [];
  let subtract = new ArraySubtract((a, b) => { return a === b });
  let formattedNumbers = [];
  let leftoverNumbers = [];

  console.log(currentStackFacts);
  _.map(_.keys(currentStackFacts), (number) => {
    console.log('key in current stack numbers');
    console.log(number);
    numbers.push(number.toString());
  });

  _.map(numbers, (number) => {
    // formatNumber(number);
    console.log(`Number in formatter: ${number}`);
    let splitNumber = number.split('');
    console.log(splitNumber);
    // Remove from the split number array. Add left over to next remaining numbers.
    let numbersToCombine = splitNumber.slice(0, allowedDigitLength());
    let combinedNumber = numbersToCombine.join('');
    // let unusedNumbers = subtract.sub(splitNumber, numbersToCombine);
    let usedNumbers = splitNumber.splice(0,numbersToCombine.length); // to track used numbers
    let unusedNumbers = splitNumber; // for easy reading
    console.log(`unused numbers:`);
    console.log(unusedNumbers);
    formattedNumbers.push(combinedNumber);

    do {
      if (unusedNumbers.length > allowedDigitLength) {
        console.log('going to format unused numbers top');
        numbersToCombine = unusedNumbers.slice(0, allowedDigitLength);
        combinedNumber = numbersToCombine.join('');
        usedNumbers = numbersToCombine.splice(0,numbersToCombine.length); // to track used numbers
        unusedNumbers = numbersToCombine;
        formattedNumbers.push(combinedNumber);
      } else if (unusedNumbers.length > 0) {
        console.log('going to format unused numbers bottom');
        numbersToCombine = unusedNumbers.join('');
        formattedNumbers.push(numbersToCombine);
        unusedNumbers = []; // clear the array
      } else {
        unusedNumbers = []; // clear the array
      }
    }
    while (unusedNumbers.length > 0);
  });

  // function formatNumber(number) {
  //   console.log('formatting number');
  //   let splitNumber = number.split('');
  //   // Remove from the split number array. Add left over to next remaining numbers.
  //   let numbersToCombine = splitNumber.slice(0, allowedDigitLength);
  //   let combinedNumber = numbersToCombine.join('');
  //   let unusedNumbers = subtract.sub(splitNumber, numbersToCombine);
  //   formattedNumbers.push(combinedNumber);

  //   do {
  //     if (unusedNumbers.length > allowedDigitLength) {
  //       numbersToCombine = unusedNumbers.slice(0, allowedDigitLength);
  //       combinedNumber = numbersToCombine.join('');
  //       formattedNumbers.push(combinedNumber);
  //       unusedNumbers = subtract.sub(unusedNumbers, numbersToCombine);
  //     } else {
  //       numbersToCombine = splitNumber;
  //       formattedNumbers.push(combinedNumber);
  //     }
  //   }
  //   while (unusedNumbers.length > 0);
  // }
  console.log(formattedNumbers);
  return formattedNumbers;
}