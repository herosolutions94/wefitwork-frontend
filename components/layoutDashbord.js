import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedHeader from "./logged-header";
export default function LayoutDashboard({children}) {
    const router = useRouter();
    const path = router.pathname;
    return (
      <div className="content">
        <SiteMaster />
        <LoggedHeader />
            {children}
      </div>
    );
  }