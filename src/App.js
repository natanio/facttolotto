import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as numbersSelectors from './store/numbers/reducer';
import FactScreen from './containers/FactScreen';
import NumberLengthSelector from './containers/NumberLengthSelector';
import NumberStack from './containers/NumberStack';
import './App.css';

const meta = {
  title: 'Online Lottery Number Generator | Fact to Lotto',
  description: 'Generate random lotter numbers and learn trivia at the same time. Try this fun online lottery number generator today.',
  canonical: 'http://facttolott.com',
  meta: {
      charset: 'utf-8',
      name: {
          keywords: 'lottery number generator, loterry numbers, trivia, facts, random number generator'
      }
  }
};


class App extends Component {

  constructor(props) {
    super(props);
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAB16E2an2dnvBjuItirPhV4dFJwnGRbgA",
      authDomain: "facttolotto.firebaseapp.com",
      databaseURL: "https://facttolotto.firebaseio.com",
      projectId: "facttolotto",
      storageBucket: "facttolotto.appspot.com",
      messagingSenderId: "965527348201"
    };
    firebase.initializeApp(config);
  }

  render() {
    console.log(this.props.currentNumber);
    return (
      <div className="container">
        <DocumentMeta {...meta} />
        <div className="left">
          <div className="logoWrap">
            <div className="logo">
              Factto
              <br />
              Lotto
            </div>
            <div className="desc">
              Get lotto numbers, learn something new
            </div>
          </div>
        </div>

        <div className="center">
          <h1>Online Lottery Number Generator</h1>
          <NumberLengthSelector />
          <FactScreen db={firebase} />
          <NumberStack />
        </div>

        <div className="right">
        </div>
      </div>
    );
  }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  const { maxStackLength, minStackValue, maxStackValue } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    maxStackLength,
    minStackValue,
    maxStackValue
  };
}

export default connect(mapStateToProps)(App);
