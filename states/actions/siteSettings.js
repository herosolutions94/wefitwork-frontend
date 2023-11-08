import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import Text from "@/components/components/text";

import {
  FETCH_SITE_SETTINGS,
  FETCH_SITE_SETTINGS_SUCCESS,
  FETCH_SITE_SETTINGS_FAILED,
} from "./actionTypes";

export const fetchSiteSettings = () => (dispatch) => {
  dispatch({
    type: FETCH_SITE_SETTINGS,
    payload: null,
  });
  http
    .post(
      "site-settings",
      doObjToFormData({ token: localStorage.getItem("authToken") })
    )
    .then(({ data }) => {
      dispatch({
        type: FETCH_SITE_SETTINGS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_SITE_SETTINGS_FAILED,
        payload: error,
      });
    });
};
