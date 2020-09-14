import React from 'react';
import { addFlashMessage } from '../actions/flashMessages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom'


export default function (ComposedComponent, role) {
  class Authenticate extends React.Component {
    componentWillMount () {
      if (role == 'admin' && this.props.currentUser.role != 'admin') {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You have not access of this page'
        })
        this.props.history.push('/');
      }
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'error',
          text: 'You need to login to access this page'
        })
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  Authenticate.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      currentUser: state.auth.user
    };
  }
  
  return connect(mapStateToProps, { addFlashMessage }) (withRouter(Authenticate));

}


