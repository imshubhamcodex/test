import {
    FETCH_QUIZ_LOADING, 
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    FETCH_ANSWERS_LOADING,
    FETCH_ANSWERS_SUCCESS,
    FETCH_ANSWERS_ERROR
} from '../actions/types';

const INITIAL_STATE = [];

const quizReducer = (state = INITIAL_STATE ,action) => {

    const {type,payload} = action;

    switch(type){
        case FETCH_QUIZ_LOADING : {
            return {
                ...state,
                fetchQuizLoading : true
            };
        }
        case FETCH_QUIZ_SUCCESS : {
            return {
                ...state,
                fetchQuizLoading : false,
                fetchQuizSuccess : true,
                quizData: payload.data.data,
                quizCount : payload.data.count,
            }
        }
        case FETCH_QUIZ_ERROR : {
            return {
                ...state,
                fetchQuizLoading: false,
                fetchQuizError: true
            }
        }
        case FETCH_ANSWERS_LOADING : {
            return{
                ...state,
                fetchAnswerLoading : true
            }
        }

        case FETCH_ANSWERS_SUCCESS : {
            return{
                ...state,
                fetchAnswerLoading:false,
                fetchAnswerSuccess:true ,
                fetchedAnswers:payload.data.map(ele => {return {...ele, answer : ele.answer.replace(' ','')}} )
            }
        }

        case FETCH_ANSWERS_ERROR : {
            return{
                ...state,
                fetchAnswerLoading:false,
                fetchAnswerError : true
            }
        }

        default : return state;
    }
} 

export default quizReducer;


