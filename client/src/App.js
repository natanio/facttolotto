import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import firebase from 'firebase';
import * as numbersSelectors from './store/numbers/reducer';
import FactScreen from './containers/FactScreen';
import Footer from './components/Footer';
import NumberLengthSelector from './containers/NumberLengthSelector';
import NumberStack from './containers/NumberStack';
import * as usersActions from './store/users/actions';
import * as userSelectors from './store/users/reducer';
import './App.css';

const meta = {
  title: 'Online Lottery Number Generator | Factto Lotto',
  description: 'Generate random lotter numbers and learn trivia at the same time. Try this fun online lottery number generator today.',
  canonical: 'http://facttolotto.com',
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
    console.log('app props')
    console.log(this.props)
    autoBind(this);

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

    // Authorize visitor in anonymously with firebase
    firebase.auth().signInAnonymously().catch(function(error) {
      console.error(error);
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Save user in state
        console.log('before save user')
        this.props.dispatch(usersActions.authenticate(true));
      } else {
        // User is signed out.
        console.log('before sign out')
        this.props.dispatch(usersActions.authenticate(false));
      }
      console.log('user is');
      console.log(user);
    });
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
          <FactScreen db={firebase} isAuthenticated={this.props.isAuthenticated}/>
          <NumberStack />
          <Footer />
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
  const isAuthenticated = userSelectors.isAuthenticated(state);
  return {
    maxStackLength,
    minStackValue,
    maxStackValue,
    isAuthenticated: isAuthenticated
  };
}

export default connect(mapStateToProps)(App);
