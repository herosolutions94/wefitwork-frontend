import React, { useEffect, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import { useRouter } from "next/router";
import Head from "next/head";
import Text from "@/components/components/text";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import { getMCRequestData } from "@/components/states/actions/buyer/maintenanceCover";
import { useDispatch, useSelector } from "react-redux";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import { cmsFileUrl, formatDate, isEmpty, requestStatus } from "@/components/helpers/helpers";

export default function MaintenanceDetails() {
  const router = useRouter();
  const {id} = router.query;
  const request_id = encrypt_decrypt("decrypt", id);
  const formData = {request_id: request_id}


  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenanceCover.content);
  const member = useSelector((state) => state.maintenanceCover.mem);
  const isLoading = useSelector((state) => state.maintenanceCover.isLoading);
  const requestImages = useSelector((state) => state.maintenanceCover.requestImages)

  console.log(data);
  const {
    site_settings,
    page_title,
    requestData,
    
  } = data;


  useEffect(() => {
    dispatch(getMCRequestData(formData));
  }, [])

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
                    <h3 className="color"><Text string={requestData?.request_title} /></h3>
                    <div className="mini_br"></div>
                    <div className="address_booking">
                        <img src="/images/MapPin.svg" alt="" />
                        <span>
                        <Text string={requestData?.address} />
                        </span>
                    </div>
                    <div className="br"></div>
                    <div className="main_ul_new">
                        <p><span className="dim_text_main">Category :</span> <strong><Text string={requestData?.service_title} /></strong></p>
                        <p><span className="dim_text_main">Sub Category :</span> <strong><Text string={requestData?.sub_service} /></strong></p>
                        <p><span className="dim_text_main">Date :</span> <strong>{formatDate(requestData?.created_date)}</strong></p>
                        <p><span className="dim_text_main">Status :</span> {requestStatus(requestData?.status)}</p>
                    </div>
                    <div className="br"></div>
                    <h4 className="color">Work Scope</h4>
                    <p><Text string={requestData?.detail} /></p>
                    </div>
                    <div className="col custom_blk">
                    <h3 className="color">Images</h3>
                    <div className="mini_br"></div>
                        <div className="profile_grid_maintenance scrollbar">
                            <div className="flex">
                            {!isEmpty(requestImages) ? (requestImages?.map((img) => {
                              return (
                                <div className="img_col" key={img?.id}>
                                    <div className="inner_img">
                                    {img?.image ? <img
                                        src={cmsFileUrl(img?.image, 'members/mc_request_images')}
                                        alt="image"
                                        />
                                        : 
                                        <img
                                        src="/images/no-image.svg"
                                        alt="image"
                                        />
                                    }
                                        
                                    </div>
                                </div>
                              )
                            })) : (
                              <div className="alert alert-danger text-center">No images are provided</div>
                            )}
                              
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
