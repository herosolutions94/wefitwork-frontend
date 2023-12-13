import {
  REQUEST_VERIFY_PHONE,
  REQUEST_VERIFY_PHONE_SUCCESS,
  REQUEST_VERIFY_PHONE_FAILED,
  VERIFY_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER_SUCCESS,
  VERIFY_PHONE_NUMBER_FAILED,
  } from "../../actions/actionTypes";
  import { setCookie } from "cookies-next";
  
  const initialState = {
    isLoading: true,
    error: false,
    isFormProcessing: false,
    mem: {},
    pro_profile: {},
    verify_popup: false,
  
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case REQUEST_VERIFY_PHONE:
        return {
          ...state,
          isFormProcessing: true,
        };
      case REQUEST_VERIFY_PHONE_SUCCESS:
       
        return {
          ...state,
          isFormProcessing: false,
          pro_profile: payload.pro_profile,
          verify_popup:true
        };
      case REQUEST_VERIFY_PHONE_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };  

        case VERIFY_PHONE_NUMBER:
        return {
          ...state,
          isFormProcessing: true,
        };
      case VERIFY_PHONE_NUMBER_SUCCESS:
       
        return {
          ...state,
          isFormProcessing: true,
          pro_profile: payload.pro_profile,
          verify_popup:true
        };
      case VERIFY_PHONE_NUMBER_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        }; 
  
      default:
        return state;
    }
  }
  