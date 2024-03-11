import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
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

} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";

export const saveMaintenanceCoverPayment = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  dispatch({
    type: SAVE_MAINTENANCE_COVER_PAYMENT,
    payload: null,
  });
  http
    .post("user/save-maintenance-cover-payment", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success("Maintenance Cover Purchased Successfully", {
          duration: 6000,
        });
        dispatch({
          type: SAVE_MAINTENANCE_COVER_PAYMENT_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/buyer-dashboard/maintenance-cover");
        }, 2000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error(
        "Technical Problem Occured Please Try Again or contatct Admin",
        { duration: 2000 }
      );
      dispatch({
        type: SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
        payload: error,
      });
    });
};

export const fetchBuyerMaintenanceRequests = () => (dispatch) => {
  dispatch({
    type: FETCH_BUYER_MAINTENANCE_REQUESTS,
    payload: null,
  });
  http
    .post(
      "user/buyer-maintenance-requests",
      doObjToFormData({ token: authToken() })
    )
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED,
        payload: error,
      });

      toast.error("Technical Issue", { duration: 4000 });

      useRedirectInvalidToken();
    });
};

export const fetchAddRequestPage = () => (dispatch) => {
  dispatch({
    type: FETCH_ADD_REQUEST_PAGE,
    payload: null,
  });
  http
    .post("user/add-request-page", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_ADD_REQUEST_PAGE_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_ADD_REQUEST_PAGE_FAILED,
        payload: error,
      });

      toast.error("Technical Issue", { duration: 4000 });

      useRedirectInvalidToken();
    });
};

export const addMaintenanceCoverRequest = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };

  let images = formData.request_images;
  delete formData.request_images;

  formData = doObjToFormData(formData);

  if (typeof images != "undefined" && Array.isArray(images)) {
    images.forEach((file) => {
      formData.append("request_images[]", file);
    });
  }

  dispatch({
    type: ADD_MAINTENANCE_COVER_REQUEST,
    payload: null,
  });
  httpBlob
    .post("user/add-maintenance-cover-request", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success("Request Submited Successfully", { duration: 6000 });
        dispatch({
          type: ADD_MAINTENANCE_COVER_REQUEST_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/buyer-dashboard/maintenance-cover");
        }, 1000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: ADD_MAINTENANCE_COVER_REQUEST_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Technical Issue", { duration: 4000 });
      dispatch({
        type: ADD_MAINTENANCE_COVER_REQUEST_FAILED,
        payload: error,
      });
      // useRedirectInvalidToken();
    });
};

export const getMCRequestData = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  dispatch({
    type: FETCH_MC_REQUEST_DATA,
    payload: null,
  });
  http
    .post("user/buyer-maintenance-request-detail", doObjToFormData(formData))
    .then(({ data }) => {
      dispatch({
        type: FETCH_MC_REQUEST_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      toast.error(
        "Technical Problem Occured Please Try Again or contatct Admin",
        { duration: 2000 }
      );
      dispatch({
        type: FETCH_MC_REQUEST_DATA_FAILED,
        payload: error,
      });
    });
};


