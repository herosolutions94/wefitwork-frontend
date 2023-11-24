import { CREATE_PROFESSIONAL_PROFILE,
    CREATE_PROFESSIONAL_PROFILE_SUCCESS,
    CREATE_PROFESSIONAL_PROFILE_FAILED } from "../../actions/actionTypes";
  import { setCookie } from "cookies-next";
  
  const initialState = {
    isLoading: true,
    content: {},
    error: false,
    isFormProcessing: false,
    
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case CREATE_PROFESSIONAL_PROFILE:
        return {
          ...state,
          isFormProcessing: true,
        };
      case CREATE_PROFESSIONAL_PROFILE_SUCCESS:
        localStorage.setItem("email", payload.email);
        return {
          ...state,
          isFormProcessing: false,
        };
      case CREATE_PROFESSIONAL_PROFILE_FAILED:
        return {
          ...state,
          isFormProcessing: false,
          error: payload,
        };
      
      default:
        return state;
    }
  }
  