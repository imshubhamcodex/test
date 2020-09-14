import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from './common/TextFieldGroup'
import validateInput from '../validations/login';
import { connect } from 'react-redux';
import { login } from '../actions/authLoginAction'
import { deleteAllFlashMessage } from '../actions/flashMessages';

import {
  withRouter
} from 'react-router-dom'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isValid () {
    const {errors , isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({errors});
    }
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors : {}, isLoading: true});
      this.props.login(this.state).then(
      () =>   {
        this.props.deleteAllFlashMessage();
        this.props.history.push('/');
        
      }).catch(error => {
        this.setState({isLoading : false, errors : error.response.data.errors});
      });
    }
    
  }

  
  onChange(e) {
    this.setState({ [e.target.name] : e.target.value});
  }

  render() {
      const { errors , identifier, password, isLoading} = this.state;
    
   
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }
        <TextFieldGroup
          field="identifier"
          label="Username/Email"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />
        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />
       <button disabled={isLoading} className="btn btn-primary btn-lg">
            Login
          </button>

      </form>
    )

  }
}


LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  deleteAllFlashMessage: PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login, deleteAllFlashMessage }) (withRouter(LoginForm));