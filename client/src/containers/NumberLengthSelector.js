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
    const { maxStackLength, minStackValue, maxStackValue } = this.props;

    return (
      <div className="NumberSettingsWrap">
        <div className="formGroup">
          <label htmlFor="numberlength">How many numbers do you need?</label>
          <input 
            type="number" 
            placeholder="5"
            id="numberLength"
            value={maxStackLength}
            onChange={this.updateNumberSettings} />
        </div>
        <div className="formGroup">
          <p>Each number’s minimum and maximum value</p>
          <div className="formInline">
            <div>
              <input 
                type="number"
                id="minStackValue" 
                value={minStackValue}
                onChange={this.updateNumberSettings}/>
              <label htmlFor="numberMin">min</label>
            </div>
            <div>
              <input 
                type="number" 
                id="maxStackValue"
                value={maxStackValue}
                onChange={this.updateNumberSettings}/>
              <label htmlFor="numberMax">max</label>
            </div>
          </div>
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
  const { maxStackLength, minStackValue, maxStackValue } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    maxStackLength,
    minStackValue,
    maxStackValue
  };
}

export default connect(mapStateToProps)(NumberLengthSelector);