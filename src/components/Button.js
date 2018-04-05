import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class Button extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <li key={this.props.text} className={this.props.selected ? 'selected' : ''}>
        {this.props.text}
      </li>
    )
  }
}