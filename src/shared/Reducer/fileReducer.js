import {
    FILE_UPLOAD_PENDING,
    FILE_UPLOAD_SUCCESS,
    FILE_UPLOAD_ERROR,
    FORM_SUBMIT_PENDING,
    FORM_SUBMIT_SUCCESS,
    FORM_SUBMIT_ERROR
} from '../actions/types';


const INITIAL_STATE = [];


const fileReducer = (state = INITIAL_STATE , action) => {

    const {type,payload} = action;

    switch(type){

        case FILE_UPLOAD_PENDING : {
            return {...state,fileUploadPending : true};
        }

        case FILE_UPLOAD_SUCCESS : {
            return {...state, 
                fileUploadPending : false,
                fileUploadSuccess : true,
                fileName : payload.filename,
            };
        }

        case FILE_UPLOAD_ERROR : {
            return {...state,
                fileUploadPending : false,
                fileUploadError : true,
            };
        }

        case FORM_SUBMIT_PENDING : {
            return {...state, formSubmissionPending : true };
        }

        case FORM_SUBMIT_SUCCESS : {
            return {...state,formSubmissionPending :false,formSubmissionSuccess:true};
        }

        case FORM_SUBMIT_ERROR : {
            return {...state,formSubmissionPending :false,formSubmissionError:true};
        }

        default : return state;
    }
    
}

export default fileReducer;




