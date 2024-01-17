import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import { FETCH_CONVERSATIONS,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILED,
    START_CONVERSATION,
    START_CONVERSATION_SUCCESS,
    START_CONVERSATION_FAILED, } from "./actionTypes";

import Text from "@/components/components/text";
import { authToken } from "@/components/helpers/authToken";
import useRedirectInvalidToken from "@/components/helpers/useRedirectInvalidToken";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";


export const startConversation = (formData) => (dispatch) => {
  formData = { ...formData, token: authToken() };
  dispatch({
    type: START_CONVERSATION,
    payload: null,
  });
  http
    .post("user/start-chat", doObjToFormData(formData))
    .then(({ data }) => {
        console.log(data)
      if (data.status) {

        toast.success('Redirecting... to Chat');
        dispatch({
          type: START_CONVERSATION_SUCCESS,
          payload: data,
        });

        setTimeout(() => {
            window.location.replace(`/buyer-dashboard/inbox?con=${data.convo_id}`)
        }, 1000)
      } else {
        if (data.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
          dispatch({
            type: START_CONVERSATION_FAILED,
            payload: null,
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: START_CONVERSATION_FAILED,
        payload: error,
      });
      toast.error('Technical Issue', {duration : 4000});
      // useRedirectInvalidToken();
    });
};

export const fetchConversationData = (formData) => (dispatch) => {
    formData = {...formData, token: authToken()}
    const convo_id = formData.convo_id
  dispatch({
    type: FETCH_CONVERSATIONS,
    payload: null,
  });
  http
    .post(`user/fetch-conversation-data/${convo_id}`, doObjToFormData(formData))
    .then(({ data }) => {
      console.log(data);
      dispatch({
        type: FETCH_CONVERSATIONS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      
      dispatch({
        type: FETCH_CONVERSATIONS_FAILED,
        payload: error,
      });
      
        toast.error('Technical Issue', {duration : 4000});

      useRedirectInvalidToken();
    });
};

