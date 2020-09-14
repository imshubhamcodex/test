import axios from "axios"
import setAuthorizationToken from '../../browser/setAuthorizationToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from "./types";

export function setCurrentUser(user) {
  return {
    type : SET_CURRENT_USER,
    user : user
  }
}

export function login(userData) {
  return dispatch => {
    return axios.post('/api/auth', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  }
}

export function setOAuthLogin(logInObj){
  const token = JSON.parse(logInObj).token;
  return dispatch => {
    localStorage.setItem('jwtToken',token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
    }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}