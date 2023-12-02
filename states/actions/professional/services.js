import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
  FETCH_SERVICES_DATA,
  FETCH_SERVICES_DATA_SUCCESS,
  FETCH_SERVICES_DATA_FAILED,
  UPDATE_SERVICES_DATA,
  UPDATE_SERVICES_DATA_SUCCESS,
  UPDATE_SERVICES_DATA_FAILED
} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";

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

      toast.error('Technical Issue', { duration: 4000 });

      useRedirectInvalidToken();
    });
};
export const updateSubServices = (frmData) => (dispatch) => {
  dispatch({
    type: UPDATE_SERVICES_DATA,
    payload: null,
  });
  http
    .post("user/update-sub-services", doObjToFormData({ ...frmData, token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      if (data?.status === 1) {
        window.location.reload()
      }
      else {
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

      toast.error('Technical Issue', { duration: 4000 });

      useRedirectInvalidToken();
    });
};





