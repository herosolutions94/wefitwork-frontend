import {
    SIGN_IN_MESSAGE,
    SIGN_IN_MESSAGE_SUCCESS,
    SIGN_IN_MESSAGE_FAILED,
  } from "../actions/actionTypes";
  import { setCookie } from "cookies-next";
  
  const initialState = {
    error: false,
    isFormProcessing: false,
    authToken:
      typeof window !== "undefined"
        ? window.localStorage.getItem("authToken")
        : "",
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case SIGN_IN_MESSAGE:
        return {
          ...state,
          isFormProcessing: true,
        };
      case SIGN_IN_MESSAGE_SUCCESS:
        setCookie("authToken", payload.authToken);
        window.localStorage.removeItem("redirect_url");
  
        return {
          ...state,
          isFormProcessing: true,
        };
      case SIGN_IN_MESSAGE_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };
      default:
        return state;
    }
  }
  