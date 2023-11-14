import { combineReducers } from "redux";
import siteSettings from "./siteSettings";
import contactUs from "./contactUs";
import newsletter from "./newsletter";
import signup from "./signup";
import signin from "./signin";
import forgetPassword from "./forgetPassword";


export default combineReducers({
 siteSettings,
 contactUs,
 newsletter,
 signup,
 signin,
 forgetPassword,
 
 
 
 
});
