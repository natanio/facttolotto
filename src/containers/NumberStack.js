import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './FactScreen.css';
import StackWrapper from '../components/StackWrapper';
import * as numbersActions from '../store/numbers/actions';
import * as numbersSelectors from '../store/numbers/reducer';

class NumberStack extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <StackWrapper
        maxStackLength={this.props.maxStackLength}
        remainingStackLength={this.props.remainingStackLength}
        stackNumbers={this.props.stackNumbers}
        renderStackNumber={this.renderStackNumber}
        currentStackFacts={this.props.currentStackFacts}
        renderStackItem={this.renderStackItem}
        onShuffleClick={this.onShuffleClick}
      />
    );
  }

  renderStackNumber(key, number) {
    console.log('Stack number:');
    console.log(number);
    return (
      <li
        key={key}
        className={number ? 'filled' : ''}>
        {number ? number:key + 1}
      </li>
    );
  }

  renderStackItem(number, fact) {
    // console.log('Stack item:');
    // console.log(fact);
    return(
      <li
        className="StackItem"
        key={number}
      >
        {number}:
        <span>{fact}</span>
      </li>
    );
  }

  onShuffleClick() {
    this.props.dispatch(numbersActions.shuffle(this.props.stackNumbers));
  }
}

function mapStateToProps(state) {
  const { maxStackLength, currentStackFacts, stackNumbers, remainingStackLength } = numbersSelectors.getCurrentNumberSettings(state);
  // const stackNumbers = numbersSelectors.getCurrentStackNumbers(state);
  console.log('current stack facts:');
  console.log(currentStackFacts);
  console.log('current stack numbers');
  console.log(stackNumbers);
  return {
    maxStackLength,
    currentStackFacts,
    stackNumbers,
    remainingStackLength
  };
}

export default connect(mapStateToProps)(NumberStack);