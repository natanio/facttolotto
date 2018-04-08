import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './FactScreen.css';
import Card from '../components/Card';
import * as numbersActions from '../store/numbers/actions';
import * as numbersSelectors from '../store/numbers/reducer';

class NumberLengthSelector extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  updateNumberSettings(event) {
    console.log(`new number length: ${event}`)
    console.log(event.target.data_target);
    let { id, value } = event.target;
    if (value < 1) {
      alert("Can't be less than 1.");
      return false;
    }
    this.props.dispatch(numbersActions.updateNumbersSettings(id, value));
  }

  render() {
    const { currentNumberLength, minValue, maxValue } = this.props;

    return (
      <div className="NumberSettingsWrap">
        <div className="formGroup">
          <label htmlFor="numberlength">How many numbers do you need to choose?</label>
          <input 
            type="number" 
            placeholder="5"
            id="numberLength"
            value={currentNumberLength}
            onChange={this.updateNumberSettings} />
        </div>
        <div className="formGroup">
          <p>For each number, what is the minimum and maximum (e.g. 1 - 70)?</p>
          <label htmlFor="numberMin">Minimum value</label>
          <input 
            type="number"
            id="minValue" 
            value={minValue}
            onChange={this.updateNumberSettings}/>
          <label htmlFor="numberMax">Maximum value</label>
          <input 
            type="number" 
            id="maxValue"
            value={maxValue}
            onChange={this.updateNumberSettings}/>
        </div>
      </div>
    )
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  console.log(`numbers state:`);
  console.log(state);
  const { currentNumberLength, minValue, maxValue } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    currentNumberLength,
    minValue,
    maxValue
  };
}

export default connect(mapStateToProps)(NumberLengthSelector);