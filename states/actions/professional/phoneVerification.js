import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
  REQUEST_VERIFY_PHONE,
  REQUEST_VERIFY_PHONE_SUCCESS,
  REQUEST_VERIFY_PHONE_FAILED,
} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";


export const requestPhoneVerify = (formData) => (dispatch) => {
  formData = {...formData, token: authToken()}
dispatch({
  type: REQUEST_VERIFY_PHONE,
  payload: null,
});
http
  .post("user/request-verify-phone", doObjToFormData(formData))
  .then(({ data }) => {
    if (data.status) {
      toast.success(PROFESSIONAL_PROFILE_CREATED_MESSAGE, { duration: 6000 });
      dispatch({
        type: REQUEST_VERIFY_PHONE_SUCCESS,
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
    // setTimeout(() => {
    //     window.location.replace("/email-verification");
    //   }, 3000);
  });
};
