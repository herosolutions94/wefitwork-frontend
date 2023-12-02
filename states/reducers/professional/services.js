import {
  FETCH_SERVICES_DATA,
  FETCH_SERVICES_DATA_SUCCESS,
  FETCH_SERVICES_DATA_FAILED,
  UPDATE_SERVICES_DATA,
  UPDATE_SERVICES_DATA_SUCCESS,
  UPDATE_SERVICES_DATA_FAILED
} from "../../actions/actionTypes";
import { setCookie } from "cookies-next";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
  isFormProcessing: false,
  mem: {},

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


    default:
      return state;
  }
}
