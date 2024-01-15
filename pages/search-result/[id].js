import React, { useState } from "react";
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
//   console.log("detsil", result);
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
  // const reviews = [
  //     {
  //         id:"review1",
  //         icon:"/images/pro5.png",
  //         name:"John Doeing",
  //         time_message:"in the last week",
  //         star:"5",
  //         comment:"I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
  //     },
  //     {
  //         id:"review2",
  //         icon:"/images/testi8.webp",
  //         name:"Stefen Gilbert",
  //         time_message:"in the last week",
  //         star:"5",
  //         comment:"I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
  //     },
  //     {
  //         id:"review3",
  //         icon:"/images/testi9.png",
  //         name:"Kreg Geo",
  //         time_message:"in the last week",
  //         star:"5",
  //         comment:"I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
  //     },
  // ]

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

  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="professional_details">
          <div className="contain">
            <div className="professiona_view_tile">
              <div className="col">
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
                    <Link href="" className="site_btn color block">
                      Start Chat
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenPopupSend(pro_mem_data)}
                      className="site_btn block"
                    >
                      Send SMS
                    </button>
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
    </>
  );
}
