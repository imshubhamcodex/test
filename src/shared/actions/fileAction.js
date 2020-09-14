
import {
    uploadFile,
    submitFormDetails
} from '../api';


import {
    FILE_UPLOAD_PENDING,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    FORM_SUBMIT_PENDING,
    FORM_SUBMIT_SUCCESS,
    FORM_SUBMIT_ERROR
} from './types';


export const uploadFileAction = (file) => (dispatch) =>  {

    dispatch({
        type : FILE_UPLOAD_PENDING, 
    }) 

    uploadFile(file).then(res => {
       return dispatch({
            type : FILE_UPLOAD_SUCCESS,
            payload : res.data
        })   

    }).catch(err => {
        dispatch({
            type : FILE_UPLOAD_ERROR,
            payload : err
        })
    })
    
}


export const submitFormDetailsAction = (formData) => (dispatch) => {
    dispatch({
        type : FORM_SUBMIT_PENDING,
    });

    submitFormDetails(formData).then(res => dispatch({
        type : FORM_SUBMIT_SUCCESS
    })).catch(err => {
        dispatch({
            type: FORM_SUBMIT_ERROR,
        })
    })
}


