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

export default function Home() {
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
  const cats = [
    {
      id:1,
      image:"/images/icon1.svg",
      title:"Plumber"
    },
    {
      id:2,
      image:"/images/icon2.svg",
      title:"Electrician"
    },
    {
      id:3,
      image:"/images/icon3.svg",
      title:"Painter"
    },
    {
      id:4,
      image:"/images/icon4.svg",
      title:"Locksmith"
    },
    {
      id:5,
      image:"/images/icon5.svg",
      title:"Tiler"
    },
    {
      id:6,
      image:"/images/icon6.svg",
      title:"Carpenter"
    },
    {
      id:7,
      image:"/images/icon7.png",
      title:"Builder"
    },
    {
      id:8,
      image:"/images/icon1.svg",
      title:"Plumber"
    },
    {
      id:9,
      image:"/images/icon2.svg",
      title:"Electrician"
    },
    {
      id:10,
      image:"/images/icon3.svg",
      title:"Painter"
    },
  ]
  const testi = [
    {
      id:"testi1",
      image:"/images/testi7.png",
      name:"Mickie",
      designation:"L Hotel",
      comment: "It was a pleasure to partner with the team at company name. The candidates they have provided me with are without question professional, experienced, reliable and I have been extremely happy with each candidate we hired through them."
    },
    {
      id:"testi2",
      image:"/images/testi9.png",
      name:"Ali Gilbert",
      designation:"House Wife",
      comment: "It was a pleasure to partner with the team at company name. The candidates they have provided me with are without question professional, experienced, reliable and I have been extremely happy with each candidate we hired through them."
    },
    {
      id:"testi3",
      image:"/images/testi8.webp",
      name:"John Desoza",
      designation:"CEO-Marketing Agnecy",
      comment: "It was a pleasure to partner with the team at company name. The candidates they have provided me with are without question professional, experienced, reliable and I have been extremely happy with each candidate we hired through them."
    },
  ]
  return (
    <>
      <main>
        <section className="banner_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <h1>Your final destination for finding high quality and reliable professionals and artisans</h1>
                <p>Unlock a World of High Skills and Reliability With Wefitwork. We are your  Trusted Partner for Top-Quality Professionals and Artisans!</p>
                <form>
                  <input type="text" className="input" name="" placeholder={"Professional  (eg, Electrician)"} onClick={handleOpenPopup}/>
                  <button type="button" onClick={handleOpenPopup}><img src="/images/search.svg" alt=""/></button>
                </form>
                <div className="most_searched_cat">
                  <p><strong>Most searched categories</strong></p>
                  <div className="flex_cat">
                    <div className="col">
                      <div className="inner">
                        <div className="img_icon">
                          <img src="/images/banner_icon1.svg" alt="" />
                        </div>
                        <h5>Plumber</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="inner">
                        <div className="img_icon">
                          <img src="/images/banner_icon2.svg" alt="" />
                        </div>
                        <h5>Electrician</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="inner">
                        <div className="img_icon">
                          <img src="/images/banner_icon3.svg" alt="" />
                        </div>
                        <h5>Painter</h5>
                      </div>
                    </div>
                    <div className="col">
                      <div className="inner">
                        <div className="img_icon">
                          <img src="/images/banner_icon4.svg" alt="" />
                        </div>
                        <h5>Locksmith</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="colR">
                  <OwlCarousel className="owl-carousel owl-theme"
                            {...option}>
                      <div className="image">
                        <img src="/images/banner1.png" alt="" />
                      </div>
                      <div className="image">
                        <img src="/images/banner2.png" alt="" />
                      </div>
                  </OwlCarousel>
                
              </div>
            </div>
          </div>
        </section>
        <section className="categories_sec">
          <div className="contain">
            <div className="sec_heading">
              <h2>Browse our most popular categories</h2>
            </div>
            <OwlCarousel className="owl-carousel owl-theme" {...categories}>
              {cats.map((val)=>{
                return(
                  <div className="item" key={val.id}>
                    <div className="inner">
                      <div className="icon_img">
                        <img src={val.image} alt={val.title}/>
                      </div>
                      <h5>{val.title}</h5>
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
                    <img src="/images/selected.svg" alt=""/>
                  </div>
                  <h4>Selected</h4>
                  <p>Every WEFITWORK tradesperson has passed up to 12 rigorous checks</p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src="/images/tested.svg" alt=""/>
                  </div>
                  <h4>Tested</h4>
                  <p>Over 6.2 million reviews have been published on WEFITWORK</p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src="/images/confirmed.svg" alt=""/>
                  </div>
                  <h4>Confirmed</h4>
                  <p>We guarantee WEFITWORK tradespeople's work, claim up to £1000 - <Link href="">T&Cs apply</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="how_it_works">
          <div className="contain">
              <div className="sec_heading text-center">
                <h2>How it works</h2>
                <p>If you’d rather not tackle even minor fixes, call a professional for quality plumbing services</p>
              </div>
              {/* <Tabs tabs={tabs} defaultTab={0} /> */}
              <div className="flex_how_work_cstm">
                <div className="col">
                  <div className="inner">
                    <div className="image_new">
                      <img src="/images/corporate-woman-looking-phone.jpg" alt=""/>
                    </div>
                    <div className="cntnt">
                      <h4>Search</h4>
                      <p>If you’d rather not tackle even minor fixes, call a professional for quality plumbing services</p>
                      <div className="btn_blk">
                        <Link href="" className="site_btn">Get Started</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <div className="image_new">
                      <img src="/images/989.png" alt=""/>
                    </div>
                    <div className="cntnt">
                      <h4>Book</h4>
                      <p>If you’d rather not tackle even minor fixes, call a professional for quality plumbing services</p>
                      <div className="btn_blk">
                        <Link href="" className="site_btn">Join Today</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <div className="image_new">
                      <img src="/images/new1.jpg" alt=""/>
                    </div>
                    <div className="cntnt">
                      <h4>Review</h4>
                      <p>If you’d rather not tackle even minor fixes, call a professional for quality plumbing services</p>
                      <div className="btn_blk">
                        <Link href="" className="site_btn">Leave Review</Link>
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
                <h2>What Our Clients Say</h2>
              </div>
              <Testimonials data={testi}/>
          </div>
        </section>
      </main>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <ExploreFrom onClose={handleClosePopup} />
      </Popup>
    </>
  );
}
