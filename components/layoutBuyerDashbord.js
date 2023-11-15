import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedBuyerHeader from "./logged-buyer-header";
import { Provider } from "react-redux";
import store from "../states/store";

export default function LayoutBuyerDashboard({ children }) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <Provider store={store}>
      <div className="content">
        <SiteMaster />
        <LoggedBuyerHeader />
        {children}
      </div>
    </Provider>
  );
}
