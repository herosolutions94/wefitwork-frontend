import React, { useState } from "react";
import Link from "next/link";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });
import Tabs from "../components/Tabs";
import ProfessionalTabs from "../components/professionalsTab";
import BuyerTabs from "../components/buyerTabs";
import Testimonials from "../components/testimonials";
import ExploreFrom from "../components/exploreForm";
import Popup from "../components/popup";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import http from "../helpers/http";
import { cmsFileUrl, doObjToFormData } from "../helpers/helpers";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import SubSerForm from "../components/subSerForm";
import { useForm } from "react-hook-form";
import { encrypt_decrypt } from "../helpers/rsa-helper";

export const getServerSideProps = async () => {
  const result = await http
    .get("home")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Home({ result }) {
  const router = useRouter();
  const [popupKey, setPopupKey] = useState(true);
  // console.log(result);
  let {
    page_title,
    meta_desc,
    content,
    banner_pics,
    testimonials,
    featured_services,
    most_searched,
    services,
  } = result;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [searchMode, setSearchMode] = useState("popup");

  const [serId, setSerId] = useState(false);
  const [serviceTitle, setServiceTitle] = useState(false);

  const handleChangeSearchMode = (mode) => {
    setSearchMode(mode);
  };



  const handleOpenPopup = (service_id = 0, title = '') => {
    if (searchMode == "popup") {
      setIsPopupOpen(true);
      setSerId(service_id);
      setServiceTitle(title);
      setPopupKey(!popupKey);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSerId(false);
      setServiceTitle(false);
  };

  const tabs = [
    {
      label: "For Professionals",
      content: <ProfessionalTabs />,
    },
    {
      label: "For Buyers",
      content: <BuyerTabs />,
    },
  ];
  const option = {
    autoplay: true,
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 1000,
    items: 1,
  };
  const categories = {
    margin: 20,
    autoplay: true,
    loop: true,
    dots: false,
    nav: true,
    navText: [
      '<img src="images/arrow-left.svg" />',
      '<img src="images/arrow-right.svg" />',
    ],
    smartSpeed: 1000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
      },
      580: {
        items: 4,
      },
      991: {
        items: 5,
      },
      1200: {
        items: 7,
      },
      1600: {
        items: 8,
      },
    },
  };

  const handleServiceClick = (service_id) => {
    router.push(`search-result?service_id=${service_id}`);
  };

  
  const [isSearching, setIsSearching] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);

  const [searchResult, setSearchResult] = useState({ professions: false });

  const handleSearchByName = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    // console.log(inputValue);
    setIsSearching(true);
    try {
      http
        .post("search-profession", doObjToFormData({ search_name: inputValue }))
        .then((data) => {
          // console.log(data);
          if (data?.data?.status == true) {
            setSearchResult({ professions: data.data.professions });
            setIsSearching(false);
            document.getElementById("search-list").style.display = "block";
          } else {
            setIsSearching(false);
            setStopSearch(true);
            document.getElementById("search-list").style.display = "none";

            setTimeout(() => {
              document.getElementById("search-list").style.display = "none";
            }, 2000);
          }
        });
    } catch (errors) {
      console.log("Errors", errors);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="banner_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <h1>
                  <Text string={content?.banner_heading_1} />
                </h1>
                <Text string={content?.banner_detail} />
                <form>
                  <input
                    type="text"
                    className={
                      searchMode == "popup"
                        ? "input focus_block"
                        : "input"
                    }
                    name="search_name"
                    placeholder={
                      searchMode == "popup"
                        ? "Search by Professional Categories (eg, Electrician)"
                        : "Entre Professional name to search"
                    }
                    onClick={handleOpenPopup}
                    onChange={handleSearchByName}
                    autoComplete="off"
                  />
                  <button type="button" onClick={handleOpenPopup}>
                    <img src="/images/search.svg" alt="" />
                  </button>
                </form>
                <div
                  class="list-group"
                  id="search-list"
                  style={{ display: "none" }}
                >
                  {!stopSearch ? (
                    !isSearching ? (
                      !searchResult?.professions ? (
                        <div className="alert alert-danger">
                          Nothing Exsists with this Name
                        </div>
                      ) : (
                        <>
                          {searchResult?.professions?.map((val, i) => {
                            return (
                              <Link
                                href={`/search-result/${encrypt_decrypt(
                                  "encrypt",
                                  val?.mem_id
                                )}`}
                                className="list-group-item list-group-item-action d-flex align-items-center"
                              >
                                <div className="image">
                                  {val?.mem_image ? (
                                    <img
                                      src={cmsFileUrl(
                                        val?.mem_image,
                                        "members"
                                      )}
                                      style={{ width: "50px" }}
                                      className="p-3"
                                      alt={val?.mem_fname}
                                    />
                                  ) : (
                                    <img
                                      src="/images/no-user.svg"
                                      style={{ width: "50px" }}
                                      className="p-3"
                                      alt={val?.mem_fname}
                                    />
                                  )}
                                </div>

                                <Text string={val?.mem_fname} />
                              </Link>
                            );
                          })}
                        </>
                      )
                    ) : (
                      <div className="text-center">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
                {searchMode == "popup" ? (
                  <Link
                    href="#"
                    onClick={() => handleChangeSearchMode("search-input")}
                    className="new_lbl_banner"
                  >
                    Or search by professional name
                  </Link>
                ) : (
                  <Link
                    href="#"
                    onClick={() => handleChangeSearchMode("popup")}
                    className="new_lbl_banner"
                  >
                    Or search by professional categories
                  </Link>
                )}

                {/* <div className="most_searched_cat">
                  <p>
                    <strong>
                      <Text string={content?.banner_tagline} />
                    </strong>
                  </p>
                  <div className="flex_cat">
                    {most_searched?.map((searched, i) => {
                      return (
                        <>
                          <div
                            className="col"
                            key={i}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpenPopup(searched?.id, searched?.title)}
                          >
                            <div className="inner">
                              <div className="img_icon">
                                <Image
                                  src={cmsFileUrl(searched?.icon, "services")}
                                  width={40}
                                  height={40}
                                  alt={searched?.title}
                                />
                              </div>
                              <h5>
                                <Text string={searched?.title} />
                              </h5>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div> */}
              </div>
              <div className="colR">
                <OwlCarousel className="owl-carousel owl-theme" {...option}>
                  {banner_pics?.map((val, i) => {
                    return (
                      <div className="image" key={i}>
                        <Image
                          src={cmsFileUrl(val?.image)}
                          width={507}
                          height={507}
                          alt="banner-pic"
                        />
                      </div>
                    );
                  })}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </section>
        <section className="categories_sec">
          <div className="contain">
            <div className="sec_heading">
              <h2>
                <Text string={content?.sec2_heading} />
              </h2>
            </div>
            <div className="show_ds_sc">
              <OwlCarousel className="owl-carousel owl-theme" {...categories}>
                {featured_services?.map((val) => {
                  return (
                    <div
                      className="item"
                      style={{ cursor: "pointer" }}
                      key={val.id}
                      onClick={() => handleOpenPopup(val?.id, val?.title)}
                    >
                      <div className="inner">
                        <div className="icon_img">
                          <Image
                            src={cmsFileUrl(val?.icon, "services")}
                            width={60}
                            height={60}
                            alt={val?.title}
                          />
                        </div>
                        <h5>
                          <Text string={val.title} />
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
            <div className="hide_ds_sc">
              <OwlCarousel
                id="mob-v"
                className="owl-carousel owl-theme"
                {...categories}
              >
                {featured_services?.map((val, index) => {
                  // Render two items per iteration
                  if (index % 2 === 0) {
                    return (
                      <div className="item-pair" key={index}>
                        {/* First item in the pair */}
                        <div
                          className="item"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleOpenPopup(val?.id, val?.title)
                          }
                        >
                          <div className="inner">
                            <div className="icon_img">
                              <Image
                                src={cmsFileUrl(val?.icon, "services")}
                                width={60}
                                height={60}
                                alt={val?.title}
                              />
                            </div>
                            <h5>
                              <Text string={val.title} />
                            </h5>
                          </div>
                        </div>
                        {/* Second item in the pair */}
                        {featured_services[index + 1] && (
                          <div
                            className="item"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleOpenPopup(
                                featured_services[index + 1]?.id,
                                featured_services[index + 1]?.title
                              )
                            }
                          >
                            <div className="inner">
                              <div className="icon_img">
                                <Image
                                  src={cmsFileUrl(
                                    featured_services[index + 1]?.icon,
                                    "services"
                                  )}
                                  width={60}
                                  height={60}
                                  alt={featured_services[index + 1]?.title}
                                />
                              </div>
                              <h5>
                                <Text
                                  string={featured_services[index + 1]?.title}
                                />
                              </h5>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null; // Skip rendering for odd indices
                })}
              </OwlCarousel>
            </div>
          </div>
        </section>
        <section className="step_one">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src={cmsFileUrl(content?.image1)} alt="" />
                  </div>
                  <h4>
                    <Text string={content?.sec2_img_card_heading1} />
                  </h4>
                  <p>
                    <Text string={content?.sec2_img_card_tagline1} />
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src={cmsFileUrl(content?.image2)} alt="" />
                  </div>
                  <h4>
                    <Text string={content?.sec2_img_card_heading2} />
                  </h4>
                  <p>
                    <Text string={content?.sec2_img_card_tagline2} />
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src={cmsFileUrl(content?.image3)} alt="" />
                  </div>
                  <h4>
                    <Text string={content?.sec2_img_card_heading3} />
                  </h4>
                  <p>
                    <Text string={content?.sec2_img_card_tagline3} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="how_it_works">
          <div className="contain">
            <div className="sec_heading text-center">
              <h2>
                <Text string={content?.sec3_heading} />
              </h2>
              <Text string={content?.sec3_detail} />
            </div>
            {/* <Tabs tabs={tabs} defaultTab={0} /> */}
            <div className="flex_how_work_cstm">
              <div className="col">
                <div className="inner">
                  <div className="image_new">
                    <Image
                      src={cmsFileUrl(content?.image4)}
                      width={377}
                      height={264}
                      alt={content?.sec3_card_heading4}
                    />
                  </div>
                  <div className="cntnt">
                    <h4>
                      <Text string={content?.sec3_card_heading4} />
                    </h4>
                    <p>
                      <Text string={content?.sec3_card_tagline4} />
                    </p>
                    <div className="btn_blk">
                      <button
                        type="button"
                        onClick={handleOpenPopup}
                        className="site_btn"
                      >
                        {content?.sec3_card_btn_text4}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="image_new">
                    <Image
                      src={cmsFileUrl(content?.image5)}
                      width={377}
                      height={264}
                      alt={content?.sec3_card_heading5}
                    />
                  </div>
                  <div className="cntnt">
                    <h4>
                      <Text string={content?.sec3_card_heading5} />
                    </h4>
                    <p>
                      <Text string={content?.sec3_card_tagline5} />
                    </p>
                    <div className="btn_blk">
                      <Link
                        href={content?.sec3_card_btn_link5}
                        className="site_btn"
                      >
                        {content?.sec3_card_btn_text5}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="image_new">
                    <Image
                      src={cmsFileUrl(content?.image6)}
                      width={377}
                      height={264}
                      alt={content?.sec3_card_heading6}
                    />
                  </div>
                  <div className="cntnt">
                    <h4>
                      <Text string={content?.sec3_card_heading6} />
                    </h4>
                    <p>
                      <Text string={content?.sec3_card_tagline6} />
                    </p>
                    <div className="btn_blk">
                      <Link
                        href={content?.sec3_card_btn_link6}
                        className="site_btn"
                      >
                        {content?.sec3_card_btn_text6}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="cta_sec">
          <div className="contain">
            <div className="cntnt">
              <div className="sec_heading text-center">
                <h2>Seamless Interaction and Collaboration</h2>
                <p>Connect, Collaborate, Conquer, Seamless Interaction</p>
              </div>
              <div className="btn_blk text-center">
                <Link href="" className="site_btn color min_wid">Become a Professional</Link>
                <span>OR</span>
                <Link href="" className="site_btn white min_wid">Contact Us</Link>
              </div>
            </div>
          </div>
        </section> */}
        <section className="testimonial_sec">
          <div className="contain">
            <div className="sec_heading text-center">
              <h2>
                <Text string={content?.sec4_heading} />
              </h2>
            </div>
            <Testimonials data={testimonials} />
          </div>
        </section>
      </main>
      <Popup key={popupKey} isOpen={isPopupOpen} onClose={handleClosePopup}>
        <ExploreFrom onClose={handleClosePopup} services={services} serId={serId} selectedTitle={serviceTitle} />
      </Popup>

      
    </>
  );
}
