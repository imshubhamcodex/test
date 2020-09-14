import React from 'react';
import { addFlashMessage } from '../actions/flashMessages';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom'


export default function (ComposedComponent) {
  class Anonymous extends React.Component {

    componentWillMount () {
      if (this.props.isAuthenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Anonymous.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  Anonymous.contextTypes = {
    router: PropTypes.object.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  
  return connect(mapStateToProps, { addFlashMessage }) (withRouter(Anonymous));

}


