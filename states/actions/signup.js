import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
import {
  SUCCESSFUL_SIGNUP_MESSAGE,
  SUCCESSFUL_EMAIL_VERIFICATION,
} from "@/components/constants/messages";

import {
  CREATE_ACCOUNT_MESSAGE,
  CREATE_ACCOUNT_MESSAGE_SUCCESS,
  CREATE_ACCOUNT_MESSAGE_FAILED,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
  BACK_TO_SIGNUP,
} from "./actionTypes";

export const createAccount = (formData) => (dispatch) => {
  formData = doObjToFormData(formData);
  dispatch({
    type: CREATE_ACCOUNT_MESSAGE,
    payload: null,
  });
  http
    .post("auth/create-account", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_SIGNUP_MESSAGE, { duration: 6000 });
        dispatch({
          type: CREATE_ACCOUNT_MESSAGE_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/email-verification");
        }, 2000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: CREATE_ACCOUNT_MESSAGE_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error('Technical Problem Occured Please Try Again or contatct Admin', { duration: 2000 })
      dispatch({
        type: CREATE_ACCOUNT_MESSAGE_FAILED,
        payload: error,
      });
      // setTimeout(() => {
      //     window.location.replace("/email-verification");
      //   }, 3000);
    });
};

export const backToSignup = () => (dispatch) => {
  
  dispatch({
    type: BACK_TO_SIGNUP,
    payload: null,
  });
};

export const verifyEmail = (formData) => (dispatch) => {
  formData = doObjToFormData(formData);
  dispatch({
    type: VERIFY_EMAIL,
    payload: null,
  });
  http
    .post("auth/verify-email", formData)
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_EMAIL_VERIFICATION, { duration: 6000 });
        dispatch({
          type: VERIFY_EMAIL_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          if(data.mem_type == 'member'){
            window.location.replace(`/buyer-dashboard`);

          }else{
            window.location.replace('/professional-dashboard');
          }
        }, 2000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: VERIFY_EMAIL_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: VERIFY_EMAIL_FAILED,
        payload: error,
      });
    });
};
