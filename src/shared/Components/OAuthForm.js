import React , {Component} from 'react';
import {connect} from 'react-redux';
import {setOAuthLogin} from '../actions/authLoginAction';
import {
    withRouter
  } from 'react-router-dom'
  
class OAuthSignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            disabled: false        
        }
        this.getidpButton = this.getidpButton.bind(this);
        this.startAuth = this.startAuth.bind(this);
        this.openPopUp = this.openPopUp.bind(this);
        this.checkPopup = this.checkPopup.bind(this);
        this.handleWindowClose = this.handleWindowClose.bind(this);
    }

    getidpButton(idpName){
        //onClick={(event) => {this.startAuth(event,"google")} }
        switch(idpName){
           case "google" : {
               return <button 
                className="btn btn-danger" 
                name="google" 
                onClick={this.startAuth}
                style={{margin:"5px"}}
                > Google </button>  
           }
           case "facebook" : {
               return <button 
                className="btn btn-primary" 
                name="facebook" 
                onClick={this.startAuth}
                style={{margin:"5px"}}
                > Facebook </button>
           } 
        }
    }

    handleWindowClose(token){
        this.popUp.close();
        this.props.setOAuthLogin(token);
        this.props.history.push('/');
    }

    checkPopup(){
        const check = setInterval(() => {
        const { popUp } = this;
        this.popUp.document.activeElement.innerText.length > 0 
            ? [clearInterval(check),this.handleWindowClose(this.popUp.document.activeElement.innerText)] 
            : ''
        if (!popUp || popUp.closed || popUp.closed === undefined) {
            clearInterval(check)    
            this.setState({ disabled: false})
        }
        }, 1000);
    }

    openPopUp(idp){
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `https://simplyopen.in/api/auth/${idp}`;
        
        return window.open(url, '',       
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth(event){
        if(!this.state.disabled){
            event.preventDefault();
            const idp = event.target.name;
            this.popUp  = this.openPopUp(idp);
            this.checkPopup();
            this.setState({disabled:true})
        }
    }

    render(){
        const {provider} = this.props;
        return this.getidpButton(provider);
    }
} 

const mapStateToProps = () => ({})
const mapDispatchToProps = {
    setOAuthLogin
}

export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(OAuthSignIn));