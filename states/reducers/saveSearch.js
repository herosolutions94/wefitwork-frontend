import {
    SAVE_SEARCH_DATA,
    SAVE_SEARCH_DATA_SUCCESS,
    SAVE_SEARCH_DATA_FAILED,
  } from "../actions/actionTypes";
  
  const initialState = {
    error: false,
    isFormProcessing: false,
    
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case SAVE_SEARCH_DATA:
        return {
          ...state,
          isFormProcessing: true,
        };
      case SAVE_SEARCH_DATA_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case SAVE_SEARCH_DATA_FAILED:
        return {
          ...state,
          isFormProcessing: false,
        };
      default:
        return state;
    }
  }
  