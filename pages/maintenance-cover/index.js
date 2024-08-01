import React from "react";
import Link from "next/link";
import http from "@/components/helpers/http";
import Text from "@/components/components/text";
import MetaGenerator from "@/components/components/meta-generator";
import Testimonials from "@/components/components/testimonials";
import { cmsFileUrl, doObjToFormData, format_amount_comma } from "@/components/helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { authToken } from "@/components/helpers/authToken";
import toast, { Toaster } from "react-hot-toast";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

import {parse} from "cookie";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookieHeader = req.headers.cookie || "";
  // Parse the cookie header to extract the specific cookie value
  const cookieValue = parse(cookieHeader);
  const authToken = cookieValue["authToken"] !== undefined && cookieValue["authToken"] !== null && cookieValue["authToken"] !== "" ? cookieValue["authToken"] : null;
 
  const result = await http
    .post("maintenance-covers", doObjToFormData({token : authToken}))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);
  return { props: { result } };
};

export default function MaintenanceCover({result}) {
  console.log(result);

  let {
    page_title,
    meta_desc,
    content,
    maintenance_covers,
    testimonials,
    how_works
  } = result;

  const pkgs = {
    margin: 20,
    autoplay: false,
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
        items: 1,
      },
      580: {
        items: 2,
      },
      991: {
        items: 2,
      },
      1200: {
        items: 3,
      },
      1600: {
        items: 3,
      },
    },
  };

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section
          className="become_professional_banner"
        >
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h1><Text string={content?.sec1_heading} /></h1>
                </div>
                <Text string={content?.sec1_detail} />
              </div>
            </div>
          </div>
        </section>
        <section className="bene_fits_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h2><Text string={content?.sec2_heading} /></h2>
                  <Text string={content?.sec2_detail} />
                </div>
              </div>
              <div className="colR">
                  <div className="flex">
                    <div className="col">
                      <div className="image">
                        <img src={cmsFileUrl(content?.image2)} alt=""/>
                      </div>
                      <h4><Text string={content?.sec2_img_card_heading2} /></h4>
                      <p><Text string={content?.sec2_img_card_tagline2} /></p>
                    </div>
                    <div className="col">
                      <div className="image">
                        <img src={cmsFileUrl(content?.image3)} alt=""/>
                      </div>
                      <h4><Text string={content?.sec2_img_card_heading3} /></h4>
                      <p><Text string={content?.sec2_img_card_tagline3} /></p>
                    </div>
                    <div className="col">
                      <div className="image">
                        <img src={cmsFileUrl(content?.image4)} alt=""/>
                      </div>
                      <h4><Text string={content?.sec2_img_card_heading4} /></h4>
                      <p><Text string={content?.sec2_img_card_tagline4} /></p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <section className="maintenance_pkg">
          <div className="contain">
              <div className="sec_heading">
                <h2><Text string={content?.sec3_heading} /></h2>
              </div>
              <OwlCarousel {...pkgs} className="owl-carousel owl-theme slide_pkg">
              {maintenance_covers?.map((main, m) => {
                return (
                  <div className="col" key={main?.id}>
                  <div className="inner">
                    <h3><Text string={main?.service_title} /></h3>
                    <h1>{format_amount_comma(parseFloat(main?.price))} <sub>{main?.interval == 'monthly' && "Per Month"} {main?.interval == 'yearly' && "Per Year"}</sub></h1>
                    <div className="bdy_in">
                      <p><Text string={main?.short_desc} /></p>
                      <ul>
                      {main?.included?.map((inc, i) => {
                        return (
                          <li key={inc?.id}>{inc?.title}</li>

                        )
                      })}
                        
                      </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href={`/maintenance-cover/${encrypt_decrypt("encrypt", main?.id)}`} className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
                )
              })}
               
              </OwlCarousel>
          </div>
        </section>
        <section className="professional_how_it_works">
          <div className="contain">
            <div className="sec_heading">
              <h2><Text string={content?.sec4_heading} /></h2>
              <Text string={content?.sec4_detail} />
            </div>
            <div className="flex">
            {how_works?.map((hw, i) => {
              return (
                <div className="col" key={hw?.id}>
                <div className="inner">
                  <div className="img_icon">
                    <img src={cmsFileUrl(hw?.image)} alt=""/>
                  </div>
                  <h5>
                  <Text string={hw?.title} />
                  </h5>
                  <p><Text string={hw?.txt1} /></p>
                </div>
              </div>
              )
            })}
             
            </div>
          </div>
        </section>
        <section className="new_sec_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="image">
                  <img src={cmsFileUrl(content?.image5)} alt="--"/>
                </div>
              </div>
              <div className="colR">
                <div className="inner">
                  <div className="sec_heading">
                    <h2><Text string={content?.sec5_heading} /></h2>
                    
                  </div>
                  <Text string={content?.sec5_detail} />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="testimonial_sec">
          <div className="contain">
            <div className="sec_heading text-center">
              <h2><Text string={content?.sec6_heading} /></h2>
            </div>
            <Testimonials data={testimonials} />
          </div>
        </section>
      </main>
    </>
  );
}
