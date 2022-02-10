import { 
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR

} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoding: false,
    user: null
}

export const authReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoding: true
            }
    
        case USER_LOADED: 
            return{
                ...state,
                isAuthenticated: true,
                isLoding: false,
                user: payload
            }   
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS: 
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                isLoding: false,
            } 
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoding: false,
                user: null
            }
            
        default:
            return state;
    }
}
