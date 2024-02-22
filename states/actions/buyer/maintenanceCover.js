import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
import {
  SAVE_MAINTENANCE_COVER_PAYMENT,
  SAVE_MAINTENANCE_COVER_PAYMENT_SUCCESS,
  SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
  FETCH_BUYER_MAINTENANCE_REQUESTS,
  FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS,
  FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED,
} from "../actionTypes";
import { authToken } from "@/components/helpers/authToken";
import { setCookie } from "cookies-next";

export const saveMaintenanceCoverPayment = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  dispatch({
    type: SAVE_MAINTENANCE_COVER_PAYMENT,
    payload: null,
  });
  http
    .post("user/save-maintenance-cover-payment", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        toast.success("Maintenance Cover Purchased Successfully", {
          duration: 6000,
        });
        dispatch({
          type: SAVE_MAINTENANCE_COVER_PAYMENT_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
          window.location.replace("/buyer-dashboard/maintenance-cover");
        }, 2000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      toast.error(
        "Technical Problem Occured Please Try Again or contatct Admin",
        { duration: 2000 }
      );
      dispatch({
        type: SAVE_MAINTENANCE_COVER_PAYMENT_FAILED,
        payload: error,
      });
    });
};

export const fetchBuyerMaintenanceRequests = () => (dispatch) => {
  dispatch({
    type: FETCH_BUYER_MAINTENANCE_REQUESTS,
    payload: null,
  });
  http
    .post("user/buyer-maintenance-requests", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      // console.log(data);
      dispatch({
        type: FETCH_BUYER_MAINTENANCE_REQUESTS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);

      dispatch({
        type: FETCH_BUYER_MAINTENANCE_REQUESTS_FAILED,
        payload: error,
      });

      toast.error("Technical Issue", { duration: 4000 });

      useRedirectInvalidToken();
    });
};
