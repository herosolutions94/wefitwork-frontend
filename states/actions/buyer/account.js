import http from "@/components/helpers/http";
import httpBlob from "@/components/helpers/http-blob";
import { doObjToFormData } from "@/components/helpers/helpers";
import { toast } from "react-hot-toast";
import {
  SUCCESSFUL_ACCOUNT_SETTINGS_CHANGED,
  SUCCESSFUL_PASSWORD_CHANGED,
} from "@/components/constants/messages";
import {
  FETCH_BUYER_DASHBOARD_DATA,
  FETCH_BUYER_DASHBOARD_DATA_SUCCESS,
  FETCH_BUYER_DASHBOARD_DATA_FAILED,
//   FETCH_ACCOUNT_SETTINGS,
//   FETCH_ACCOUNT_SETTINGS_SUCCESS,
//   FETCH_ACCOUNT_SETTINGS_FAILED,
//   SAVE_ACCOUNT_SETTINGS,
//   SAVE_ACCOUNT_SETTINGS_SUCCESS,
//   SAVE_ACCOUNT_SETTINGS_FAILED,
//   CHANGE_PASSWORD,
//   CHANGE_PASSWORD_SUCCESS,
//   CHANGE_PASSWORD_FAILED,
} from "../actionTypes";
import Text from "@/components/components/text";
import { authToken } from "@/components/helpers/authToken";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";

export const fetchDashboardData = () => (dispatch) => {
  dispatch({
    type: FETCH_BUYER_DASHBOARD_DATA,
    payload: null,
  });
  http
    .post("user/dashboard", doObjToFormData({ token: authToken() }))
    .then(({ data }) => {
      dispatch({
        type: FETCH_BUYER_DASHBOARD_DATA_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_BUYER_DASHBOARD_DATA_FAILED,
        payload: error,
      });
      useRedirectInvalidToken();
    });
};

// export const fetchAccountSettings = () => (dispatch) => {
//   dispatch({
//     type: FETCH_ACCOUNT_SETTINGS,
//     payload: null,
//   });
//   http
//     .post("user/profile-settings", doObjToFormData({ token: authToken() }))
//     .then(({ data }) => {
//       dispatch({
//         type: FETCH_ACCOUNT_SETTINGS_SUCCESS,
//         payload: data,
//       });
//     })
//     .catch((error) => {
//       dispatch({
//         type: FETCH_ACCOUNT_SETTINGS_FAILED,
//         payload: error,
//       });
//       useRedirectInvalidToken();
//     });
// };

// export const saveAccountSettings = (formData) => (dispatch) => {
//   formData = { ...formData, token: authToken() };
//   let file = formData.profile;
//   delete formData.profile;
//   formData = doObjToFormData(formData);
//   if (typeof file != "undefined") formData.append("profile", file[0]);
//   // console.log(formData);

//   dispatch({
//     type: SAVE_ACCOUNT_SETTINGS,
//     payload: null,
//   });
//   httpBlob
//     .post("user/save-profile-settings", formData)
//     .then(({ data }) => {
//       if (data.status) {
//         toast.success(SUCCESSFUL_ACCOUNT_SETTINGS_CHANGED, { duration: 6000 });
//         dispatch({
//           type: SAVE_ACCOUNT_SETTINGS_SUCCESS,
//           payload: data,
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       } else {
//         if (data.validationErrors) {
//           toast.error(<Text string={data.validationErrors} parse={true} />, {
//             duration: 6000,
//           });
//           dispatch({
//             type: SAVE_ACCOUNT_SETTINGS_FAILED,
//             payload: null,
//           });
//         }
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: SAVE_ACCOUNT_SETTINGS_FAILED,
//         payload: error,
//       });
//       useRedirectInvalidToken();
//     });
// };

// export const changePassword = (formData) => (dispatch) => {
//   formData = { ...formData, token: authToken() };
//   dispatch({
//     type: CHANGE_PASSWORD,
//     payload: null,
//   });
//   http
//     .post("user/change-password", doObjToFormData(formData))
//     .then(({ data }) => {
//       if (data.status) {
//         toast.success(SUCCESSFUL_PASSWORD_CHANGED);
//         dispatch({
//           type: CHANGE_PASSWORD_SUCCESS,
//           payload: data,
//         });
//       } else {
//         if (data.validationErrors) {
//           toast.error(<Text string={data.validationErrors} parse={true} />, {
//             duration: 6000,
//           });
//           dispatch({
//             type: CHANGE_PASSWORD_FAILED,
//             payload: null,
//           });
//         }
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: CHANGE_PASSWORD_FAILED,
//         payload: error,
//       });
//       useRedirectInvalidToken();
//     });
// };
