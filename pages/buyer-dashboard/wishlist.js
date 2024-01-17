import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import SendMessage from "@/components/components/sendMessage";
import PopupSmall from "@/components/components/popupSmall";
import { fetchBuyerWishlist } from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import Text from "@/components/components/text";
import Image from "next/image";
import { cmsFileUrl } from "@/components/helpers/helpers";
import { authToken } from "@/components/helpers/authToken";
import SocialShare from "@/components/components/socialShare";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";



export default function Wishlist() {
    const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);

  useEffect(() => {
    dispatch(fetchBuyerWishlist());
  }, []);

  const { site_settings, page_title, wishlist } = data;


    const [isPopupOpenSend, setIsPopupOpenSend] = useState(false);
    
    const [proData, setProData] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);

  const handleOpenPopupSend = (pro_mem_data, mem_token = authToken()) => {
    console.log(pro_mem_data)
    if (mem_token !== undefined && mem_token !== null && mem_token !== "") {
      setProData(pro_mem_data);
      setIsPopupOpenSend(true);
    } else {
        
      toast.error(
        "You sre not logedin. Please Login to your account to send SMS"
      );
      setAuthPopup(true);
      setProData(pro_mem_data);
    }
  };
  const handleClosePopupSend = () => {
    setProData(false);
    setIsPopupOpenSend(false);
    setAuthPopup(false);
  };

  const [isSharePopup, setIsSharePopup] = useState(false);
  const [proId, setProId] = useState(false);

  const handleOpenSharePopup = ([pro_id]) =>{
    setProId(pro_id);
    setIsSharePopup(true);
  }

  const handleCloseSharePopup = () => {
    setProId(false);
    setIsSharePopup(false);
  }

  const [baseURL, setBaseURL] = useState('');

  useEffect(() => {
    // Access base URL when the component mounts
    setBaseURL(`${window.location.protocol}//${window.location.host}`);
  }, [router.pathname]);

  
  return (
    <>
    <Toaster position="top-center" />
      <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
      <main>
         <section className="dashboard professional_details">
            <div className="contain">
                <div className="sec_heading">
                    <h2>My Wishlist</h2>
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

                {!isLoading && 
                    <div className="professiona_view_tile">
                    {wishlist !== null || wishlist !== 'null' || wishlist !== '' || wishlist !== undefined ?
                        wishlist?.map((val, i) => {
                            return (
                                <div className="col" key={i}>
                        <div className="action_buttons">
                            <button type="button" className="like_btn active">
                                <img src="/images/heart.svg" alt="save" />
                            </button>
                            <button type="button" className="share_btn" onClick={() => handleOpenSharePopup(val?.mem_id)}>
                                <img src="/images/ShareNetwork.svg" alt="save" />
                            </button>
                        </div>
                        <div className="inner">
                            <div className="head_professional">
                                <div className="image">
                                {val?.mem_image ? (
                        <Image
                          src={cmsFileUrl(val?.mem_image, "members")}
                          width={130}
                          height={130}
                          alt={val?.mem_fname}
                        />
                      ) : (
                        <img
                          src="/images/no-user.svg"
                          alt={val?.mem_fname}
                        />
                      )}
                                    <img src="/images/pro3.png" alt="Thomas Alenjery"/>
                                </div>
                                <div className="cntnt">
                                    <h4>{val?.mem_fname}<span className="work_expert">{val?.service_title}</span></h4>
                                    <div className="rating_lbl">
                                        <img src="/images/star.svg" alt=""/>
                                        <span>{val?.avg_rating} ({val?.reviews_counts} Reviews)</span>
                                    </div>
                                    <div className="_done_work">
                                        <p>Projects Completed</p>
                                        <h3>{val?.completed_projects}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="done_work">
                                <p>Specialization</p>
                                <h3>{val?.mem_specialization}</h3>
                            </div>
                            <div className="btn_blk">
                                <Link href="" className="site_btn color block">Start Chat</Link>
                                <button type="button" onClick={() => handleOpenPopupSend(val)} className="site_btn block">Send SMS</button>
                            </div>
                        </div>
                    </div>
                            )
                        })
                        : 
                        <div className="alert alert-danger">You haven't wishlisted any Professional</div>
                    }
                    
                    
                </div>
                 

                }
                
            </div>
         </section>
      </main>
      <PopupSmall isOpen={isSharePopup} onClose={handleCloseSharePopup}>
        <SocialShare handleClosePopupSend={handleCloseSharePopup} url={`${baseURL}/search-result/${encrypt_decrypt("encrypt",proId)}`} title={`WefitWork Professional`} />
      </PopupSmall>
      
      <PopupSmall isOpen={isPopupOpenSend} onClose={handleClosePopupSend}>
        {proData && (
          <SendMessage
            data={proData}
            handleClosePopupSend={handleClosePopupSend}
          />
        )}
      </PopupSmall>
    </>
  );
}
Wishlist.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
