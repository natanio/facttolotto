import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as usersActions from '../store/users/actions';
import * as userSelectors from '../store/users/reducer';
import * as numberSelectors from '../store/numbers/reducer';
import { fadeInUpBig } from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
  fadeInUpBig: {
    animation: 'fadeInUpBig 500ms',
    animationName: Radium.keyframes(fadeInUpBig, 'fadeInUpBig')
  }
};

class EmailForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate() {
    if (this.props.emailSent) {
      setTimeout(function() { 
        this.props.dispatch(usersActions.showEmailSentConfirmation(false));
        this.forceUpdate(); 
      }.bind(this), 5000);
    }
  }

  render () {
    const errors = validate(this.props.user_email);
    const isEnabled = this.props.user_email ? !Object.keys(errors).some(x => errors[x]) : false;
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.props.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div className="inlineFormGroup">
        <div style={styles.fadeInUpBig} className={this.props.emailSent ? 'emailConfirmation' : 'emailConfirmation hidden'}>Your email was sent!</div>
        <input
          className={shouldMarkError('email') ? "error" : ""}
          type="text" 
          placeholder="john@mail.com" 
          onBlur={this.handleBlur('email')}
          onChange={this.onHandleEmailChange} 
          value={this.props.user_email ? this.props.user_email : ''}
          />
        <button 
          className="btn emailBtn"
          onClick={this.onSendClick}
          disabled={!isEnabled}>
          Send
        </button>
        <div className="errorMsg">Please enter a valid email.</div>
      </div>
    )
  }

  onHandleEmailChange(event) {
    let { value } = event.target;
    this.props.dispatch(usersActions.updateInputEmail(value));
  }

  handleBlur = (field) => (evt) => {
    this.props.dispatch(usersActions.updateTouchedState(field))
  }

  onSendClick() {
    let {user_email, stackNumbers, currentStackFacts} = this.props;
    let dbCon = this.props.db.database().ref();    

    // Send the email first
    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user_email,
        numbers: stackNumbers,
        facts: currentStackFacts
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        console.log('We had a problem, Houston');
      } else {

        // Then check if we should save this as a new email in firebase
        if (this.props.isAuthenticated) {
          dbCon.child("users").orderByChild("email").equalTo(user_email).once("value",snapshot => {
            const userData = snapshot.val();
            if (userData){
              return;
            }
            dbCon.child('users').push({
              email: user_email,
            });
          });
        }
        
        // Show a confirmation message
        this.props.dispatch(usersActions.showEmailSentConfirmation(true));
      }
    });
  }
}

function validate(email) {
  if (typeof email === 'undefined') return true;
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    email: !re.test(email),
  };
}

function mapStateToProps(state) {
  const { currentStackFacts, stackNumbers } = numberSelectors.getCurrentNumberSettings(state);
  const emailSent = userSelectors.emailSent(state);
  return {
    user_email: userSelectors.getUserEmail(state),
    touched: userSelectors.getTouched(state),
    stackNumbers: stackNumbers,
    currentStackFacts: currentStackFacts,
    emailSent: emailSent
  }
}

export default connect(mapStateToProps)(EmailForm);
