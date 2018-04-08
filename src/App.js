import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as numbersSelectors from './store/numbers/reducer';
import FactScreen from './containers/FactScreen';
import NumberLengthSelector from './containers/NumberLengthSelector';
import NumberStack from './containers/NumberStack';
import './App.css';

class App extends Component {
  render() {
    console.log(this.props.currentNumber);
    return (
      <div className="App">
        <NumberLengthSelector />
        <FactScreen />
        <NumberStack />
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  const { currentNumberLength, minValue, maxValue } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    currentNumberLength,
    minValue,
    maxValue
  };
}

export default connect(mapStateToProps)(App);
