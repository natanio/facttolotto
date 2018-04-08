import _ from 'lodash';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class StackWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    console.log('Props in StackWrapper');
    console.log(this.props);
    return (
      <div className="StackWrapper">
        <h2>Your selected numbers</h2>
        <ul className="StackNumbers">
          {_.times(this.props.maxStackLength, this.renderNumberContainer)}
        </ul>
        <h3>About your numbers</h3>
        <ul className="StackFacts">
          {_.map(this.props.currentStackFacts, this.renderItemById)}
        </ul>
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