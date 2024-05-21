import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

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
  
} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";


export const fetchServicesData = () => (dispatch) => {
  dispatch({
    type: FETCH_SERVICES_DATA,
    payload: null,
  });
  http
    .post("user/get-mem-services-data", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_SERVICES_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_SERVICES_DATA_FAILED,
        payload: error,
      });

      toast.error("Technical Issue", { duration: 4000 });

      useRedirectInvalidToken();
    });
};
export const updateSubServices = (frmData) => (dispatch) => {
  dispatch({
    type: UPDATE_SERVICES_DATA,
    payload: null,
  });
  http
    .post(
      "user/update-sub-services",
      doObjToFormData({ ...frmData, token: authToken() })
    )
    .then(({ data }) => {
      // console.log(data);
      if (data?.status === 1) {
        window.location.reload();
      } else {
        toast.error(<Text string={data.msg} parse={true} />, {
          duration: 6000,
        });
      }
      dispatch({
        type: UPDATE_SERVICES_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: UPDATE_SERVICES_DATA_FAILED,
        payload: error,
      });

      toast.error("Technical Issue", { duration: 4000 });

      useRedirectInvalidToken();
    });
};

export const saveBusinessData = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  let images = formData.portfolio_images;
  delete formData.portfolio_images;

  formData = doObjToFormData(formData);

  if (typeof images != "undefined" && Array.isArray(images)) {
    images.forEach((file) => {
      formData.append("portfolioImages[]", file);
    });
  }

  dispatch({
    type: SAVE_BUSINESS_DATA,
    payload: null,
  });
  httpBlob
    .post("user/save-business-data", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success("Business Information Saved Successfully", { duration: 6000 });
        dispatch({
          type: SAVE_BUSINESS_DATA_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace('/professional-dashboard');
        }, 1000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: SAVE_BUSINESS_DATA_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Technical Issue", { duration: 4000 });
      dispatch({
        type: SAVE_BUSINESS_DATA_FAILED,
        payload: error,
      });
      // useRedirectInvalidToken();
    });
};
