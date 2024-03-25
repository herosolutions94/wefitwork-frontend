import React, { useState, useEffect } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import Head from "next/head";
import Text from "@/components/components/text";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { fetchBuyerMaintenanceRequests } from "@/components/states/actions/buyer/maintenanceCover";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, isEmpty, requestStatus, doObjToFormData } from "@/components/helpers/helpers";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import { authToken } from "@/components/helpers/authToken";
import http from "@/components/helpers/http";
import Popup from "@/components/components/popup";
import MsgPopup from "@/components/components/msgPopup";


export default function MaintenanceCover() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenanceCover.content);
  const member = useSelector((state) => state.maintenanceCover.mem);
  const isLoading = useSelector((state) => state.maintenanceCover.isLoading);
  const mc_requests = useSelector((state) => state.maintenanceCover.mc_requests);
  const isFormProcessing = useSelector(
    (state) => state.maintenanceCover.isFormProcessing
  );
  // console.log(data);
  const {
    site_settings,
    page_title,
    mc_purchased_status,
    request_count,

  } = data;

  useEffect(() => {
    dispatch(fetchBuyerMaintenanceRequests());
  }, []);
  // console.log(data)


  const handleRequestDelete = (request_id) => {
    const reqData = { request_id: parseInt(request_id) }
    try {
      http
        .post("user/delete-maintenance-cover-request", doObjToFormData({ request_id: request_id, token: authToken() }))
        .then((data) => {
          if (data?.data?.status == true) {
            toast.success("Request Deleted")
            router.reload();
          } else {
            toast.error("technical problem")
          }
        });
    } catch (errors) {

      console.log("Errors", errors);
    }
  }

  const [popupKey, setPopupKey] = useState(true);
  const [msgPopup, setMsgPopup] = useState(false);

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
            {mc_purchased_status == true || mc_purchased_status == 'true' ? (
              <section className="dashboard main_tenance_dash">
                <div className="contain">
                  <div className="sec_heading flex">
                    <h2>Repair Request </h2>
                    <div className="btn_blk">
                    {request_count < 10 ? 
                      <Link href="/buyer-dashboard/maintenance-cover/add-request" className="site_btn color">Add New</Link>
                    : 
                    <Link href="#" onClick={() => setMsgPopup(true)} className="site_btn color">Add New</Link>

                    }
                    </div>
                  </div>
                  <p>Requests Limit : ({`${request_count} / 10`})</p>
                  {!isEmpty(mc_requests) ? (
                    mc_requests?.map((req, r) => {
                      return (
                        <div className="contract_list custom_blk" key={req?.id}>
                          <div className="col">
                            <div className="inner">
                              <p>
                                <small>Service</small>
                              </p>
                              <p>
                                <strong>
                                  {req?.service_title}
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
                                  {formatDate(req?.created_date)}
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
                                  {req?.address}
                                </strong>
                              </p>
                            </div>
                          </div>
                          <div className="col col_s">
                            <div className="inner">
                              {requestStatus(req?.status)}
                            </div>
                          </div>
                          <div className="col col_s">
                            <div className="inner action_lnks_maintenance">
                              <Link
                                href={`/buyer-dashboard/maintenance-cover/${encrypt_decrypt("encrypt", req?.id)}`}
                              >
                                View
                              </Link>
                              {/* <Link
                                href="" onClick={() => handleRequestDelete(req?.id)} className="red"
                              >
                                Delete


                              </Link> */}
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="alert alert-danger text-center">You haven't made any requests.Click Add New to made a Repair Request. </div>
                  )}


                </div>
              </section>

            )
              :
              <section className="dashboard main_tenance_dash">
                <div className="contain">
                  <div className="alert alert-danger">
                    <h5 className="text-center">You have'nt purchased any Repair Cover service. Please follow on the button to purchase your willng Repair cover</h5>
                    <div className="mini_br"></div>
                    <div className="btn_blk text-center">
                      <Link
                        href="/maintenance-cover"
                        className="site_btn color min_wid"
                      >
                        Repair Cover
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            }
          </>

        )}
      </main>

      <Popup key={popupKey} isOpen={msgPopup} onClose={() => setMsgPopup(false)}>
        <MsgPopup heading="Alert" msg="You have reach your limit of 10 repair cover request contact customer care if you need to make more request."  />
      </Popup>

    </>
  );
}
MaintenanceCover.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
