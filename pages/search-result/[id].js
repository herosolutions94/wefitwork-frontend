import React, { useState, useEffect } from "react";
import Link from "next/link";
// import Gallery from "@/components/components/Gallery";
import GalleryPopup from "@/components/components/GalleryPopup";
import PopupLarge from "@/components/components/popupLarge";
import ReactStars from "react-stars";
import SendMessage from "@/components/components/sendMessage";
import PopupSmall from "@/components/components/popupSmall";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import { parse } from "cookie";
import http from "@/components/helpers/http";
import {
  doObjToFormData,
  isArrayEmpty,
  timeAgo,
} from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";
import Image from "next/image";
import { cmsFileUrl } from "@/components/helpers/helpers";
import toast from "react-hot-toast";
import SocialShare from "@/components/components/socialShare";
import { useRouter } from "next/router";
import { startConversation } from "@/components/states/actions/chat";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = async (context) => {
  const cookies = parse(context?.req?.headers?.cookie || "");
  const authToken = cookies?.authToken || "";

  const { id } = context.query;
  const pro_mem_id = encrypt_decrypt("decrypt", id);

  const result = await http
    .post(`search-detail/${pro_mem_id}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result, authToken } };
};

export default function SearchResult({ result, authToken }) {
  const router = useRouter();
  console.log("detsil", result);
  let {
    page_title,
    meta_desc,
    pro_mem_profile,
    pro_mem_data,
    pro_mem_sub_services,
    portfolio_images,
    pro_mem_service,
    avg_rating,
    reviews_counts,
    reviews,

    avg_reliability_timekeeping,
    avg_quality_workmanship,
    avg_tidiness,
    avg_courtesy,

    pro_wishlisted,
    memData
  } = result;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenSend, setIsPopupOpenSend] = useState(false);

  // const handleOpenPopupSend = () => {
  //     setIsPopupOpenSend(true);
  // };
  // const handleClosePopupSend = () => {
  //     setIsPopupOpenSend(false);
  // };
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const rating_value = [
    {
      title: "Reliability & timekeeping",
      star: avg_reliability_timekeeping,
    },
    {
      title: "Quality of workmanship",
      star: avg_quality_workmanship,
    },
    {
      title: "Tidiness",
      star: avg_tidiness,
    },
    {
      title: "Courtesy",
      star: avg_courtesy,
    },
  ];
 

  const [proData, setProData] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);

  const handleOpenPopupSend = (pro_mem_data, mem_token = authToken) => {
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

  let pro_wishl = pro_wishlisted ? true : false;

  const [wishlisted, setWishlisted] = useState(pro_wishl);
  const [wishlisting, setWishlisting] = useState(false);


  const addRemoveToWishlist = (pro_mem_id) => {
    setWishlisting(true);
    if(authToken == '' || authToken == null || authToken == undefined){
      toast.error('You must be loged in to add professional to your wishlist');
    }else{
      try {
        http
          .post("user/add-remove-to-wishlist", doObjToFormData({ pro_mem_id: pro_mem_id, token: authToken }))
          .then((data) => {
            if (data?.data?.status == true) {
              setWishlisting(false)
              if(data?.data?.added == true){
                toast.success('This Professional added to your Wishlist');
                setWishlisted(true)
              }else if(data?.data?.removed == true){
                toast.success('Removed from your Wishlist');
                setWishlisted(false)
              }
              
            } else {
              setWishlisting(false)

              toast.error('This Professional not added to your Wishlist');

              setWishlisted(false)
            }
          });
      } catch (errors) {
        setWishlisting(false)

        setWishlisted(false);
        toast.error('This Professional not added to your Wishlist');

        console.log("Errors", errors);
      }
    }
    
  }

  //share
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
    setBaseURL(`${window.location.protocol}//${window.location.host}${router.asPath}`);
  }, [router.pathname]);


  const dispatch = useDispatch();
    
  const isFormProcessing = useSelector((state) => state.chat.isFormProcessing);


  const handleStartChat = (receiver_id, mem_token = authToken) => {
    if(mem_token !== undefined && mem_token !== null && mem_token!== '' ){
      const form_data = {receiver_id : receiver_id};
      dispatch(startConversation(form_data));
    }else{
      toast.error("You are not logedin. Please Login to your account to start the chat with Professional");
      // setAuthPopup(true);
       
    }
  }


  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="professional_details">
          <div className="contain">
            <div className="professiona_view_tile">
              <div className="col">
                <div className="action_buttons">
                {pro_mem_data?.mem_id !== memData?.mem_id && 
                  <button type="button" className={wishlisted ? "like_btn active" : "like_btn"} disabled={wishlisting} onClick={() => addRemoveToWishlist(pro_mem_data?.mem_id)}>
                  {!wishlisting ? <img src="/images/heart.svg" alt="save"  /> : <div class="text-center"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div></div>}
                      
                  </button>
                }
                  <button type="button" className="share_btn" onClick={() => handleOpenSharePopup(pro_mem_data?.mem_id)}>
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
                      <h4>
                        <Text string={pro_mem_data?.mem_fname} />
                      </h4>
                      <div className="rating_lbl">
                        <img src="/images/star.svg" alt="" />
                        <span>
                          {avg_rating} ({reviews_counts} Reviews)
                        </span>
                      </div>
                      <div className="_done_work">
                        <p>Projects Completed</p>
                        <h3>{pro_mem_data?.completed_projects > 0 ? pro_mem_data?.completed_projects : 0}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="done_work">
                    <p>Specialization</p>
                    <h3>
                      {pro_mem_profile?.specialization !== null
                        ? pro_mem_profile?.specialization
                        : "Not Mention"}
                    </h3>
                  </div>
                  <div className="btn_blk">
                  {pro_mem_data?.mem_id == memData?.mem_id ? '' : 
                        <>
                        <button type="button" className="site_btn color block" disabled={isFormProcessing} onClick={() => handleStartChat(pro_mem_data?.mem_id)}>
                      Start Chat{isFormProcessing && (
                      <i
                        className={
                          isFormProcessing ? "spinner" : "spinnerHidden"
                        }
                      ></i>
                    )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenPopupSend(pro_mem_data)}
                      className="site_btn block"
                    >
                      Send SMS
                    </button>
                        </>
                  }
                    
                  </div>
                </div>
              </div>
              <div className="col other_intro">
                <h5>INTRODUCTION</h5>
                <p>
                  <Text
                    string={
                      pro_mem_profile?.bio ? pro_mem_profile?.bio : "default"
                    }
                  />
                </p>
                <div className="br"></div>
                <h5>SERVICES OFFERED</h5>
                <h6 className="color">
                  <Text
                    string={pro_mem_service ? pro_mem_service : "default"}
                  />
                </h6>
                <ul>
                  {pro_mem_sub_services?.map((sub, i) => {
                    return <li key={i}>{sub}</li>;
                  })}
                </ul>
                <div className="br"></div>
                <h5>portfolio</h5>
                <div className="portfolio_grid">
                  {/* <Gallery images={galleryImages}/> */}
                  <div id="my-gallery">
                    {isArrayEmpty(portfolio_images) ? (
                      <div className="alert alert-danger text-center">
                        No Portfolio Images were added
                      </div>
                    ) : (
                      <>
                        {portfolio_images.map((val, i) => {
                          return (
                            <div className="image_grid" key={i}>
                              <Image
                                src={cmsFileUrl(val.image, "members/portfolio")}
                                width={265}
                                height={228}
                                alt="portfolio-imgae"
                              />
                            </div>
                          );
                        })}

                        <div className="btn_blk">
                          <button
                            type="button"
                            className="site_btn"
                            onClick={handleOpenPopup}
                          >
                            View all Images
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="rating_view_block">
                  <div className="rating_view_block_header">
                    <div className="sumary_rating">
                      <img src="/images/star.svg" alt="" />
                      <span>
                        {avg_rating} ({reviews_counts} Reviews)
                      </span>
                    </div>
                    <div className="overall_rating">
                      {rating_value.map((val) => {
                        return (
                          <div key={val.id}>
                            <h5>{val.title}</h5>
                            <ReactStars
                              className="rates"
                              count={5}
                              value={val.star}
                              size={24}
                              color1={"#ddd"}
                              color2={"#FF3D3D"}
                              edit={false}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="rateing_list_review">
                    {reviews.map((val) => {
                      return (
                        <div className="buyer_review" key={val.id}>
                          <div className="head_review">
                            <div className="buyer_info">
                              <div className="img_icon">
                                {val?.review_from_mem_image == null ||
                                val?.review_from_mem_image == "" ? (
                                  <img
                                    src="/images/no-user.svg"
                                    alt={val?.review_from_mem_name}
                                  />
                                ) : (
                                  <img
                                    src={cmsFileUrl(
                                      val?.review_from_mem_image,
                                      "members"
                                    )}
                                    alt={val?.review_from_mem_name}
                                  />
                                )}
                              </div>
                              <div className="cntnt">
                                <h6>{val?.review_from_mem_name}</h6>
                                <p>
                                  <small>{timeAgo(val?.created_date)}</small>
                                </p>
                              </div>
                            </div>
                            <div className="rating_star_reviw">
                              <ReactStars
                                className="rates"
                                count={5}
                                value={val?.rating}
                                size={24}
                                color1={"#ddd"}
                                color2={"#FF3D3D"}
                                edit={false}
                              />
                            </div>
                          </div>
                          <p>{val?.review}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PopupLarge isOpen={isPopupOpen} onClose={handleClosePopup}>
        <GalleryPopup onClose={handleClosePopup} images={portfolio_images} />
      </PopupLarge>
      {/* <PopupSmall isOpen={isPopupOpenSend} onClose={handleClosePopupSend}>
        <SendMessage />
      </PopupSmall> */}

      {authPopup && (
        <PopupSmall isOpen={authPopup} onClose={handleClosePopupSend}>
          <LoginPopup
            handleOpenPopupSend={handleOpenPopupSend}
            proData={proData}
            setAuthPopup={setAuthPopup}
          />
        </PopupSmall>
      )}

      <PopupSmall isOpen={isPopupOpenSend} onClose={handleClosePopupSend}>
        {proData && (
          <SendMessage
            data={proData}
            handleClosePopupSend={handleClosePopupSend}
          />
        )}
      </PopupSmall>

      <PopupSmall isOpen={isSharePopup} onClose={handleCloseSharePopup}>
        <SocialShare handleClosePopupSend={handleCloseSharePopup} url={baseURL} title={`WefitWork Professional`} />
      </PopupSmall>

    </>
  );
}
