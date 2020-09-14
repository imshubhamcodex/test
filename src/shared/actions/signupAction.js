import axios from "axios"

export function userSignuprequest(userData) {
    return  dispatch => {
       return axios.post('/api/users', userData); 
    }
}