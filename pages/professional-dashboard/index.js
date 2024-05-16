import React, { useState, useEffect } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import Text from "@/components/components/text";
import { fetchProfessioanlDashboardData } from "@/components/states/actions/professional/proProfile";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import {
  cmsFileUrl,
  formatDateTime,
  isArrayEmpty,
  isEmpty,
  isTrialExpired,
} from "@/components/helpers/helpers";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.proProfile.content);
  const member = useSelector((state) => state.proProfile.mem);
  const isLoading = useSelector((state) => state.proProfile.isLoading);
  const pro_profile = useSelector((state) => state.proProfile.pro_profile);
  const received_sms = useSelector((state) => state.proProfile.received_sms);

  // console.log("dashboard",typeof(received_sms));
  console.log(pro_profile);
  const {
    site_settings,
    page_title,
    contract_converged_count,
    message_count,
    impressions,
  } = data;

  console.log(data);

  useEffect(() => {
    dispatch(fetchProfessioanlDashboardData());
  }, []);

  return (
    <>
      <main>
        <Toaster position="top-center" />
        <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>

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
          <section className="dashboard">
            <div className="contain">
              {((pro_profile?.phone_verified == "0" &&
                pro_profile?.phone_verified == 0) || pro_profile?.business_phone == "") && (
                  <div className="alert alert-danger text-center">
                    Your Bussiness Phone is missing or not Verified.
                    <a
                      href="professional-dashboard/services"
                      className="btn btn-lg btn-danger"
                    >
                      <u> Click Here To verify</u>
                    </a>
                  </div>
                )}

                {pro_profile?.trial_period == "trial" && !isTrialExpired(pro_profile?.trail_end) ?
                          <div className="alert alert-warning">
                              You are in trial mode. You should have to pay for subscription after. 
                           
                              <h6 className="text-danger">{formatDateTime(pro_profile?.trail_end)}</h6>
                              
                            </div>

                            
                            :
                            ''
                            
                          }
              <div className="sec_heading">
                <h3>
                  Welcome Back
                  <span className="color">{member?.mem_fname}</span>
                </h3>
              </div>
              <div className="dash_tile_main custom_blk">
                <div className="col">
                  <div className="inner">
                    <div className="icon">
                      <img
                        src="/images/envelope_color.svg"
                        alt="Total Messages Received"
                      />
                    </div>
                    <div className="cntnt">
                      <p>Total Messages Received</p>
                      <h3>{message_count > 0 ? message_count : 0}</h3>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <div className="icon">
                      <img
                        src="/images/ThumbsUp.svg"
                        alt="Total Impressions on Profile"
                      />
                    </div>
                    <div className="cntnt">
                      <p>Total Impressions on Profile</p>
                      <h3>{impressions > 0 ? impressions : 0}</h3>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <div className="icon">
                      <img
                        src="/images/file.svg"
                        alt="Total Contracts Converged"
                      />
                    </div>
                    <div className="cntnt">
                      <p>Total Contracts Converged</p>
                      <h3>
                        {contract_converged_count > 0
                          ? contract_converged_count
                          : 0}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="br"></div>
              <div className="sec_heading">
                <h4>Contracts Converged</h4>
              </div>
              {/* ====start loop====== */}
              {isEmpty(received_sms) && (
                <div className="alert alert-danger text-center">
                  No Reuests Founds
                </div>
              )}
              {!isEmpty(received_sms) &&
                received_sms?.map((sms, i) => {
                  return (
                    <div className="contract_list custom_blk" key={i}>
                      <div className="col">
                        <div className="user_info">
                          <div className="dp_icon">
                            <Image
                              src={cmsFileUrl(sms?.from_mem_dp, "members")}
                              width={60}
                              height={60}
                              alt={"dp"}
                            />
                          </div>
                          <div className="cntnt">
                            <h5>
                              {sms?.from_mem_name}
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
                              {sms?.date}
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
                             {sms?.from_mem_address}
                            </strong>
                          </p>
                        </div>
                      </div>

                      <div className="col">
                        <div className="inner">
                          <p>
                            <small>WorkScope</small>
                          </p>
                          <p>
                            <strong>
                              <a href="" className="btn btn-lg btn-danger">
                                See Workscope
                              </a>
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
Dashboard.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
