import {
REQUEST_VERIFY_PHONE,
  REQUEST_VERIFY_PHONE_SUCCESS,
  REQUEST_VERIFY_PHONE_FAILED,
  } from "../../actions/actionTypes";
  import { setCookie } from "cookies-next";
  
  const initialState = {
    isLoading: true,
    content: {},
    error: false,
    isFormProcessing: false,
    mem: {},
    pro_profile: {},
  
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {

  
        case REQUEST_VERIFY_PHONE:
          return {
            ...state,
            isFormProcessing: true,
          };
        case REQUEST_VERIFY_PHONE_SUCCESS:
          // localStorage.setItem("email", payload.email);
          return {
            ...state,
            isFormProcessing: false,
          };
        case REQUEST_VERIFY_PHONE_FAILED:
          return {
            ...state,
            isFormProcessing: false,
            error: payload,
          };
  
  
      default:
        return state;
    }
  }
  