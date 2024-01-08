import {
    FETCH_REVIEW_PAGE_DATA,
    FETCH_REVIEW_PAGE_DATA_SUCCESS,
    FETCH_REVIEW_PAGE_DATA_FAILED,
    SAVE_REVIEW,
SAVE_REVIEW_SUCCESS,
SAVE_REVIEW_FAILED,
  } from "../../actions/actionTypes";
  
  const initialState = {
    isLoading: true,
    isFormProcessing: false,
    content: {},
    mem: {},
    error: false,
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
  
      case FETCH_REVIEW_PAGE_DATA:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_REVIEW_PAGE_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
        };
      case FETCH_REVIEW_PAGE_DATA_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
        };
        case SAVE_REVIEW:
      return {
        ...state,
        isFormProcessing: true,
      };
    case SAVE_REVIEW_SUCCESS:
      return {
        ...state,
        isFormProcessing: false,
      };
    case SAVE_REVIEW_FAILED:
      return {
        ...state,
        isFormProcessing: false,
        error: payload,
      };
  
      
      default:
        return state;
    }
  }
  