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

  renderItemById(factPair) {
    console.log('rendering list items');
    console.log(factPair);
    if (typeof this.props.renderStackItem === 'function') {
      let number = factPair[0];
      let fact = factPair[1];
      return this.props.renderStackItem(number, fact);
    }
  }

}