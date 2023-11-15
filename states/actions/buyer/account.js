import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import { toast } from "react-hot-toast";
import {
  SUCCESSFUL_ACCOUNT_SETTINGS_CHANGED,
  SUCCESSFUL_PASSWORD_CHANGED,
} from "@/components/constants/messages";
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
} from "../actionTypes";
import Text from "@/components/components/text";
import { authToken } from "@/components/helpers/authToken";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";

export const fetchBuyerDashboardData = () => (dispatch) => {
  dispatch({
    type: FETCH_BUYER_DASHBOARD_DATA,
    payload: null,
  });
  http
    .post("user/buyer-dashboard", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_BUYER_DASHBOARD_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      
      dispatch({
        type: FETCH_BUYER_DASHBOARD_DATA_FAILED,
        payload: error,
      });
      
        toast.error('Technical Issue', {duration : 4000});

      useRedirectInvalidToken();
    });
};

export const fetchBuyerAccountSettings = () => (dispatch) => {
  dispatch({
    type: FETCH_BUYER_ACCOUNT_SETTINGS,
    payload: null,
  });
  http
    .post("user/buyer-profile-settings", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      dispatch({
        type: FETCH_BUYER_ACCOUNT_SETTINGS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_BUYER_ACCOUNT_SETTINGS_FAILED,
        payload: error,
      });
      toast.error('Technical Issue', {duration : 4000});

      useRedirectInvalidToken();
    });
};

export const saveBuyerAccountSettings = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  let file = formData.profile;
  delete formData.profile;
  formData = doObjToFormData(formData);
  if (typeof file != "undefined") formData.append("profile", file[0]);
  // console.log(formData);

  dispatch({
    type: SAVE_BUYER_ACCOUNT_SETTINGS,
    payload: null,
  });
  httpBlob
    .post("user/save-buyer-profile-settings", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_ACCOUNT_SETTINGS_CHANGED, { duration: 6000 });
        dispatch({
          type: SAVE_BUYER_ACCOUNT_SETTINGS_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: SAVE_BUYER_ACCOUNT_SETTINGS_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error('Technical Issue', {duration : 4000});
      dispatch({
        type: SAVE_BUYER_ACCOUNT_SETTINGS_FAILED,
        payload: error,
      });
      // useRedirectInvalidToken();
    });
};

export const changeBuyerPassword = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  dispatch({
    type: CHANGE_BUYER_PASSWORD,
    payload: null,
  });
  http
    .post("user/change-password", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_PASSWORD_CHANGED);
        dispatch({
          type: CHANGE_BUYER_PASSWORD_SUCCESS,
          payload: data,
        });
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: CHANGE_BUYER_PASSWORD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: CHANGE_BUYER_PASSWORD_FAILED,
        payload: error,
      });
      toast.error('Technical Issue', {duration : 4000});
      // useRedirectInvalidToken();
    });
};
