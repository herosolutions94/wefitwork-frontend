import {
    RESET_PASSWORD_LINK,
    RESET_PASSWORD_LINK_SUCCESS,
    RESET_PASSWORD_LINK_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
  } from "../actions/actionTypes";
  
  const initialState = {
    isFormProcessing: false,
    error: false,
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case RESET_PASSWORD_LINK:
        return {
          ...state,
          isFormProcessing: true,
        };
      case RESET_PASSWORD_LINK_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case RESET_PASSWORD_LINK_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };
  
      case RESET_PASSWORD:
        return {
          ...state,
          isFormProcessing: true,
        };
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case RESET_PASSWORD_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };
  
      default:
        return state;
    }
  }
  