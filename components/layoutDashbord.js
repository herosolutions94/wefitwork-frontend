import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedHeader from "./logged-header";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import { useEffect, useState } from "react";
import { doObjToFormData } from "../helpers/helpers";


export default function LayoutDashboard({children}) {
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
            .post("user/professional-dashboard", doObjToFormData(params))
            .then((response) => response.data)
            .catch((error) => error.response.data.message);
          setMemberRow(result?.member)
        

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log('sad',memberRow)
  useEffect(() => {
    if (memberRow?.mem_verified !== undefined && memberRow?.mem_verified !== null && memberRow?.mem_verified !== 1 && lastSegment !== 'email-verification') {
        localStorage.setItem('email', memberRow?.mem_email);
        router.push('/email-verification');
    }

    if (memberRow?.mem_type == 'member') {
      router.push('/buyer-dashboard');
    }
    if(memberRow?.mem_type == 'professional' && (memberRow?.mem_professionl_profile == 0)){
      router.push('/trade-person-signup');
    }
    // console.log('hi');
    
  }, []);
    return (
      <div className="content">
        <SiteMaster />
        <LoggedHeader />
            {children}
      </div>
    );
  }