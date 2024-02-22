import { combineReducers } from "redux";
import siteSettings from "./siteSettings";
import contactUs from "./contactUs";
import newsletter from "./newsletter";
import signup from "./signup";
import signin from "./signin";
import forgetPassword from "./forgetPassword";
import account from "./buyer/account";
import proProfile from "./professional/proProfile";
import services from "./professional/services";
import saveSearch from "./saveSearch";
import phoneVerification from "./professional/phoneVerification";
import subscriptions from "./professional/subscriptions";
import bookings from "./buyer/bookings";
import reviews from "./buyer/reviews";
import chat from "./chat";
import maintenanceCover from "./buyer/maintenanceCover";

export default combineReducers({
 siteSettings,
 contactUs,
 newsletter,
 signup,
 signin,
 forgetPassword,
 account,
 proProfile,
 services,
 saveSearch,
 phoneVerification,
 subscriptions,
 bookings,
 reviews,
 chat,
 maintenanceCover
 
 
 
 
});
