import {getQuestions,getAnswers} from '../api';

import {
    FETCH_QUIZ_LOADING, 
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    FETCH_ANSWERS_LOADING,
    FETCH_ANSWERS_SUCCESS,
    FETCH_ANSWERS_ERROR
} from './types'


export const fetchQuestions = (quizId,limit) => dispatch => {

    dispatch({
        type: FETCH_QUIZ_LOADING
    })

    getQuestions(quizId,limit).then(response => {
        dispatch({
            type: FETCH_QUIZ_SUCCESS,
            payload : response
        })
    }).catch(err =>{
        dispatch({
            type:FETCH_QUIZ_ERROR,
            payload:err
        })
    })
}


export const fetchAnswers = (qsidList) => dispatch => {
    
    dispatch({
        type: FETCH_ANSWERS_LOADING
    });

    getAnswers(qsidList).then(response => {
        dispatch({
            type:FETCH_ANSWERS_SUCCESS,
            payload:response
        })
    }).catch(err => {
        dispatch({
            type: FETCH_ANSWERS_ERROR,
            payload: err  
        })
    })



}
