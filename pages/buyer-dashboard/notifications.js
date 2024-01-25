import React, { useEffect, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";
import { fetchBuyerNotifications } from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/components/text";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Notifications() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);

  const { site_settings, page_title, notifications } = data;

  useEffect(() => {
    dispatch(fetchBuyerNotifications());
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
                <BuyerSidebar data={"notifications"} />
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h2>Notifications</h2>
                </div>

                {isLoading && (
                  <>
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
                  <div className="notification_blk custom_blk">
                    {notifications !== null ? (
                      notifications?.map((notifs, i) => {
                        return (
                          <div className="list_inner_notify" key={i}>
                            <div className="user_info">
                              <div className="dp_icon">
                                {notifs?.sender_pic !== null ? (
                                  <img
                                    src={cmsFileUrl(
                                      notifs?.sender_pic,
                                      "members"
                                    )}
                                    alt=""
                                  />
                                ) : (
                                  <img src="/images/no-user.svg" alt="" />
                                )}
                              </div>
                              <div className="cntnt">
                                <p>
                                  <Link href="">{notifs?.txt}</Link>
                                </p>
                                <div className="time_out">
                                  {formatDateTime(notifs?.created_at)}
                                </div>
                              </div>
                            </div>
                            <button className="x_btn" type="button"></button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="alert alert-danger">No Notifications</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Notifications.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
