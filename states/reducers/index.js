import { combineReducers } from "redux";
import siteSettings from "./siteSettings";
import contactUs from "./contactUs";
import newsletter from "./newsletter";


export default combineReducers({
 siteSettings,
 contactUs,
 newsletter,
 
});
