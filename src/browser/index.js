import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from '../shared/App';
import { BrowserRouter } from 'react-router-dom'
import jwt from 'jsonwebtoken';
import 'bootstrap3/dist/css/bootstrap.min.css';
import $ from 'jquery';
import jQuery from 'jquery';
window.$ = jQuery;
import '../Assests/css/main.css';
import '../Assests/scss/style.scss';
import setAuthorizationToken from '../browser/setAuthorizationToken';

import configureStore from '../shared/store';
import { setCurrentUser } from '../shared/actions/authLoginAction'

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  console.log(jwt.decode(localStorage.jwtToken));
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
  //store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

const renderMethod = !!module.hot ? render : hydrate
renderMethod(
  <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>  
  </Provider>,
  
  document.getElementById('app')
);