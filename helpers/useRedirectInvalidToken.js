// import { removeCookies } from "cookies-next";
import { deleteCookie } from "cookies-next";
const useRedirectInvalidToken = () => {
  // removeCookies("authToken");
  deleteCookie("authToken")
  window.location.reload();

   // setTimeout(() => {
        //   window.location.replace("/dashboard");
        // }, 3000);

};

export default useRedirectInvalidToken;

