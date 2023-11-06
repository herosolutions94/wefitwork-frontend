import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedBuyerHeader from "./logged-buyer-header";
export default function LayoutBuyerDashboard({children}) {
    const router = useRouter();
    const path = router.pathname;
    return (
      <div className="content">
        <SiteMaster />
        <LoggedBuyerHeader />
            {children}
      </div>
    );
  }