import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
import { TOAST_SETTINGS } from "@/components/config/settings";
import { authToken } from "@/components/helpers/authToken";

import {
    SAVE_SEARCH_DATA,
    SAVE_SEARCH_DATA_SUCCESS,
    SAVE_SEARCH_DATA_FAILED,
} from "./actionTypes";

export const saveSearch = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  let file = formData.doc_file;
  delete formData.doc_file;
  formData = doObjToFormData(formData);
  if (typeof file != "undefined") formData.append("doc_file", file[0]);
  console.log(formData);

  dispatch({
    type: SAVE_SEARCH_DATA,
    payload: null,
  });
  http
    .post("save-search", formData)
    .then(({ data }) => {
      if (data.validationErrors) {
        toast.error(<Text string={data.validationErrors} parse={true} />, {
          duration: 6000,
        });
      } else {
        if(data.status){
          console.log(data);
          toast.success("Successfully.", { duration: 6000 });
          window.location.replace(`/search-result?service_id=${data?.search_data?.service_id}&latitude=${data?.search_data?.latitude}&longitude=${data?.search_data?.longitude}`)
        }
        
      }
      dispatch({
        type: SAVE_SEARCH_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SAVE_SEARCH_DATA_FAILED,
        payload: error,
      });
    });
};
