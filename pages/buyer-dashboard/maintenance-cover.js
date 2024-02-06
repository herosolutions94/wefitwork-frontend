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

export default function MaintenanceCover() {
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
        <section className="dashboard main_tenance_dash">
            <div className="contain">
              <div className="sec_heading flex">
                <h2>Maintenance Requests</h2>
                <div className="btn_blk">
                    <Link href="/buyer-dashboard/add-request" className="site_btn color">Add New</Link>
                </div>
              </div>
                <div className="contract_list custom_blk">
                    <div className="col">
                    <div className="inner">
                        <p>
                        <small>Service</small>
                        </p>
                        <p>
                        <strong>
                            Plumber Package
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="inner">
                        <p>
                        <small>Date</small>
                        </p>
                        <p>
                        <strong>
                            20 Sep, 2023
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col col_l">
                    <div className="inner">
                        <p>
                        <small>Address</small>
                        </p>
                        <p>
                        <strong>
                        HeroSolutions
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col col_s">
                    <div className="inner">
                        <span className="badge green">Completed</span>
                    </div>
                    </div>
                    <div className="col col_s">
                    <div className="inner action_lnks_maintenance">
                        <Link
                        href="/buyer-dashboard/maintenance-details"
                        >
                        View
                        </Link>
                        <Link
                        href="" className="red"
                        >
                        Delete
                        </Link>
                    </div>
                    </div>
                </div>
                <div className="contract_list custom_blk">
                    <div className="col">
                    <div className="inner">
                        <p>
                        <small>Service</small>
                        </p>
                        <p>
                        <strong>
                            Plumber Package
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="inner">
                        <p>
                        <small>Date</small>
                        </p>
                        <p>
                        <strong>
                            20 Sep, 2023
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col col_l">
                    <div className="inner">
                        <p>
                        <small>Address</small>
                        </p>
                        <p>
                        <strong>
                        HeroSolutions
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col col_s">
                    <div className="inner">
                        <span className="badge green">Completed</span>
                    </div>
                    </div>
                    <div className="col col_s">
                    <div className="inner action_lnks_maintenance">
                        <Link
                        href="/buyer-dashboard/maintenance-details"
                        >
                        View
                        </Link>
                        <Link
                        href="" className="red"
                        >
                        Delete
                        </Link>
                    </div>
                    </div>
                </div>
                <div className="contract_list custom_blk">
                    <div className="col">
                    <div className="inner">
                        <p>
                        <small>Service</small>
                        </p>
                        <p>
                        <strong>
                            Plumber Package
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col">
                    <div className="inner">
                        <p>
                        <small>Date</small>
                        </p>
                        <p>
                        <strong>
                            20 Sep, 2023
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col col_l">
                    <div className="inner">
                        <p>
                        <small>Address</small>
                        </p>
                        <p>
                        <strong>
                        HeroSolutions
                        </strong>
                        </p>
                    </div>
                    </div>
                    <div className="col col_s">
                    <div className="inner">
                        <span className="badge green">Completed</span>
                    </div>
                    </div>
                    <div className="col col_s">
                    <div className="inner action_lnks_maintenance">
                        <Link
                        href="/buyer-dashboard/maintenance-details"
                        >
                        View
                        </Link>
                        <Link
                        href="" className="red"
                        >
                        Delete
                        </Link>
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
MaintenanceCover.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
