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

  renderItemById(id) {
    console.log('rendering list items');
    console.log(id);
    // if (typeof this.props.renderItem === 'function') {
    //   return this.props.renderItem(id);
    // }
  }

}