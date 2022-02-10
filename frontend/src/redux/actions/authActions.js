import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR
} from './types';
import axios from 'axios';
import { getError } from './errorActions';




// user loaded 
export const loadUser = () => (dispatch, getState) => {

    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    })
    .catch(err => {

        dispatch(getError(err.response.data, err.response.status));

        dispatch({
            type: AUTH_ERROR
        });
    })
}





// Register for new user
export const register = ({ name ,email, password, password2 }) => dispatch => {

    const config = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    const body = JSON.stringify({ name, email, password, password2 });

    axios.post('/api/auth/register',body, config)
    .then(res => {

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {

        dispatch(getError(err.response.data, err.response.status, "REGISTER_FAIL"));

        dispatch({
            type: REGISTER_FAIL
        });
    })
}






// Login 
export const login = ({ email, password }) => dispatch => {

    const config = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    const body = JSON.stringify({ email, password });

    axios.post('/api/auth/login', body, config)
    .then(res => {

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {

        dispatch(getError(err.response.data, err.response.status, "LOGIN_FAIL"));

        dispatch({
            type: LOGIN_FAIL
        });

    })
}





// Logout
export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}





// token configuration
export const tokenConfig = getState => {

    // Get token from localstorage
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            "Content-type": "Application/json"
        }
    }

    // if token, add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
}