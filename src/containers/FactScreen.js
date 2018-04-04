// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import './FactScreen.css';
import * as factsActions from '../store/facts/actions';
import * as factsSelectors from '../store/facts/reducer';
// import ListView from '../components/ListView';
// import ListRow from '../components/ListRow';

class FactScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    console.log('mounted');
    this.props.dispatch(factsActions.fetchFact(1, 'trivia'));
  }

  render() {
    if (!this.props.currentFact) return this.renderLoading();
    return (
      <div className="FactScreen">
        {this.props.currentFact.text}
        {this.props.currentFact.number}
      </div>
    );
  }

  renderLoading() {
    console.log('loading...');
    return (
      <p>Loading...</p>
    );
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
