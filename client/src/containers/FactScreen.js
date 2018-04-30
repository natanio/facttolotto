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
import EmailForm from '../containers/EmailForm';
import * as factsActions from '../store/facts/actions';
import * as factsSelectors from '../store/facts/reducer';
import * as numbersActions from '../store/numbers/actions';
import * as numbersSelectors from '../store/numbers/reducer';
import * as usersActions from '../store/users/actions';
import * as userSelectors from '../store/users/reducer';
import { fadeInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  fadeInUp: {
    animation: 'fadeInUp 1s',
    animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
  }
};

class FactScreen extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.generatedNumber!==this.props.generatedNumber){
      this.props.dispatch(factsActions.fetchFact(nextProps.generatedNumber, nextProps.currentFilter));
    }
  }

  render() {
    if (!this.props.currentFact) return this.renderLoading();
    return (
      <StyleRoot>

        <div style={styles.fadeInUp} className={`NumberFilledWrap ${this.props.numberIsFilled ? '' : 'hidden' }`}>
          <h2>Your numbers are ready!</h2>
          <p>
            Would you like us to email your numbers and facts? No spam, ever – we don't do that.
          </p>
          
          <EmailForm db={this.props.db} isAuthenticated={this.props.isAuthenticated} />

          <div className="startOver">
            <button
              className="btn"
              onClick={this.onHandleStartOver}
            >
              Start over?
            </button>
          </div>
        </div>

        <div style={styles.fadeInUp} className={`FactScreen ${this.props.numberIsFilled ? 'hidden' : ''}`}>
          
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

      </StyleRoot>
    );
  }

  renderLoading() {
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
  }

  onAddToStackClick() {
    const { number, text } = this.props.currentFact;
    this.props.dispatch(numbersActions.addNumberFactToStack(number, text));
    // this.props.dispatch(factsActions.fetchFact());
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
  }

  onNextNumberClick() {
    // this.props.dispatch(factsActions.fetchFact());
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
  }

  onHandleStartOver(event) {
    this.props.dispatch(numbersActions.startOver());
    this.props.dispatch(numbersActions.generateRandomNumberFromState());
  }

}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
  const { currentFilter, currentFact } = factsSelectors.getFact(state);
  const { currentFactStack, generatedNumber, remainingStackLength } = numbersSelectors.getCurrentNumberSettings(state);
  return {
    currentFilter,
    currentFact,
    currentFactStack,
    generatedNumber,
    numberIsFilled: remainingStackLength === 0
  };
}

export default connect(mapStateToProps)(FactScreen);
