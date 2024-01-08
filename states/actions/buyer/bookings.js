import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import { toast } from "react-hot-toast";
import {
    FETCH_BUYER_BOOKINGS,
    FETCH_BUYER_BOOKINGS_SUCCESS,
    FETCH_BUYER_BOOKINGS_FAILED,
    FETCH_BUYER_BOOKING_DETAILS,
    FETCH_BUYER_BOOKING_DETAILS_SUCCESS,
    FETCH_BUYER_BOOKING_DETAILS_FAILED,
} from "../actionTypes";
import Text from "@/components/components/text";
import { authToken } from "@/components/helpers/authToken";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";

export const fetchBookings = () => (dispatch) => {
  dispatch({
    type: FETCH_BUYER_BOOKINGS,
    payload: null,
  });
  http
    .post("user/buyer-dashboard", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_BUYER_BOOKINGS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      
      dispatch({
        type: FETCH_BUYER_BOOKINGS_FAILED,
        payload: error,
      });
      
        toast.error('Technical Issue', {duration : 4000});

      useRedirectInvalidToken();
    });
};

export const fetchBookingDetails = (slug) => (dispatch) => {
    dispatch({
      type: FETCH_BUYER_BOOKING_DETAILS,
      payload: null,
    });
    http
      .post(`user/booking-details/${slug}`, doObjToFormData({ token: authToken() }))
      .then(({ data }) => {
        // console.log(data);
        dispatch({
          type: FETCH_BUYER_BOOKING_DETAILS_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log(error);
        
        dispatch({
          type: FETCH_BUYER_BOOKING_DETAILS_FAILED,
          payload: error,
        });
        
          toast.error('Technical Issue', {duration : 4000});
  
        useRedirectInvalidToken();
      });
  };
  

