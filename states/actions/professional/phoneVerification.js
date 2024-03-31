import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
  REQUEST_VERIFY_PHONE,
  REQUEST_VERIFY_PHONE_SUCCESS,
  REQUEST_VERIFY_PHONE_FAILED,

  VERIFY_PHONE_NUMBER,
  VERIFY_PHONE_NUMBER_SUCCESS,
  VERIFY_PHONE_NUMBER_FAILED,
} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { deleteCookie, setCookie } from "cookies-next";


export const requestPhoneVerify = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() }
  dispatch({
    type: REQUEST_VERIFY_PHONE,
    payload: null,
  });
  http
    .post("user/request-verify-phone", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(data?.msg, { duration: 4000 });
        dispatch({
          type: REQUEST_VERIFY_PHONE_SUCCESS,
          payload: data,
        });
        setCookie("verify_phone", data.phoneNumber);
        if (data.already_verified) {
          setTimeout(() => {
            window.location.reload();
          }, 2000)
        }
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: REQUEST_VERIFY_PHONE_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error('Technical Problem Occured Please Try Again or contatct Admin', { duration: 2000 })
      dispatch({
        type: REQUEST_VERIFY_PHONE_FAILED,
        payload: error,
      });

    });
};

export const VerifyPhoneNumber = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() }
  dispatch({
    type: VERIFY_PHONE_NUMBER,
    payload: null,
  });
  http
    .post("user/verify-phone", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(data?.msg, { duration: 4000 });
        dispatch({
          type: VERIFY_PHONE_NUMBER_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          deleteCookie("verify_phone", data.phone);
          window.location.reload();
        }, 2000);

      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: VERIFY_PHONE_NUMBER_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error)
      toast.error('Technical Problem Occured Please Try Again or contatct Admin', { duration: 2000 })
      dispatch({
        type: VERIFY_PHONE_NUMBER_FAILED,
        payload: error,
      });

    });
};
