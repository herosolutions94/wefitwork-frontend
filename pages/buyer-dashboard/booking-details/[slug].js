import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import { fetchBookingDetails } from "@/components/states/actions/buyer/bookings";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Text from "@/components/components/text";
import Image from "next/image";
import { cmsFileUrl } from "@/components/helpers/helpers";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";

export default function BookingDetails() {
    const router = useRouter();
    const {slug} = router.query;
    const dispatch = useDispatch();
    const data = useSelector((state) => state.bookings.content);
    const member = useSelector((state) => state.bookings.mem);
    const isLoading = useSelector((state) => state.bookings.isLoading);

    useEffect(() => {
        dispatch(fetchBookingDetails(slug))
    }, [])
    
    const { site_settings, page_title, row_data, pro_mem_data, pro_mem_profile, workscope } = data;

    const [isYesSelected, setIsYesSelected] = useState(false);

    const handleYesClick = () => {
        setIsYesSelected(true);
    };

    const handleNoClick = () => {
        setIsYesSelected(false);
    };
    const [isYesSelectedTwo, setIsYesSelectedTwo] = useState(false);

    const handleYesClickTwo = () => {
        setIsYesSelectedTwo(true);
    };

    const handleNoClickTwo = () => {
        setIsYesSelectedTwo(false);
    };
  return (
    <>
    <Toaster position="top-center" />
    <Head>
    <title>{page_title ? page_title : "fetching..."}</title>
    </Head>
      <main>
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
         {!isLoading && <section className="dashboard professional_details">
            <div className="contain">
                <div className="professiona_view_tile">
                    <div className="col custom_blk">
                        <h4 className="color"><Text string={row_data?.service} /></h4>
                        {/* <h6>Plumber, Sewer Line Repair</h6> */}
                        <div className="mini_br"></div>
                        <div className="address_booking"><img src="/images/MapPin.svg" alt=""/><span><Text string={row_data?.to_mem_address} /></span></div>
                        <div className="br"></div>
                        <h4 className="color">Work Scope</h4>
                        <p><Text string={workscope?.work_scope} /></p>
                    </div>
                    <div className="col custom_blk">
                        <div className="action_buttons">
                            <button type="button" className="like_btn">
                                <img src="/images/heart.svg" alt="save" />
                            </button>
                            <button type="button" className="share_btn">
                                <img src="/images/ShareNetwork.svg" alt="save" />
                            </button>
                        </div>
                        <div className="inner">
                            <div className="head_professional">
                                <div className="image">
                                {pro_mem_data?.mem_image ? (
                                  <Image
                                    src={cmsFileUrl(pro_mem_data?.mem_image, "members")}
                                    width={130}
                                    height={130}
                                    alt={pro_mem_data?.mem_fname}
                                  />
                                ) : (
                                  <img
                                    src="/images/no-user.svg"
                                    alt={pro_mem_data?.mem_fname}
                                  />
                                )}
                                </div>
                                <div className="cntnt">
                                    <h4>{pro_mem_data?.mem_fname}</h4>
                                    <div className="rating_lbl">
                                        <img src="/images/star.svg" alt=""/>
                                        <span>5.0 (10 Reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="done_work">
                                <p>Projects Completed</p>
                                <h3>3</h3>
                            </div>
                            <div className="done_work">
                                <p>Specialization</p>
                                <h3>{pro_mem_profile?.specialization}</h3>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col custom_blk">
                        <ul className="booking_ul">
                            <li>
                                <div className="ques">
                                    <h4>Have <em>{pro_mem_data?.mem_fname}</em> Contacted you?</h4>
                                </div>
                                <div className="button-container">
                                    <button onClick={handleYesClick} className={isYesSelected ? 'active' : ''}>
                                    Yes
                                    </button>
                                    <button onClick={handleNoClick} className={!isYesSelected ? 'active' : ''}>
                                    No
                                    </button>
                                </div>
                            </li>

                            <li>
                                <div className="ques">
                                    <h4>Have you hired <em>{pro_mem_data?.mem_fname}</em> ?</h4>
                                </div>
                                <div className="button-container">
                                    <button onClick={handleYesClickTwo} className={isYesSelectedTwo ? 'active' : ''}>
                                    Yes
                                    </button>
                                    <button onClick={handleNoClickTwo} className={!isYesSelectedTwo ? 'active' : ''}>
                                    No
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <div className="br"></div><div className="br"></div>
                        <div className="btn_blk text-center">
                            <Link href={`/buyer-dashboard/leave-review/${encrypt_decrypt('encrypt', pro_mem_data?.mem_id)}`} className="site_btn">Leave Review</Link>
                        </div>
                    </div>
                </div>
            </div>
         </section>}
      </main>
      
    </>
  );
}
BookingDetails.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
