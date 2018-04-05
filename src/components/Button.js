import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class Button extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <li 
        className={this.props.selected ? 'selected' : ''}
        data-id={this.props.text}
        onClick={this.onClick}
        >
        {this.props.text}
      </li>
    )
  }

  onClick() {
    console.log('click happened');
    if (typeof this.props.onClick === 'function') {
      console.log(this.props.text);
      this.props.onClick(this.props.text);
    }
  }

}