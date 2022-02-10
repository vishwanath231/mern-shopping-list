import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';


export const reducer = combineReducers({
    auth: authReducer,
    error: errorReducer
});

