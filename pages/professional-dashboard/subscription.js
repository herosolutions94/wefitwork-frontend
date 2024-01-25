import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import { fetchMemSubscriptions } from "@/components/states/actions/professional/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Text from "@/components/components/text";
import Head from "next/head";
import {
  capitalizeFirstLetter,
  formatDate,
  formatDateTime,
  format_amount,
  format_amount_comma,
  isArrayEmpty,
  subscriptionStatus,
} from "@/components/helpers/helpers";

export default function Subscription() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subscriptions.content);
  const member = useSelector((state) => state.subscriptions.mem);
  const pro_profile = useSelector((state) => state.subscriptions.pro_profile);
  const isLoading = useSelector((state) => state.subscriptions.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.subscriptions.isFormProcessing
  );

  useEffect(() => dispatch(fetchMemSubscriptions()), []);

  // console.log(data);
  const {
    site_settings,
    page_title,
    mem_active_subscription,
    mem_subscriptions,
  } = data;

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
                <ProfessionalSidebar data={"subscription"} />
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h2>Subscriptions</h2>
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
                  <>
                    <div className="profile_blk custom_blk">
                      <div className="subscription_block_dash">
                        <p>
                          Contact at
                          <Link href={`tel:${site_settings?.site_phone}`}>
                            <Text string={site_settings?.site_phone} />
                          </Link>
                          or
                          <Link
                            href={`mailto:${site_settings?.site_general_eamil}`}
                          >
                            <Text string={site_settings?.site_general_email} />
                          </Link>
                        </p>
                        <div className="sec_heading">
                          <h4>Active Subscriptions</h4>
                        </div>
                        {mem_active_subscription === null ||
                        mem_active_subscription === "" ||
                        mem_active_subscription === undefined ? (
                          <>
                            <div className="alert alert-danger">
                              You Don't have any active subscription. PLease
                              Subscribe to Plan. Thank you!
                            </div>

                            <div className="btn_blk">
                              <a href="?" className="site_btn color">
                                Subscribe
                              </a>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="out_flex_subs">
                              <div className="flex_subs">
                                <div>User</div>
                                <div>Start Date</div>

                                <div>Plan Amount</div>
                              </div>
                              <div className="flex_subs">
                                <div>
                                  <Text string={member?.mem_fname} />
                                </div>
                                <div>
                                  <Text
                                    string={formatDateTime(
                                      mem_active_subscription?.start_date
                                    )}
                                  />
                                </div>
                                <div>
                                  {format_amount_comma(
                                    parseFloat(mem_active_subscription?.amount)
                                  )}
                                  <Text
                                    string={capitalizeFirstLetter(
                                      mem_active_subscription?.plan_interval
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="membership_card">
                              <div className="inner_membership">
                                <div className="mini_pro">
                                  <img
                                    src="/images/pro_membership.svg"
                                    alt=""
                                  />
                                  <span>
                                    <Text
                                      string={
                                        mem_active_subscription?.paystack_plan_name
                                      }
                                    />
                                  </span>
                                </div>
                                <div className="price_head">
                                  <h2>
                                    {format_amount(
                                      mem_active_subscription?.amount
                                    )}
                                    <span>
                                      <Text
                                        string={capitalizeFirstLetter(
                                          mem_active_subscription?.plan_interval
                                        )}
                                      />
                                    </span>
                                  </h2>
                                </div>
                                <p>
                                  Renewal on <br />
                                  {formatDateTime(
                                    mem_active_subscription?.end_date
                                  )}
                                </p>
                                <div className="btn_blk">
                                  <button
                                    type="submit"
                                    className="site_btn block white"
                                  >
                                    Cancel Subscription
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="br"></div>
                    <div className="sec_heading">
                      <h3>Previous Subscriptions</h3>
                    </div>
                    {mem_subscriptions === "" ||
                    mem_subscriptions === null ||
                    mem_subscriptions === undefined ||
                    isArrayEmpty(mem_subscriptions) ? (
                      <div className="contract_list text-center">
                        <div className="alert alert-danger text-center">
                          You have no previous subscription!.
                        </div>
                      </div>
                    ) : (
                      mem_subscriptions?.map((subs, i) => {
                        return (
                          <div className="contract_list" key={i}>
                            <div className="col">
                              <div className="user_info">
                                <div className="cntnt">
                                  <h5>
                                    <Text string={subs?.paystack_plan_name} />
                                  </h5>
                                  <p>
                                    <Text string={subs?.paystack_plan_code} />
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="col col_l">
                              <div className="inner">
                                <p>
                                  <small>Subscription Code</small>
                                </p>
                                <p>
                                  <strong>
                                    <Text
                                      string={subs?.paystack_subscription_code}
                                    />
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="col">
                              <div className="inner">
                                <p>
                                  <small>Start Date</small>
                                </p>
                                <p>
                                  <strong>
                                    <Text
                                      string={formatDate(subs?.start_date)}
                                    />
                                  </strong>
                                </p>
                              </div>
                            </div>

                            <div className="col">
                              <div className="inner">
                                <p>
                                  <small>End Date</small>
                                </p>
                                <p>
                                  <strong>
                                    <Text string={formatDate(subs?.end_date)} />
                                  </strong>
                                </p>
                              </div>
                            </div>
                            <div className="col">
                              <div className="inner">
                                <p>
                                  <small>Status</small>
                                </p>
                                <p>
                                  <strong>
                                    {subscriptionStatus(
                                      subs?.subscription_status
                                    )}
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Subscription.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
