import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import Text from "@/components/components/text";
import { SUCCESSFUL_SIGNIN_MESSAGE } from "@/components/constants/messages";
import {
  SIGN_IN_MESSAGE,
  SIGN_IN_MESSAGE_SUCCESS,
  SIGN_IN_MESSAGE_FAILED,
} from "./actionTypes";

export const signin = (formData, redirectTo) => (dispatch) => {
  dispatch({
    type: SIGN_IN_MESSAGE,
    payload: null,
  });
  http
    .post("auth/signin", doObjToFormData(formData))
    .then(({ data }) => {
      if (data.status) {
        
        toast.success(SUCCESSFUL_SIGNIN_MESSAGE, { duration: 6000 });
        dispatch({
          type: SIGN_IN_MESSAGE_SUCCESS,
          payload: data,
        });
        setTimeout(() => {
            if(data.mem_type == 'member'){
              if (redirectTo) window.location.replace(redirectTo);
              else window.location.replace(`/buyer-dashboard`);
            }else if(data.mem_type == 'professional' && (data.profession_profile == '1' || data.profession_profile || data.profession_profile == true || data.profession_profile == 'true')){
              if (redirectTo) window.location.replace(redirectTo);
              else window.location.replace(`/professional-dashboard`);
            }else if(data.mem_type == 'professional' && (data.profession_profile !== '1' || !data.profession_profile || data.profession_profile !== true || data.profession_profile !== 'true')){
              if (redirectTo) window.location.replace(redirectTo);
              else window.location.replace(`/trade-person-signup`);
            }
          localStorage.removeItem("redirect_url");
        }, 2000);
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: SIGN_IN_MESSAGE_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: SIGN_IN_MESSAGE_FAILED,
        payload: error,
      });
    });
};
