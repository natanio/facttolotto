import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as factsSelectors from './store/facts/reducer';
import FactScreen from './containers/FactScreen';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FactScreen />
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
// function mapStateToProps(state) {
//   return {
//     isSelectionFinalized: factsSelectors.isTopicSelectionFinalized(state)
//   };
// }

export default App;
