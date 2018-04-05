import _ from 'lodash';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class ButtonGroup extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    console.log(this.props);
  }

  render() {
    return (
      <ul className="btn-group">
        {_.map(this.props.buttons, this.renderBtnById)}
      </ul>
    );
  }

  renderBtnById(id) {
    console.log('rendering list items');
    console.log(id);
    if (typeof this.props.renderButton === 'function') {
      return this.props.renderButton(id);
    }
  }

}