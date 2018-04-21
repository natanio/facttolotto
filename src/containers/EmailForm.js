import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as usersActions from '../store/users/actions';
import * as userSelectors from '../store/users/reducer';

class EmailForm extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
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
        <input
          className={shouldMarkError('email') ? "error" : ""}
          type="text" 
          placeholder="john@mail.com" 
          onBlur={this.handleBlur('email')}
          onChange={this.onHandleEmailChange} 
          value={this.props.user_email ? this.props.user_email : ''}
          />
        <button className="btn emailBtn" disabled={!isEnabled}>
          Send
        </button>
        <div className="errorMsg">Please enter a valid email.</div>
      </div>
    )
  }

  onHandleEmailChange(event) {
    console.log(`user email is: ${event}`)
    console.log(event.target.value);
    let { value } = event.target;
    this.props.dispatch(usersActions.updateInputEmail(value));
  }

  handleBlur = (field) => (evt) => {
    this.props.dispatch(usersActions.updateTouchedState(field))
    console.log('after blur');
    console.log(this.props);
  }
}

function validate(email) {
  console.log(`type of email? ${typeof email}`);
  if (typeof email === 'undefined') return true;
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return {
    email: !re.test(email),
  };
}

function mapStateToProps(state) {
  return {
    user_email: userSelectors.getUserEmail(state),
    touched: userSelectors.getTouched(state),
  }
}

export default connect(mapStateToProps)(EmailForm);
