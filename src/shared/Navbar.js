import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { logout } from '../shared/actions/authLoginAction';
import {
  withRouter
} from 'react-router-dom'


class Navbar extends Component {
  
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const { isAuthenticated , user} = this.props.auth;
    const userLink = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-right">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/categories'}>
                Categories
              </NavLink>
            </li>
            {
              user.role === 'admin' && (
                <li className="nav-item">
                  <NavLink to={'/admin/metaData'}>
                    Handle MetaData
                  </NavLink>
                </li>)
              }
            <li className="nav-item">
              <NavLink to={'/myaccount'}>
                MyAccount
              </NavLink>
            </li>
            <li className="nav-item">
              <a href="#"
                 onClick={this.logout.bind(this)}>
                Logout</a>
            </li>
          </ul>
        </nav>

    );

    const guestLink = (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-right">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/login'}
                       >
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/signup'}
                       >
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/categories'}
                       >
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>

    );

    return (
      <header className="navbar-header">
        <div className='container'>
          <div className='row'>
          <div className="col-md-2">
            <div className="logo">
              <a href="/"> <img className="img-fluid" src="/images/logo.png"/></a>
            </div>

           </div>
           <div className='col-md-10'>
              {isAuthenticated  ? userLink : guestLink}
              
           </div>
       
          </div>
        </div>
       </header>
     )
  }
  
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout : PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth
    
  }
}

export default connect(mapStateToProps, { logout }) (withRouter( Navbar ));

