import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedBuyerHeader from "./logged-buyer-header";
import { Provider } from "react-redux";
import store from "../states/store";
import { useState, useEffect } from "react";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import { doObjToFormData } from "../helpers/helpers";
import toast from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";


export default function LayoutBuyerDashboard({ children }) {
  const router = useRouter();
  const path = router.pathname;
  const segments = path?.split('/');
  const lastSegment = segments[segments.length - 1];

  const [memberRow, setMemberRow] = useState(null);

  useEffect(() => {
    // Define an asynchronous function to make the API request
    const fetchData = async () => {
      try {
        // Make the API request using Axios
          const params = { token: authToken() };
          const result = await http
            .post("user/buyer-dashboard", doObjToFormData(params))
            .then((response) => response.data)
            .catch((error) => error.response.data.message);
          setMemberRow(result?.member)
        

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  // console.log(memberRow)
  useEffect(() => {
    if (memberRow?.mem_verified !== undefined && memberRow?.mem_verified !== null && memberRow?.mem_verified !== 1 && memberRow?.mem_verified !== "1" && lastSegment !== 'email-verification') {
        localStorage.setItem('email', memberRow?.mem_email);
        router.push('/email-verification');
    }
    // console.log('hi');
    
  }, [memberRow]);


  return (
    <Provider store={store}>
      <div className="content">
        <SiteMaster />
    <NextNProgress color="#004AAD" />

        <LoggedBuyerHeader />
        {children}
      </div>
    </Provider>
  );
}
