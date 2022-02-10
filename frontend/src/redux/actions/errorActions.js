import { 
    GET_ERROR,
    CLEAR_ERRORS
} from './types';


// Get errors
export const getError = (msg, status, id = null) => {
    return{
        type: GET_ERROR,
        payload: {msg, status, id}
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}