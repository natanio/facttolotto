// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './FactScreen.css';
import ListInline from '../components/ListInline';
import ListItem from '../components/ListItem';
import Card from '../components/Card';
import * as factsActions from '../store/facts/actions';
import * as factsSelectors from '../store/facts/reducer';
import * as numbersActions from '../store/numbers/actions';
import * as numbersSelectors from '../store/numbers/reducer';

class FactScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    console.log('mounted');
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
    console.log('mounted props');
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.generatedNumber!==this.props.generatedNumber){
      this.props.dispatch(factsActions.fetchFact(nextProps.generatedNumber, nextProps.currentFilter));
    }
  }

  render() {
    if (!this.props.currentFact) return this.renderLoading();
    return (
      <div className={`FactScreen ${this.props.numberIsFilled ? 'hidden' : ''}`}>
        <Card
          leftSide={this.props.currentFact.number}
          rightSide={this.props.currentFact.text}
          addToStack={this.onAddToStackClick}
          nextNumberClick={this.onNextNumberClick}
        />

        <ListInline
          items={['trivia', 'year', 'math', 'date']}
          renderItem={this.renderItem}
        />

      </div>
    );
  }

  renderLoading() {
    console.log('loading...');
    return (
      <p>Loading...</p>
    );
  }

  renderItem(filter) {
    const selected = this.props.currentFilter === filter;
    return (
      <ListItem
        key={filter} 
        selected={selected}
        text={filter}
        onClick={this.onFilterClick}
      />
    )
  }

  onFilterClick(category) {
    const { number } = this.props.currentFact;
    this.props.dispatch(factsActions.fetchFact(number, category));
    console.log(`update the fact with ${number} and ${category}`);
  }

  onAddToStackClick() {
    const { number, text } = this.props.currentFact;
    console.log(`Stack number is: ${number}, with text: ${text}`);
    this.props.dispatch(numbersActions.addNumberFactToStack(number, text));
    // this.props.dispatch(factsActions.fetchFact());
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
  }

  onNextNumberClick() {
    // this.props.dispatch(factsActions.fetchFact());
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  console.log('mapping props');
  console.log(state);
  console.log(factsSelectors.getFact(state));
  console.log('Getting number settings');
  console.log(numbersSelectors.getCurrentNumberSettings(state));
  const { currentFilter, currentFact } = factsSelectors.getFact(state);
  const { currentFactStack, generatedNumber, remainingStackLength } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    currentFilter,
    currentFact,
    currentFactStack,
    generatedNumber,
    numberIsFilled: remainingStackLength == 0
  };
}

export default connect(mapStateToProps)(FactScreen);
