import React, { Component } from 'react';
import SignupForm from './SignupForm';
import OAuthSignIn from './OAuthForm';
import { connect } from 'react-redux';
import { userSignuprequest } from '../actions/signupAction';
import { addFlashMessage } from '../actions/flashMessages';
import PropTypes from 'prop-types';

class SignupPage extends Component {

  constructor(props){
    super(props);
    this.state = {
       providers : ["google","facebook"]
    }
  }

  render() {
    const { userSignuprequest, addFlashMessage } = this.props;
    // const providers=["google","facebook"];

    return (
      <div>
        <h1>Join us</h1>
        <div className="container" style={{margin:"0% 3%"}}>
            <div className="col-lg-4 col-md-12" style={{padding:"17% 6%"}} >
              Why be old fashioned !! ,  Login in with  
              <div style={{display:"flex",flexDirection:"column"}}>
                {this.state.providers.map(ele => 
                  <OAuthSignIn 
                    provider={ele}
                  />
                )}
              </div>

            </div>

            <div className="col-lg-4 col-md-12">
              <SignupForm 
                 userSignuprequest={userSignuprequest} 
                addFlashMessage={addFlashMessage} />
            </div>
        </div>
        {/* <div className="col-md-4 col-md-offset-4"> */}
        {/* </div> */}
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignuprequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

//export default SignupPage;
export default connect(null, {userSignuprequest, addFlashMessage}) (SignupPage);
