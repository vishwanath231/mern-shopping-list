import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING,
    ITEM_CHECK
} from './types';
import axios from 'axios';
import { getError } from './errorActions';
import { tokenConfig } from './authActions';



// Get all items
export const getItems = () => dispatch => {

    dispatch(setItemLoading());

    axios.get('/api/items')
    .then(res => {
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    }).catch(err => 

        dispatch(getError(err.response.data, err.response.status))
    )   
}



// Add item
export const addItem = (item) => (dispatch,getState) => {

    axios.post('/api/items',item, tokenConfig(getState))
    .then(res =>
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        })
      )
      .catch(err =>{
        dispatch(getError(err.response.data, err.response.status, "ADD_FAIL"))
      });

}


// Delete Item
export const deleteItem = (id) => (dispatch, getState) => {

    axios.delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    }).catch(err => 

        dispatch(getError(err.response.data, err.response.status))
    )
}


// Check or uncheck item
export const isCheckItem = (id,check) => (dispatch, getState) => {

    axios.put(`/api/items/${id}`, check, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ITEM_CHECK,
            id: id,
            payload: res.data
        })

    }).catch(err => 

        dispatch(getError(err.response.data, err.response.status))
    )
}


// loading
export const setItemLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}