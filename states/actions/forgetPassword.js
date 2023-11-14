import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import { toast } from "react-hot-toast";
import Text from "@/components/components/text";
import {
  SUCCESSFUL_RESET_PASSWORD_LINK_MESSAGE,
  RESET_PASSWORD_EMAIL_NOT_EXIST,
  SUCCESSFUL_RESET_PASSWORD_MESSAGE,
  RESET_PASSWORD_LINK_EXPIRED_MESSAGE,
} from "@/components/constants/messages";
import { SIGNIN_PAGE } from "@/components/constants/link";

import {
  RESET_PASSWORD_LINK,
  RESET_PASSWORD_LINK_SUCCESS,
  RESET_PASSWORD_LINK_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "./actionTypes";

export const resetLinkRequest = (formData) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_LINK,
    payload: null,
  });
  http
    .post("auth/forgot_password", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_RESET_PASSWORD_LINK_MESSAGE, {
          duration: 6000,
        });
        dispatch({
          type: RESET_PASSWORD_LINK_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      } else {
        if (!data.status) {
          if (data.validationErrors) {
            toast.error(<Text string={data.validationErrors} parse={true} />, {
              duration: 6000,
            });
          } else if (data.notExist) {
            toast.error(RESET_PASSWORD_EMAIL_NOT_EXIST, { duration: 6000 });
          }
          dispatch({
            type: RESET_PASSWORD_LINK_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: RESET_PASSWORD_LINK_FAILED,
        payload: error,
      });
    });
};

export const resetPassword = (formData) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD,
    payload: null,
  });
  http
    .post("auth/reset_password", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success(SUCCESSFUL_RESET_PASSWORD_MESSAGE, { duration: 6000 });
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace(SIGNIN_PAGE);
        }, 2000);
      } else {
        if (!data.status) {
          if (data.validationErrors) {
            toast.error(<Text string={data.validationErrors} parse={true} />, {
              duration: 6000,
            });
          } else if (data.notExist) {
            toast.error(RESET_PASSWORD_LINK_EXPIRED_MESSAGE, {
              duration: 6000,
            });
          }
          dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: error,
      });
    });
};
