import {
  SAVE_MAINTENANCE_COVER_PAYMENT,
  SAVE_MAINTENANCE_COVER_PAYMENT_SUCCESS,
  SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
  FETCH_BUYER_MAINTENANCE_REQUESTS,
  FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS,
  FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED,
  FETCH_ADD_REQUEST_PAGE,
  FETCH_ADD_REQUEST_PAGE_SUCCESS,
  FETCH_ADD_REQUEST_PAGE_FAILED,
  ADD_MAINTENANCE_COVER_REQUEST,
  ADD_MAINTENANCE_COVER_REQUEST_SUCCESS,
  ADD_MAINTENANCE_COVER_REQUEST_FAILED,
  FETCH_MC_REQUEST_DATA,
  FETCH_MC_REQUEST_DATA_SUCCESS,
  FETCH_MC_REQUEST_DATA_FAILED,
 
} from "../../actions/actionTypes";
import { setCookie } from "cookies-next";

const initialState = {
  isLoading: true,
  content: {},
  error: false,
  isFormProcessing: false,
  mem: {},
  mc_requests: {},
  requestImages: {},
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
        mc_requests: {},
      };
    case FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        mem: payload.member,
        mc_requests: payload.mc_requests,
      };
    case FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED:
      return {
        ...state,
        isLoading: false,
        mem: {},
        mc_requests: {},
        error: payload,
      };

    case FETCH_ADD_REQUEST_PAGE:
      return {
        ...state,
        isLoading: true,
        mem: {},
      };
    case FETCH_ADD_REQUEST_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        mem: payload.member,
      };
    case FETCH_ADD_REQUEST_PAGE_FAILED:
      return {
        ...state,
        isLoading: false,
        mem: {},
        error: payload,
      };

    case ADD_MAINTENANCE_COVER_REQUEST:
      return {
        ...state,
        isFormProcessing: true,
      };
    case ADD_MAINTENANCE_COVER_REQUEST_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
      };
    case ADD_MAINTENANCE_COVER_REQUEST_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };

    case FETCH_MC_REQUEST_DATA:
      return {
        ...state,
        isLoading: true,
        mem: {},
        requestImages: {},
      };
    case FETCH_MC_REQUEST_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        content: payload,
        mem: payload.member,
        requestImages: payload.requestImages,
      };
    case FETCH_MC_REQUEST_DATA_FAILED:
      return {
        ...state,
        isLoading: false,
        mem: {},
        requestImages: {},
        error: payload,
        
      };

      

    default:
      return state;
  }
}
