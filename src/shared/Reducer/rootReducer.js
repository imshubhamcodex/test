import { combineReducers } from "redux";

import flashMessages from './flashMessages'
import auth from './auth'
import fileReducer from './fileReducer';
import quizReducer from './quizReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    flashMessages,
    auth,
    categoryReducer,
    fileReducer,
    quizReducer
})