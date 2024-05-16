import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
import {
  SUCCESSFUL_SIGNUP_MESSAGE,
  SUCCESSFUL_EMAIL_VERIFICATION,
  SUCCESSFUL_SIGNUP_PHONE_MESSAGE,
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
import { setCookie } from "cookies-next";

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
        // toast.success(SUCCESSFUL_SIGNUP_MESSAGE, { duration: 6000 });
        dispatch({
          type: CREATE_ACCOUNT_MESSAGE_SUCCESS,
          payload: data,
        });


        if(data.contact_type == "phone"){
          toast.success(SUCCESSFUL_SIGNUP_PHONE_MESSAGE, { duration: 6000 });
          if(data.mem_type == "professional"){
            setTimeout(() => {
              setCookie('mem_type', data.mem_type);
              setCookie('contact_type', data.contact_type);
              setCookie('authToken', data.authToken);

                                 window.location.replace('/trade-person-signup');
            }, 2000);
          }else{
            setTimeout(() => {
              setCookie('mem_type', data.mem_type);
              setCookie('contact_type', data.contact_type);
              setCookie('authToken', data.authToken);
              window.location.replace(`/buyer-dashboard`);
            }, 2000);

          }
        }else{
          toast.success(SUCCESSFUL_SIGNUP_MESSAGE, { duration: 6000 });
          setTimeout(() => {
            setCookie('mem_type', data.mem_type);
            setCookie('contact_type', data.contact_type);
            
                window.location.replace("/email-verification");
  
  
          }, 2000);

        }
        
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
          setCookie('mem_type', data.mem_type);
          setCookie('mem_professionl_profile', data.mem_professionl_profile);

          if(data.mem_type == 'member'){
            window.location.replace(`/buyer-dashboard`);

          }else if(data.mem_type == 'professional' && (data.mem_professionl_profile == "0" || data.mem_professionl_profile == 0) ){
            window.location.replace('/trade-person-signup');
          }else if(data.mem_type == 'professional' && (data.mem_professionl_profile == "1" || data.mem_professionl_profile == 1)){
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
