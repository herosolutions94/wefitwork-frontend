import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
    PROFESSIONAL_PROFILE_CREATED_MESSAGE,
    SUCCESSFUL_ACCOUNT_SETTINGS_CHANGED,
    SUCCESSFUL_PASSWORD_CHANGED,
} from "@/components/constants/messages";

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
  } from "../actionTypes";


import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";

export const createProfessionalProfile = (formData) => (dispatch) => {
    formData = {...formData, token: authToken()}
  dispatch({
    type: CREATE_PROFESSIONAL_PROFILE,
    payload: null,
  });
  http
    .post("user/create-professional-profile", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(PROFESSIONAL_PROFILE_CREATED_MESSAGE, { duration: 6000 });
        dispatch({
          type: CREATE_PROFESSIONAL_PROFILE_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          setCookie('mem_type', data.mem_type);

            window.location.replace("/professional-dashboard");
        }, 2000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: CREATE_PROFESSIONAL_PROFILE_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error('Technical Problem Occured Please Try Again or contatct Admin', { duration: 2000 })
      dispatch({
        type: CREATE_PROFESSIONAL_PROFILE_FAILED,
        payload: error,
      });
      // setTimeout(() => {
      //     window.location.replace("/email-verification");
      //   }, 3000);
    });
};

export const fetchProfessioanlDashboardData = () => (dispatch) => {
  dispatch({
    type: FETCH_PROFESSIONAL_DASHBOARD_DATA,
    payload: null,
  });
  http
    .post("user/professional-dashboard", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_PROFESSIONAL_DASHBOARD_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      
      dispatch({
        type: FETCH_PROFESSIONAL_DASHBOARD_DATA_FAILED,
        payload: error,
      });
      
        toast.error('Technical Issue', {duration : 4000});

      useRedirectInvalidToken();
    });
};

export const fetchProfessionalAccountSettings = () => (dispatch) => {
  dispatch({
    type: FETCH_PROFESSIONAL_ACCOUNT_SETTINGS,
    payload: null,
  });
  http
    .post("user/professional-profile-settings", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      dispatch({
        type: FETCH_PROFESSIONAL_ACCOUNT_SETTINGS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED,
        payload: error,
      });
      toast.error('Technical Issue', {duration : 4000});

      useRedirectInvalidToken();
    });
};

export const saveProfessionalAccountSettings = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  let file = formData.profile;
  delete formData.profile;
  let images = formData.portfolio_images;
  delete formData.portfolio_images;

  formData = doObjToFormData(formData);
  if (typeof file != "undefined") formData.append("profile", file[0]);

  if (typeof images != "undefined" && Array.isArray(images)) {
  images.forEach((file) => {
    formData.append("portfolioImages[]", file);
  });
}

  dispatch({
    type: SAVE_PROFESSIONAL_ACCOUNT_SETTINGS,
    payload: null,
  });
  httpBlob
    .post("user/save-professional-profile-settings", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_ACCOUNT_SETTINGS_CHANGED, { duration: 6000 });
        dispatch({
          type: SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_SUCCESS,
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
            type: SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error('Technical Issue', {duration : 4000});
      dispatch({
        type: SAVE_PROFESSIONAL_ACCOUNT_SETTINGS_FAILED,
        payload: error,
      });
      // useRedirectInvalidToken();
    });
};

export const changeProfessionalPassword = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  dispatch({
    type: CHANGE_PROFESSIONAL_PASSWORD,
    payload: null,
  });
  http
    .post("user/change-password", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_PASSWORD_CHANGED);
        dispatch({
          type: CHANGE_PROFESSIONAL_PASSWORD_SUCCESS,
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
            type: CHANGE_PROFESSIONAL_PASSWORD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: CHANGE_PROFESSIONAL_PASSWORD_FAILED,
        payload: error,
      });
      toast.error('Technical Issue', {duration : 4000});
      // useRedirectInvalidToken();
    });
};

