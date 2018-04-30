import _ from 'lodash';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class ListInline extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <ul className="btn-group">
        {_.map(this.props.items, this.renderBtnById)}
      </ul>
    );
  }

  renderBtnById(id) {
    if (typeof this.props.renderItem === 'function') {
      return this.props.renderItem(id);
    }
  }

}