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
        </div>
        <div className="rightSide">
          {this.props.rightSide}
        </div>
      </div>
    );
  }
}