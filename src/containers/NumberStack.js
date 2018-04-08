import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './FactScreen.css';
import StackWrapper from '../components/StackWrapper';
import * as numbersActions from '../store/numbers/actions';
import * as numbersSelectors from '../store/numbers/reducer';

class NumberStack extends Component {
  render() {
    return (
      <StackWrapper
        currentStackFacts={this.props.currentStackFacts}
        renderStackItem={this.renderStackItem}
      />
    );
  }

  renderStackItem(id, value) {
    <li
      className="StackItem"
      key={id}
    >
      {value}
    </li>
  }
}

function mapStateToProps(state) {
  const { currentStackLength, currentStackFacts } = numbersSelectors.getCurrentNumberSettings(state);
  console.log('current stack facts:');
  console.log(currentStackFacts);
  return {
    currentStackLength,
    currentStackFacts
  };
}

export default connect(mapStateToProps)(NumberStack);