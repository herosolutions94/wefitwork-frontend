import SiteMaster from "./sitemaster";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
export default function Layout({ children }) {
  const router = useRouter();
  const path = router.pathname;
  if ((path == "/signup") || (path == "/login") || (path == "/forgot-password") || (path == "/reset-password") || (path == "/trade-person-signup")) {
    return (
      <div className="content">
        <SiteMaster />
        {children}
      </div>
    );
  }else{
    return (
      <div className="content">
        <SiteMaster />
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}
