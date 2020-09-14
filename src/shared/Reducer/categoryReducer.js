import {
    QUIZ_LIST_LOADING,
    QUIZ_LIST_SUCCESS,
    QUIZ_LIST_ERROR
  } from '../actions/types';


  const INITIAL_STATE = [];


  const categoryReducer = ( state = INITIAL_STATE , action ) => {

    const {type,payload} = action;

    switch(type){
        case QUIZ_LIST_LOADING : {
            return {
                ...state,
                quizListLoading : true
            }
        }
        case QUIZ_LIST_SUCCESS : {
            return {
                ...state,
                quizListLoading:false,
                quizListSuccess:true,
                quizList : payload
            }
        }
        case QUIZ_LIST_ERROR :{
            return {
                ...state,
                quizListError : false
            }
        }
        default : {return state};
    }

  }

  export default categoryReducer;