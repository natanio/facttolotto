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
      <ul className="StackWrapper">
        {_.map(this.props.currentStackFacts, this.renderItemById)}
      </ul>
    );
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