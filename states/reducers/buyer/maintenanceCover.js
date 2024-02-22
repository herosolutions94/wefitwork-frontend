import {
  SAVE_MAINTENANCE_COVER_PAYMENT,
  SAVE_MAINTENANCE_COVER_PAYMENT_SUCCESS,
  SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
  FETCH_BUYER_MAINTENANCE_REQUESTS,
  FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS,
  FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED,
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
    case SAVE_MAINTENANCE_COVER_PAYMENT:
      return {
        ...state,
        isFormProcessing: true,
      };
    case SAVE_MAINTENANCE_COVER_PAYMENT_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
      };
    case SAVE_MAINTENANCE_COVER_PAYMENT_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };

    case FETCH_BUYER_MAINTENANCE_REQUESTS:
      return {
        ...state,
        isLoading: true,
        mem: {},
      };
    case FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        mem: payload.member,

      };
    case FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED:
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
