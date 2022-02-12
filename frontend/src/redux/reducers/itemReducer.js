import { 
    ADD_ITEM,
    GET_ITEMS,
    DELETE_ITEM,
    ITEMS_LOADING,
    ITEM_CHECK
} from '../actions/types';

const initialState = {
    items: [],
    isLoading: false
}

export const itemReducer = (state = initialState, { type, payload, id }) => {

    switch (type) {
        case GET_ITEMS:
            return{
                ...state,
                items: payload,
                isLoading: false
            }
        case DELETE_ITEM: 
            return {
                ...state,
                items: state.items.filter(val => val._id !== payload)
            }
        case ADD_ITEM: 
            return {
                ...state,
                items: [payload,...state.items]
            }
        
        case ITEMS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ITEM_CHECK: 
            return {
                ...state,
                items: state.items.map(val => val._id === id ? payload : val)
            }
        default:
            return state;
    }
}