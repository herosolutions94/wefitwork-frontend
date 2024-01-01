import {
    FETCH_BUYER_DASHBOARD_DATA,
    FETCH_BUYER_DASHBOARD_DATA_SUCCESS,
    FETCH_BUYER_DASHBOARD_DATA_FAILED,
    FETCH_BUYER_ACCOUNT_SETTINGS,
    FETCH_BUYER_ACCOUNT_SETTINGS_SUCCESS,
    FETCH_BUYER_ACCOUNT_SETTINGS_FAILED,
    SAVE_BUYER_ACCOUNT_SETTINGS,
    SAVE_BUYER_ACCOUNT_SETTINGS_SUCCESS,
    SAVE_BUYER_ACCOUNT_SETTINGS_FAILED,
    CHANGE_BUYER_PASSWORD,
    CHANGE_BUYER_PASSWORD_SUCCESS,
    CHANGE_BUYER_PASSWORD_FAILED,
  } from "../../actions/actionTypes";
  
  const initialState = {
    isLoading: true,
    isFormProcessing: false,
    isPassChangeProcessing: false,
    content: {},
    mem: {},
    error: false,
    sent_sms: {},
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case FETCH_BUYER_DASHBOARD_DATA:
        return {
          ...state,
          isLoading: true,
          mem: {},
          sent_sms: {}
        };
      case FETCH_BUYER_DASHBOARD_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
          sent_sms: payload.sent_sms
        };
      case FETCH_BUYER_DASHBOARD_DATA_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
          sent_sms: {}
        };
  
      case FETCH_BUYER_ACCOUNT_SETTINGS:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_BUYER_ACCOUNT_SETTINGS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
        };
      case FETCH_BUYER_ACCOUNT_SETTINGS_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
        };
  
      case SAVE_BUYER_ACCOUNT_SETTINGS:
        return {
          ...state,
          isFormProcessing: true,
        };
      case SAVE_BUYER_ACCOUNT_SETTINGS_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case SAVE_BUYER_ACCOUNT_SETTINGS_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };
  
      case CHANGE_BUYER_PASSWORD:
        return {
          ...state,
          isPassChangeProcessing: true,
        };
      case CHANGE_BUYER_PASSWORD_SUCCESS:
        return {
          ...state,
          isPassChangeProcessing: false,
        };
      case CHANGE_BUYER_PASSWORD_FAILED:
        return {
          ...state,
          isPassChangeProcessing: false,
          error: payload,
        };
      default:
        return state;
    }
  }
  