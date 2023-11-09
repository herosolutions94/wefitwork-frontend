import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
import { TOAST_SETTINGS } from "@/components/config/settings";

import {
  SAVE_CONTACT_QUERY,
  SAVE_CONTACT_QUERY_SUCCESS,
  SAVE_CONTACT_QUERY_FAILED,
} from "./actionTypes";

export const saveContactQuery = (formData) => (dispatch) => {
  dispatch({
    type: SAVE_CONTACT_QUERY,
    payload: null,
  });
  http
    .post("save-contact-message", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.validationErrors) {
        toast.error(<Text string={data.validationErrors} parse={true} />, {
          duration: 6000,
        });
      } else {
        toast.success("Message sent successfully.", { duration: 6000 });
      }
      dispatch({
        type: SAVE_CONTACT_QUERY_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SAVE_CONTACT_QUERY_FAILED,
        payload: error,
      });
    });
};
