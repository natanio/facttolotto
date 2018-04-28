import _ from 'lodash';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import FaSync from 'react-icons/lib/fa/refresh';

export default class StackWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillReceiveProps() {
    console.log('fact stack come on');
    console.log(this.props.currentStackFacts);
  }

  render() {
    console.log('Props in StackWrapper');
    console.log(this.props.currentStackFacts);

    const blankSlate = this.props.maxStackLength === this.props.remainingStackLength;
    const numberFilled = this.props.remainingStackLength === 0;

    return (
      <div className="StackWrapper">
        <h2>
          Your lotto numbers <small class={!blankSlate ? 'hidden': ''}>(filled after you click 'use')</small> 
          {numberFilled ? <button className="btn btn-small btn-plain" onClick={this.props.onShuffleClick}>Shuffle <FaSync /></button> : ''}
        </h2>
        <ul className="StackNumbers">
          {_.times(this.props.maxStackLength, this.renderNumberContainer)}
        </ul>
        {blankSlate ? '' : <div><h3>Facts from your numbers</h3>
        <ul className="StackFacts">
          {_.map(this.props.currentStackFacts, this.renderItemById)}
        </ul></div> }
      </div>
    );
  }

  renderNumberContainer(key) {
    console.log('what are these stack numbers?');
    console.log(key);
    if (typeof this.props.renderStackNumber === 'function') {
      let number = this.props.stackNumbers[key];
      console.log(number);
      console.log(this.props.stackNumbers);
      return this.props.renderStackNumber(key, number);
    }
  }

  renderItemById(value, key) {
    console.log('rendering stack items');
    console.log(key);
    console.log(value);
    if (typeof this.props.renderStackItem === 'function') {
      let number = key;
      let fact = value;
      return this.props.renderStackItem(number, fact);
    }
  }

}