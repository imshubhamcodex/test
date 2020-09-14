import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../Components/common/TextFieldGroup';
import TextAreaGroup from '../Components/common/TextAreaGroup';
import validateInput from '../../shared/validations/signup';
import {
  withRouter
} from 'react-router-dom'

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      email:'',
      pass:'',
      certifications:'',
      qualifications : '',
      organization:'',
      errors:{},
      isLoading: false,
      path:''
      

    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors:errors});
    }
    
    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignuprequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.props.history.push('/')
        },
        (error) => this.setState({ errors:error.response.data, isLoading:false })
      );
        
      }
    }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
            error={errors.username}
            label='Username'
            type="text"
            value={this.state.username}
            onChange={this.onChange}
            field="username"
          />
        <TextFieldGroup
            error={errors.email}
            label='Email'
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            field="email"
          />  
        <TextFieldGroup
            error={errors.pass}
            label='Password'
            type="password"
            value={this.state.pass}
            onChange={this.onChange}
            field="pass"
          /> 
         <TextAreaGroup
            error={errors.certifications}
            label='Certifications'
            value={this.state.certifications}
            onChange={this.onChange}
            field="certifications"
          />
          <TextAreaGroup
            error={errors.qualifications}
            label='Qualifications'
            value={this.state.qualifications}
            onChange={this.onChange}
            field="qualifications"
          />
          <TextAreaGroup
            error={errors.organization}
            label='Organization'
            value={this.state.organization}
            onChange={this.onChange}
            field="organization"
          />       
       
        <div className="form-group">
         
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
            Signup
          </button>
        </div>
      </form>
    );
  }

}

SignupForm.propTypes = {
  userSignuprequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

//export default SignupForm;
export default withRouter(SignupForm)
