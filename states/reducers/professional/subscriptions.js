import {
    FETCH_MEM_SUBSCRIPTIONS,
  FETCH_MEM_SUBSCRIPTIONS_SUCCESS,
  FETCH_MEM_SUBSCRIPTIONS_FAILED,
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
      case FETCH_MEM_SUBSCRIPTIONS:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_MEM_SUBSCRIPTIONS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
          pro_profile: payload.pro_profile
        };
      case FETCH_MEM_SUBSCRIPTIONS_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
        };
     
  
  
      default:
        return state;
    }
  }
  