import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Button from './Button';

export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <ul className="btn-group">
        {this.renderButtons()}
      </ul>
    );
  }

  renderButtons() {
    return (
      this.props.buttons.map((btn) => 
        <Button 
          selected={this.props.selected === btn}
          text={btn}
        />
      )
    )
  }

}