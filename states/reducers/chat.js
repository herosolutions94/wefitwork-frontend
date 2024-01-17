import { FETCH_CONVERSATIONS,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILED,
    START_CONVERSATION,
    START_CONVERSATION_SUCCESS,
    START_CONVERSATION_FAILED, } from "../actions/actionTypes";
  
  const initialState = {
    isLoading: true,
    isFormProcessing: false,
    content: {},
    mem: {},
    convo_data: {},

    error: false,
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {

        case START_CONVERSATION:
        return {
          ...state,
          isFormProcessing: true,
        };
      case START_CONVERSATION_SUCCESS:
        return {
          ...state,
          isFormProcessing: false,
        };
      case START_CONVERSATION_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };

      case FETCH_CONVERSATIONS:
        return {
          ...state,
          isLoading: true,
          mem: {},
        };
      case FETCH_CONVERSATIONS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          content: payload,
          mem: payload.member,
          convo_data: payload.convo_data,
          
        };
      case FETCH_CONVERSATIONS_FAILED:
        return {
          ...state,
          isLoading: false,
          mem: {},
          error: payload,

        };
  
      
      default:
        return state;
    }
  }
  