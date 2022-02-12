import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { errorReducer } from './errorReducer';
import { itemReducer } from './itemReducer';


export const reducer = combineReducers({
    auth: authReducer,
    item: itemReducer,
    error: errorReducer
});

