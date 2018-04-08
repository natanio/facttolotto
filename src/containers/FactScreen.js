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

class FactScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    console.log('mounted');
    this.props.dispatch(factsActions.fetchFact());
  }

  render() {
    if (!this.props.currentFact) return this.renderLoading();
    return (
      <div className="FactScreen">
        <Card
          leftSide={this.props.currentFact.number}
          rightSide={this.props.currentFact.text}
        />

        <ListInline
          items={['date', 'trivia', 'year', 'math']}
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

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  console.log('mapping props');
  console.log(state);
  console.log(factsSelectors.getFact(state));
  const { currentFilter, currentFact } = factsSelectors.getFact(state);
  return {
    currentFilter,
    currentFact
  };
}

export default connect(mapStateToProps)(FactScreen);
