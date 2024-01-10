import React, { useState, useEffect } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import { fetchProfessioanlNotifications } from "@/components/states/actions/professional/proProfile";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { cmsFileUrl, formatDate, formatDateTime } from "@/components/helpers/helpers";
import { DrawingManager } from "@react-google-maps/api";

export default function Notifications() {
    const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.proProfile.content);
  const member = useSelector((state) => state.proProfile.mem);
  const isLoading = useSelector((state) => state.proProfile.isLoading);
  const pro_profile = useSelector((state) => state.proProfile.pro_profile);
  

  console.log(data);
  const { site_settings, page_title, notifications, notifications_count } = data;

  useEffect(() => {
    dispatch(fetchProfessioanlNotifications());
  }, []);
  
  return (
    <>
    <Toaster position="top-center" />
      <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <ProfessionalSidebar data={"notifications"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>Notifications</h2>
                        </div>
                        <div className="notification_blk custom_blk">
                        {notifications !== null ? notifications?.map((notifs, i ) => {
                            return (
                                <div className="list_inner_notify" key={i}>
                                <div className="user_info">
                                    <div className="dp_icon">
                                    {notifs?.sender_pic !== null ? 
                                        <img src={cmsFileUrl(notifs?.sender_pic, "members")} alt=""/>
                                        :
                                        <img src="/images/no-user.svg" alt=""/>
                                    }
                                        
                                    </div>
                                    <div className="cntnt">
                                        <p><Link href="">{notifs?.txt}</Link></p>
                                        <div className="time_out">{formatDateTime(notifs?.created_at)}</div>
                                    </div>
                                </div>
                                <button className="x_btn" type="button"></button>
                            </div>
                            )
                        }): 
                        <div className="alert alert-danger">No Notifications</div>
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
Notifications.getLayout = function(page) {
    return <LayoutDashboard>{page}</LayoutDashboard>;
};
