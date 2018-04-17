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
      <div className="container">
        <div className="left">
          <div className="logoWrap">
            <div className="logo">
              Factto
              <br />
              Lotto
            </div>
            <div className="desc">
              Get lotto numbers, learn something new
            </div>
          </div>
        </div>

        <div className="center">
          <NumberLengthSelector />
          <FactScreen />
          <NumberStack />
        </div>

        <div className="right">
        </div>
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  const { maxStackLength, minStackValue, maxStackValue } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    maxStackLength,
    minStackValue,
    maxStackValue
  };
}

export default connect(mapStateToProps)(App);
