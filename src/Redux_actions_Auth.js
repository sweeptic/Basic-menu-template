import * as actionTypes from './Redux_actionTypes';
import axios from 'axios';

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   }
}

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData
   }
}

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   }
}

//hold async code - used by redux-thunk
export const auth = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      const authData = {
         email: email,
         password: password,
         returnSecureToken: true
      }
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB--v00MYbY8ryMblG80HhX4SHmgNf3l34', authData)
         .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
         })
         .catch(err => {
            console.log(err);
            dispatch(authFail(err));
         })
   }
}