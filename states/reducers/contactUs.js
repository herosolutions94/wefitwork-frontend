import {
    SAVE_CONTACT_QUERY,
    SAVE_CONTACT_QUERY_SUCCESS,
    SAVE_CONTACT_QUERY_FAILED,
  } from "../actions/actionTypes";
  
  const initialState = {
    error: false,
    isFormProcessing: false,
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case SAVE_CONTACT_QUERY:
        return {
          ...state,
          isFormProcessing: true,
        };
      case SAVE_CONTACT_QUERY_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case SAVE_CONTACT_QUERY_FAILED:
        return {
          ...state,
          isFormProcessing: false,
        };
      default:
        return state;
    }
  }
  