import React, { useRef, useEffect } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import ServicesFaq from "@/components/components/serviceFaq";
import { fetchServicesData } from "@/components/states/actions/professional/services";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { isArrayEmpty, isEmpty } from "@/components/helpers/helpers";

export default function Services() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.services.content);
    const member = useSelector((state) => state.services.mem);
    const isLoading = useSelector((state) => state.services.isLoading);
    console.log(data);

    const { page_title, mem_Services } = data;

    

    useEffect(() => {
        dispatch(fetchServicesData());
    }, []);
    
  return (
    <>
    <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <ProfessionalSidebar data={"services"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading service_sec_heading">
                            <h2>Services Offered</h2>
                            {(member?.mem_professionl_profile !== "1" || member?.mem_professionl_profile !== 1) && isEmpty(Object(mem_Services)) && 
                            <div className="btn_blk">
                                <Link href="add-service" className="site_btn color">Add More</Link>
                            </div>
                            }
                        </div>
                        <div className="profile_blk custom_blk">
                        {!isEmpty(Object(mem_Services)) ? 
                            <ServicesFaq data={mem_Services}/>
                          : 
                          <div className="alert alert-danger">You havn't added any service</div>  
                        }
                        </div>
                    </div>
                </div>
            </div>
         </section>
      </main>
      
    </>
  );
}
Services.getLayout = function(page) {
    return <LayoutDashboard>{page}</LayoutDashboard>;
};
