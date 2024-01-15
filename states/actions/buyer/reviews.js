import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import { toast } from "react-hot-toast";
import {
    FETCH_REVIEW_PAGE_DATA,
    FETCH_REVIEW_PAGE_DATA_SUCCESS,
    FETCH_REVIEW_PAGE_DATA_FAILED,
    SAVE_REVIEW,
SAVE_REVIEW_SUCCESS,
SAVE_REVIEW_FAILED,
} from "../actionTypes";
import Text from "@/components/components/text";
import { authToken } from "@/components/helpers/authToken";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";


export const fetchReviewPageData = (pro_mem_id) => (dispatch) => {
    dispatch({
      type: FETCH_REVIEW_PAGE_DATA,
      payload: null,
    });
    http
      .post(`user/review-page-data/${pro_mem_id}`, doObjToFormData({ token: authToken() }))
      .then(({ data }) => {
        // console.log(data);
        dispatch({
          type: FETCH_REVIEW_PAGE_DATA_SUCCESS,
          payload: data,
        });
        
      })
      .catch((error) => {
        console.log(error);
        
        dispatch({
          type: FETCH_REVIEW_PAGE_DATA_FAILED,
          payload: error,
        });
        
          toast.error('Technical Issue', {duration : 4000});
  
        useRedirectInvalidToken();
      });
  };

  export const saveReview = (formData) => (dispatch) => {
    formData = { ...formData, token: authToken() };
    let pro_id = formData.pro_mem_id;
    let images = formData.proof_images;
    delete formData.proof_images;
  
    formData = doObjToFormData(formData);
  
    if (typeof images != "undefined" && Array.isArray(images)) {
      images.forEach((file) => {
        formData.append("proof_images[]", file);
      });
    }
  
    dispatch({
      type: SAVE_REVIEW,
      payload: null,
    });
    httpBlob
      .post("user/save-review", formData)
      .then(({ data }) => {
        if (data.status) {
          toast.success("Review Submitted Successfully", { duration: 6000 });
          dispatch({
            type: SAVE_REVIEW_SUCCESS,
            payload: data,
          });
          setTimeout(() => {
            window.location.replace(`/search-result/${encrypt_decrypt("encrypt", pro_id)}`)
        }, 3000)
        } else {
          if (data.validationErrors) {
            toast.error(<Text string={data.validationErrors} parse={true} />, {
              duration: 6000,
            });
            dispatch({
              type: SAVE_REVIEW_FAILED,
              payload: null,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Technical Issue", { duration: 4000 });
        dispatch({
          type: SAVE_REVIEW_FAILED,
          payload: error,
        });
        // useRedirectInvalidToken();
      });
  };
  

