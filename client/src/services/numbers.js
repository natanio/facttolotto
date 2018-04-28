// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

const NUMBER_ENDPOINT = 'http://numbersapi.com';

class NumberService {

  async getFact(number, category) {
    console.log(`going to get this number: ${number} in ${category} at ${NUMBER_ENDPOINT}/${number}/${category}?notfound=floor&json`);
    const url = `${NUMBER_ENDPOINT}/${number}/${category}?notfound=floor&json`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`NumberService getFact failed, HTTP status ${response.status}`);
    }
    const data = await response.json();
    console.log(`fact response:`);
    console.log(data);
    return data;
  }

  generateNumber(state) {
    const { maxStackLength, minStackValue, maxStackValue, remainingStackLength } = state;
    const maxNumberDigits = this.allowedDigitLength(minStackValue, maxStackValue);
    const maxLengthOfGeneratedNumber = remainingStackLength * maxNumberDigits >= 5 ? 5 : remainingStackLength * maxNumberDigits;
    console.log(`Max digits of number is: ${maxLengthOfGeneratedNumber}`)
    const highestNumber = _.times(maxLengthOfGeneratedNumber, () => { return 9 }).join('');
    console.log(`highest number: ${highestNumber}`);
    let drawnNumber = Math.floor(Math.random() * (highestNumber - minStackValue +1)) + minStackValue;
    let finalNumber = this.confirmNumberIsInRange(minStackValue, maxStackValue, drawnNumber, state);
    console.log(`Drawn number is: ${drawnNumber}`)
    return parseInt(finalNumber);
  }

  confirmNumberIsInRange(min, max, number, state) {
    let numberArray = this.formatStackNumber(state, number);
    let checkedNumber = [];

    _.forEach(numberArray, (num) => {
      num = parseInt(num);
      if (num < min || num > max) {
        num = Math.floor(Math.random() * (max - min +1)) + min;
      }
      checkedNumber.push(num);
    })

    return checkedNumber.join('');
  }

  allowedDigitLength = (minStackValue, maxStackValue) => {
    let minLength = minStackValue.toString().length;
    let maxLength = maxStackValue.toString().length;
    console.log(`min length: ${minLength}`);
    console.log(`max length: ${maxLength}`);

    if (minLength < maxLength) {
      return parseInt(maxLength);
    }
    return parseInt(minLength);
  };

  formatStackNumber(state, number, onlyInMinMaxRange = false) {
    console.log('inside number format function');
    console.log(state);
    // determine what number of digits are allowed
    // based on the user input. 1-70 would allow 1 and two digit numbers up to 70.
    // But 10-70 would only allow two digit numbers up to 70
    const { maxStackLength, minStackValue, maxStackValue, stackNumbers } = state;
    const allowedDigitLength = this.allowedDigitLength(minStackValue, maxStackValue);
  
    // Placeholder for numbers
    let numbers = [];
    let formattedNumbers = [];
    let leftoverNumbers = [];

    // formatNumber(number);
    console.log(`Number in formatter: ${number}`);
    let splitNumber = number.toString().split('');
    console.log(splitNumber);
    // Remove from the split number array. Add left over to next remaining numbers.
    let numbersToCombine = splitNumber.slice(0, allowedDigitLength);
    let combinedNumber = numbersToCombine.join('');
    // let unusedNumbers = subtract.sub(splitNumber, numbersToCombine);
    let usedNumbers = splitNumber.splice(0,numbersToCombine.length); // to track used numbers
    let unusedNumbers = splitNumber; // for easy reading
    console.log(`unused numbers: ${unusedNumbers.length} of ${allowedDigitLength}`);
    console.log(unusedNumbers);
    if (onlyInMinMaxRange) {
      if (
        parseInt(combinedNumber) >= minStackValue &&
        parseInt(combinedNumber) <= maxStackValue &&
        !stackNumbers.includes(combinedNumber)
      ) formattedNumbers.push(combinedNumber);
    }
    else formattedNumbers.push(combinedNumber);

    do {
      if (unusedNumbers.length > allowedDigitLength) {
        console.log('going to format unused numbers top');
        numbersToCombine = unusedNumbers.splice(0, allowedDigitLength);
        combinedNumber = numbersToCombine.join('');
        usedNumbers = numbersToCombine; // to track used numbers
        // unusedNumbers = numbersToCombine;
        console.log('Working on unused numbers');
        console.log('remaining unused');
        console.log(unusedNumbers);
        console.log(usedNumbers);
        if (onlyInMinMaxRange) {
          if (
            parseInt(combinedNumber) >= minStackValue &&
            parseInt(combinedNumber) <= maxStackValue &&
            !stackNumbers.includes(combinedNumber)
          ) formattedNumbers.push(combinedNumber);
        }
        else formattedNumbers.push(combinedNumber);
      } else if (unusedNumbers.length > 0) {
        console.log('going to format unused numbers bottom');
        console.log(unusedNumbers);
        combinedNumber = unusedNumbers.join('');
        if (onlyInMinMaxRange) {
          if (
            parseInt(combinedNumber) >= minStackValue &&
            parseInt(combinedNumber) <= maxStackValue &&
            !stackNumbers.includes(combinedNumber)
          ) formattedNumbers.push(combinedNumber);
        }
        else formattedNumbers.push(combinedNumber);
        unusedNumbers = []; // clear the array
      } else {
        unusedNumbers = []; // clear the array
      }
    }
    while (unusedNumbers.length > 0);

    console.log(formattedNumbers);
    return formattedNumbers;
  }

}

export default new NumberService();
