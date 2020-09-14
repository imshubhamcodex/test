import React, { Component } from 'react';

import LoginForm from './LoginForm';
import OAuthSignIn from './OAuthForm';

export default class LoginPage extends Component {
  render() {
    const providers = ["google","facebook"];
    return (
      <div className="container">
        <div className="col-md-4 col-md-offset-4">
          <LoginForm />
          <div style={{margin:"10%"}}>
            <p style={{textAlign:"center"}}> OR </p>
            <div style={{margin:"10% 0%",padding:"0% 10%"}}>
              {providers.map(ele => 
                <OAuthSignIn 
                  provider={ele}
                /> )}
           </div>
          </div>
        </div>
      </div>
    )

  }
}