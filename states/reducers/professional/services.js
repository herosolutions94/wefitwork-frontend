import {
  FETCH_SERVICES_DATA,
  FETCH_SERVICES_DATA_SUCCESS,
  FETCH_SERVICES_DATA_FAILED,
  UPDATE_SERVICES_DATA,
  UPDATE_SERVICES_DATA_SUCCESS,
  UPDATE_SERVICES_DATA_FAILED,
  SAVE_BUSINESS_DATA,
  SAVE_BUSINESS_DATA_SUCCESS,
  SAVE_BUSINESS_DATA_FAILED,
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
  verify_popup: false,

};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SERVICES_DATA:
      return {
        ...state,
        isLoading: true,
        mem: {},
      };
    case FETCH_SERVICES_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        mem: payload.member,
        pro_profile: payload.pro_profile
      };
    case FETCH_SERVICES_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        mem: {},
        error: payload,
      };
    case UPDATE_SERVICES_DATA:
      return {
        ...state,
        isFormProcessing: true,
      };
    case UPDATE_SERVICES_DATA_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
      };
    case UPDATE_SERVICES_DATA_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };

      case SAVE_BUSINESS_DATA:
      return {
        ...state,
        isFormProcessing: true,
      };
    case SAVE_BUSINESS_DATA_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
      };
    case SAVE_BUSINESS_DATA_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };

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


    default:
      return state;
  }
}
