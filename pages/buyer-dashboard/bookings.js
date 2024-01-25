import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";
import { fetchBuyerBookingsData } from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import Text from "@/components/components/text";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { cmsFileUrl, isEmpty } from "@/components/helpers/helpers";

export default function Bookings() {
  const router = useRouter();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);
  const sent_sms = useSelector((state) => state.account.sent_sms);
  // console.log("dashboard",data);
  const { site_settings, page_title } = data;
  useEffect(() => {
    dispatch(fetchBuyerBookingsData());
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
                <BuyerSidebar data={"bookings"} />
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h2>My Bookings</h2>
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
                {/* =====loop start============== */}
                {!isLoading && (
                  <>
                    {!isEmpty(sent_sms) &&
                      sent_sms?.map((sms, i) => {
                        return (
                          <div
                            className="contract_list custom_blk booking_page_list"
                            key={i}
                          >
                            <div className="col col_l">
                              <div className="user_info">
                                <div className="dp_icon">
                                  <Image
                                    src={cmsFileUrl(sms?.to_mem_dp, "members")}
                                    width={60}
                                    height={60}
                                    alt={"dp"}
                                  />
                                </div>
                                <div className="cntnt">
                                  <h5>
                                    <Text string={sms?.to_mem_name} />
                                  </h5>
                                </div>
                              </div>
                            </div>
                            <div className="col">
                              <div className="inner">
                                <p>
                                  <small>Date</small>
                                </p>
                                <p>
                                  <strong>
                                    <Text string={sms?.date} />
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="col col_l">
                              <div className="inner">
                                <p>
                                  <small>Service</small>
                                </p>
                                <p>
                                  <strong>
                                    <Text string={sms?.service} />
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="col col_s">
                              <div className="inner text-right">
                                <Link
                                  href={`/buyer-dashboard/booking-details/${sms?.id}`}
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                )}

                {/* =============end loop====== */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Bookings.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
