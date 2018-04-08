import React, { Component } from 'react';
import autoBind from 'react-autobind';
import * as NumberFormat from 'react-number-format';
import './Card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="card">
        <div className="leftSide">
          <NumberFormat value={this.props.leftSide} displayType={'text'} thousandSeparator={true} />
          <div className="actions-wrapper">
            <button
              onClick={this.onClick}
            >Use</button>
          </div>
        </div>
        <div className="rightSide">
          {this.props.rightSide}
        </div>
      </div>
    );
  }

  onClick() {
    if (typeof this.props.addToStack === 'function') {
      console.log('add btn was clicked');
      this.props.addToStack();
    }
  }
}