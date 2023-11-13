import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";

import {
  SAVE_NEWSLETTER,
  SAVE_NEWSLETTER_SUCCESS,
  SAVE_NEWSLETTER_FAILED,
} from "./actionTypes";

export const saveNewsletter = (formData) => (dispatch) => {
  dispatch({
    type: SAVE_NEWSLETTER,
    payload: null,
  });
  http
    .post("save-newsletter", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.validationErrors) {
        toast.error(<Text string={data.validationErrors} parse={true} />, {
          duration: 6000,
        });
      } else {
        toast.success("Subscribed successfully.", { duration: 6000 });
      }
      dispatch({
        type: SAVE_NEWSLETTER_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SAVE_NEWSLETTER_FAILED,
        payload: error,
      });
    });
};
