import React, { useState } from "react";
import Link from "next/link";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
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
import { cmsFileUrl } from "../helpers/helpers";

export const getServerSideProps = async () => {
  const result = await http
    .get("home")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Home({result}) {
  // console.log(result);
  let { page_title, meta_desc, content, banner_pics, profession_categories, testimonials, featured_profession_categories } = result;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const tabs = [
    {
      label: 'For Professionals',
      content: <ProfessionalTabs />,
    },
    {
      label: 'For Buyers',
      content: <BuyerTabs />,
    },
  ];
  const option = {
    autoplay:true,
    loop: true,
    dots: false,
    nav: false,
    smartSpeed: 1000,
    items: 1,
    
  };
  const categories = {
    margin: 20,
    autoplay:true,
    loop: true,
    dots: false,
    nav: true,
    navText: ['<img src="images/arrow-left.svg" />','<img src="images/arrow-right.svg" />'],
    smartSpeed: 1000,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2
      },
      580: {
        items: 4
      },
      991: {
        items: 5
      },
      1200: {
        items:7
      },
      1600: {
        items: 8
      }
    }
  };
 
  return (
    <>
    <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="banner_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <h1><Text string={content?.banner_heading_1} /></h1>
                <Text string={content?.banner_detail} />
                <form>
                  <input type="text" className="input" name="" placeholder={"Professional  (eg, Electrician)"} onClick={handleOpenPopup}/>
                  <button type="button" onClick={handleOpenPopup}><img src="/images/search.svg" alt=""/></button>
                </form>
                <div className="most_searched_cat">
                  <p><strong><Text string={content?.banner_tagline} /></strong></p>
                  <div className="flex_cat">
                  {featured_profession_categories?.map((feat_cat, i) => {
                    return(
                      <div className="col" key={i}>
                      <div className="inner">
                        <div className="img_icon">
                          <Image 
                            src={cmsFileUrl(feat_cat?.icon, 'categories')}
                            width={40}
                            height={40}
                            alt={feat_cat?.title}
                          />
                          
                        </div>
                        <h5><Text string={feat_cat?.title} /></h5>
                      </div>
                    </div>
                    )
                  })}
                   
                  </div>
                </div>
              </div>
              <div className="colR">
                  <OwlCarousel className="owl-carousel owl-theme"
                            {...option}>
                      {banner_pics?.map((val, i) => {
                        return(
                          <div className="image" key={i}>
                          <Image 
                            src={cmsFileUrl(val?.image)}
                            width={507}
                            height={507}
                            alt="banner-pic"
                          />
                        
                      </div>
                        )
                      })}
                      
                      
                  </OwlCarousel>
                
              </div>
            </div>
          </div>
        </section>
        <section className="categories_sec">
          <div className="contain">
            <div className="sec_heading">
              <h2><Text string={content?.sec2_heading} /></h2>
            </div>
            <OwlCarousel className="owl-carousel owl-theme" {...categories}>
              {profession_categories?.map((val)=>{
                return(
                  <div className="item" key={val.id}>
                    <div className="inner">
                      <div className="icon_img">
                      <Image 
                          src={cmsFileUrl(val?.icon, 'categories')}
                          width={60}
                          height={60}
                          alt={val?.title}
                        />
                       
                      </div>
                      <h5><Text string={val.title} /></h5>
                    </div>
                  </div>
                );
              })}
              
            </OwlCarousel>
          </div>
        </section>
        <section className="step_one">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    
                    <img src={cmsFileUrl(content?.image1)} alt=""/>
                  </div>
                  <h4><Text string={content?.sec2_img_card_heading1} /></h4>
                  <p><Text string={content?.sec2_img_card_tagline1} /></p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src={cmsFileUrl(content?.image2)} alt=""/>
                  </div>
                  <h4><Text string={content?.sec2_img_card_heading2} /></h4>
                  <p><Text string={content?.sec2_img_card_tagline2} /></p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src={cmsFileUrl(content?.image3)} alt=""/>
                  </div>
                  <h4><Text string={content?.sec2_img_card_heading3} /></h4>
                  <p><Text string={content?.sec2_img_card_tagline3} /></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="how_it_works">
          <div className="contain">
              <div className="sec_heading text-center">
                <h2><Text string={content?.sec3_heading} /></h2>
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
                      <h4><Text string={content?.sec3_card_heading4} /></h4>
                      <p><Text string={content?.sec3_card_tagline4} /></p>
                      <div className="btn_blk">
                        <Link href={content?.sec3_card_btn_link4} className="site_btn">{content?.sec3_card_btn_text4}</Link>
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
                    <h4><Text string={content?.sec3_card_heading5} /></h4>
                      <p><Text string={content?.sec3_card_tagline5} /></p>
                      <div className="btn_blk">
                        <Link href={content?.sec3_card_btn_link5} className="site_btn">{content?.sec3_card_btn_text5}</Link>
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
                    <h4><Text string={content?.sec3_card_heading6} /></h4>
                      <p><Text string={content?.sec3_card_tagline6} /></p>
                      <div className="btn_blk">
                        <Link href={content?.sec3_card_btn_link6} className="site_btn">{content?.sec3_card_btn_text6}</Link>
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
                <h2><Text string={content?.sec4_heading} /></h2>
              </div>
              <Testimonials data={testimonials}/>
          </div>
        </section>
      </main>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <ExploreFrom onClose={handleClosePopup} />
      </Popup>
    </>
  );
}
