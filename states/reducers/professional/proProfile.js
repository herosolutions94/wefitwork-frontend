import { CREATE_PROFESSIONAL_PROFILE,
    CREATE_PROFESSIONAL_PROFILE_SUCCESS,
    CREATE_PROFESSIONAL_PROFILE_FAILED,
    FETCH_PROFESSIONAL_DASHBOARD_DATA,
    FETCH_PROFESSIONAL_DASHBOARD_DATA_SUCCESS,
    FETCH_PROFESSIONAL_DASHBOARD_DATA_FAILED,
    FETCH_PROFESSIONAL_ACCOUNT_SETTINGS,
    FETCH_PROFESSIONAL_ACCOUNT_SETTINGS_SUCCESS,
    FETCH_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED,
    SAVE_PROFESSIONAL_ACCOUNT_SETTINGS,
    SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_SUCCESS,
    SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED,
    CHANGE_PROFESSIONAL_PASSWORD,
    CHANGE_PROFESSIONAL_PASSWORD_SUCCESS,
    CHANGE_PROFESSIONAL_PASSWORD_FAILED,
  } from "../../actions/actionTypes";
  import { setCookie } from "cookies-next";
  
  const initialState = {
    isLoading: true,
    content: {},
    error: false,
    isFormProcessing: false,   
    isPassChangeProcessing: false,
    mem: {},
    pro_profile: {},
    received_sms: {},
   
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case CREATE_PROFESSIONAL_PROFILE:
        return {
          ...state,
          isFormProcessing: true,
        };
      case CREATE_PROFESSIONAL_PROFILE_SUCCESS:
        localStorage.setItem("email", payload.email);
        return {
          ...state,
          isFormProcessing: false,
        };
      case CREATE_PROFESSIONAL_PROFILE_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };

        case FETCH_PROFESSIONAL_DASHBOARD_DATA:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_PROFESSIONAL_DASHBOARD_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
          pro_profile: payload.pro_profile,
          received_sms: payload.received_sms
        };
      case FETCH_PROFESSIONAL_DASHBOARD_DATA_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
          pro_profile: {},
          received_sms: {}
        };

        case FETCH_PROFESSIONAL_ACCOUNT_SETTINGS:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_PROFESSIONAL_ACCOUNT_SETTINGS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
          pro_profile: payload.pro_profile
        };
      case FETCH_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
        };
  
      case SAVE_PROFESSIONAL_ACCOUNT_SETTINGS:
        return {
          ...state,
          isFormProcessing: true,
        };
      case SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };
  
      case CHANGE_PROFESSIONAL_PASSWORD:
        return {
          ...state,
          isPassChangeProcessing: true,
        };
      case CHANGE_PROFESSIONAL_PASSWORD_SUCCESS:
        return {
          ...state,
          isPassChangeProcessing: false,
        };
      case CHANGE_PROFESSIONAL_PASSWORD_FAILED:
        return {
          ...state,
          isPassChangeProcessing: false,
          error: payload,
        };
      
      default:
        return state;
    }
  }
  