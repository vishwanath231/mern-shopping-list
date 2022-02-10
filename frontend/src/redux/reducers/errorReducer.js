import {
    GET_ERROR,
    CLEAR_ERRORS
} from '../actions/types';


const initialState = {
    msg: {},
    status: null,
    id: null
}


export const errorReducer = (state = initialState, { type, payload }) => {
    
    switch (type) {
        case GET_ERROR:
            return{
                msg: payload.msg,
                status: payload.status,
                id: payload.id
            }
        
        case CLEAR_ERRORS: 
            return {
                msg: {},
                status: null,
                id: null
            }
            
        default:
            return state;
    }
} 