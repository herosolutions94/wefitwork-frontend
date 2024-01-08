import {
    FETCH_BUYER_BOOKINGS,
    FETCH_BUYER_BOOKINGS_SUCCESS,
    FETCH_BUYER_BOOKINGS_FAILED,
    FETCH_BUYER_BOOKING_DETAILS,
    FETCH_BUYER_BOOKING_DETAILS_SUCCESS,
    FETCH_BUYER_BOOKING_DETAILS_FAILED,
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
      case FETCH_BUYER_BOOKINGS:
        return {
          ...state,
          isLoading: true,
          mem: {},
          
        };
      case FETCH_BUYER_BOOKINGS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
          
        };
      case FETCH_BUYER_BOOKINGS_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,
          
        };
  
      case FETCH_BUYER_BOOKING_DETAILS:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_BUYER_BOOKING_DETAILS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
        };
      case FETCH_BUYER_BOOKING_DETAILS_FAILED:
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
  