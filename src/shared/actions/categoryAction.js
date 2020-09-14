import {
  QUIZ_LIST_LOADING,
  QUIZ_LIST_SUCCESS,
  QUIZ_LIST_ERROR
} from './types';
import axios from "axios";
import {getQuizList} from '../api';

export function category(categoryData) {
  return dispatch => {
    return axios.post('/api/category', categoryData);
  }
}

export function getCategoryList(categoryData) {
    return dispatch => {
      return axios.get('/api/category/list');
    }
  }

export const fetchQuizList = (catId) => (dispatch) => {

  dispatch({
    type: QUIZ_LIST_LOADING
  })

  getQuizList(catId).then( response => {
    dispatch({
      type:QUIZ_LIST_SUCCESS,
      payload:response.data
    })
  }).catch(err => {
    dispatch({
      type:QUIZ_LIST_ERROR
    })
  })


}