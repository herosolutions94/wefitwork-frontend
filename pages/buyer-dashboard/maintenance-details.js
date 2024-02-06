import React, { useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import NextNProgress from "nextjs-progressbar";
import { fetchBuyerDashboardData } from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Text from "@/components/components/text";
import { Toaster } from "react-hot-toast";
import { cmsFileUrl, isEmpty } from "@/components/helpers/helpers";
import Image from "next/image";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";

export default function MaintenanceDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);
  const sent_sms = useSelector((state) => state.account.sent_sms);
  // console.log("dashboard",data);
  const {
    site_settings,
    page_title,
    wishlist_count,
    contract_converged_count,
    message_count,
  } = data;

  useEffect(() => {
    dispatch(fetchBuyerDashboardData());
  }, []);

  return (
    <>
      {/* <NextNProgress color="#004AAD" /> */}
      <main>
        <Toaster position="top-center" />
        
        {isLoading && (
          <>
          <Head>
          <title>{"fetching..."}</title>
        </Head>
            <div className="br"></div>
            <div className="text-center">
              <div
                className="spinner-border text-danger"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
        {!isLoading && (
          <>
          <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
        <section className="dashboard professional_details">
            <div className="contain">
                <div className="professiona_view_tile">
                    <div className="col custom_blk">
                    <h3 className="color">Electrical Installation and Wiring</h3>
                    <div className="mini_br"></div>
                    <div className="address_booking">
                        <img src="/images/MapPin.svg" alt="" />
                        <span>
                        Hero Solutions NS Town WGHt Streat
                        </span>
                    </div>
                    <div className="br"></div>
                    <div className="main_ul_new">
                        <p><span className="dim_text_main">Category :</span> <strong>Electrician Service</strong></p>
                        <p><span className="dim_text_main">Sub Category :</span> <strong>Safety Inspections</strong></p>
                        <p><span className="dim_text_main">Date :</span> <strong>20 Sep, 2023</strong></p>
                        <p><span className="dim_text_main">Status :</span> <strong className="badge green">Completed</strong></p>
                    </div>
                    <div className="br"></div>
                    <h4 className="color">Work Scope</h4>
                    <p>Installation of electrical systems for new constructions or renovations. Wiring for lighting, outlets, switches, and appliances. Troubleshooting and fixing electrical issues, such as faulty wiring or malfunctioning outlets. Repairing or replacing electrical components like circuit breakers. Conducting electrical safety inspections to identify potential hazards. Recommending and implementing safety measures to meet code requirements.</p>
                    </div>
                    <div className="col custom_blk">
                    <h3 className="color">Images</h3>
                    <div className="mini_br"></div>
                        <div className="profile_grid_maintenance scrollbar">
                            <div className="flex">
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/989.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/portfolio1.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/portfolio2.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/portfolio3.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/portfolio4.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/989.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/portfolio1.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img
                                        src="/images/portfolio2.png"
                                        alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>
          </>
          
        )}
      </main>
    </>
  );
}
MaintenanceDetails.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
