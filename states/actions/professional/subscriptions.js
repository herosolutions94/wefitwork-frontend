import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
  FETCH_MEM_SUBSCRIPTIONS,
  FETCH_MEM_SUBSCRIPTIONS_SUCCESS,
  FETCH_MEM_SUBSCRIPTIONS_FAILED,
  
} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";

export const fetchMemSubscriptions = () => (dispatch) => {
  dispatch({
    type: FETCH_MEM_SUBSCRIPTIONS,
    payload: null,
  });
  http
    .post("user/get-pro-mem-subscriptions", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_MEM_SUBSCRIPTIONS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_MEM_SUBSCRIPTIONS_FAILED,
        payload: error,
      });

      toast.error("Technical Issue", { duration: 4000 });

      useRedirectInvalidToken();
    });
};

