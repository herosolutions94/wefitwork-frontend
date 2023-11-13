import {
    SAVE_NEWSLETTER,
    SAVE_NEWSLETTER_SUCCESS,
    SAVE_NEWSLETTER_FAILED,
  } from "../actions/actionTypes";
  
  const initialState = {
    error: false,
    isFormProcessing: false,
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case SAVE_NEWSLETTER:
        return {
          ...state,
          isFormProcessing: true,
        };
      case SAVE_NEWSLETTER_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case SAVE_NEWSLETTER_FAILED:
        return {
          ...state,
          isFormProcessing: false,
        };
      default:
        return state;
    }
  }
  