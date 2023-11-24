import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
    PROFESSIONAL_PROFILE_CREATED_MESSAGE
} from "@/components/constants/messages";

import { CREATE_PROFESSIONAL_PROFILE,
    CREATE_PROFESSIONAL_PROFILE_SUCCESS,
    CREATE_PROFESSIONAL_PROFILE_FAILED } from "../actionTypes";


import { authToken } from "@/components/helpers/authToken";

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

