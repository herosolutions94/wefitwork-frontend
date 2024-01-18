import React from "react";
import Link from "next/link";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
import Testimonials from "../components/testimonials";
import http from "../helpers/http";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";

export const getServerSideProps = async () => {
  const result = await http
    .get("about")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function About({result}) {

  let { page_title, meta_desc, content, testimonials} = result;

  return (
    <>
    <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section className="grid_first">
          <div className="contain">
             <div className="flex">
                <div className="colL">
                    <div className="sec_heading">
                        <h1><Text string={content?.sec1_heading} /></h1>
                    </div>
                    <Text string={content?.sec1_detail} />
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                        <Link href={content?.sec1_button1_link} className="site_btn color min_wid">{content?.sec1_button1_text}</Link>
                        <Link href={content?.sec1_button2_link} className="site_btn min_wid">{content?.sec1_button2_text}</Link>
                    </div>
                </div>
                <div className="colR">
                    <div className="image">
                    <Image 
                      src={cmsFileUrl(content?.image1)}
                      width={555}
                      height={444}
                      alt={'about-pic'}
                    />
                        
                    </div>
                </div>
             </div>
          </div>
        </section>
        <section className="values_sec">
            <div className="contain">
                <div className="sec_heading text-center">
                    <h2><Text string={content?.sec2_heading} /></h2>
                    <Text string={content?.sec2_detail} />
                </div>
                <div className="flex">
                    <div className="col">
                        <div className="inner">
                            <div className="img_icon">
                              <Image 
                                src={cmsFileUrl(content?.image2)}
                                width={50}
                                height={50}
                                alt={'icon'}
                              />
                                
                            </div>
                            <div className="cntnt">
                                <h5><Text string={content?.sec2_img_card_heading2} /></h5>
                                <p><Text string={content?.sec2_img_card_tagline2} /></p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                        <div className="img_icon">
                              <Image 
                                src={cmsFileUrl(content?.image3)}
                                width={50}
                                height={50}
                                alt={'icon'}
                              />
                                
                            </div>
                            <div className="cntnt">
                                <h5><Text string={content?.sec2_img_card_heading3} /></h5>
                                <p><Text string={content?.sec2_img_card_tagline3} /></p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                        <div className="img_icon">
                              <Image 
                                src={cmsFileUrl(content?.image4)}
                                width={50}
                                height={50}
                                alt={'icon'}
                              />
                                
                            </div>
                            <div className="cntnt">
                                <h5><Text string={content?.sec2_img_card_heading4} /></h5>
                                <p><Text string={content?.sec2_img_card_tagline4} /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="grid_first white_sec fancy_ul">
          <div className="contain">
             <div className="flex">
                <div className="colL">
                    <div className="image">
                        <Image 
                          src={cmsFileUrl(content?.image5)}
                          width={555}
                          height={444}
                          alt="Why choose us"
                        />
                    </div>
                </div>
                <div className="colR">
                    <div className="sec_heading">
                        <h2><Text string={content?.sec3_heading} /></h2>
                    </div>
                    <Text string={content?.sec3_detail} />
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                        <Link href={content?.sec3_button1_link} className="site_btn min_wid">{content?.sec3_button1_text}</Link>
                    </div>
                </div>
             </div>
          </div>
        </section>
        <section className="team_sec">
          <div className="contain">
            <div className="sec_heading text-center">
              <h2>Our Team</h2>
            </div>
            <div className="flex">
              <div className="col">
                <div className="image">
                  <img src="/images/new1.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Aleena Gilber</h4>
                  <p>Senior Graphics Designer</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new3.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Stefen Disoza</h4>
                  <p>Senior Video Editor</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new2.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Jenifer Kim</h4>
                  <p>Marketing Agency</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new4.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Peter Digber</h4>
                  <p>Marketing Agency</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new1.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Aleena Gilber</h4>
                  <p>Senior Graphics Designer</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new3.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Stefen Disoza</h4>
                  <p>Senior Video Editor</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new2.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Jenifer Kim</h4>
                  <p>Marketing Agency</p>
                </div>
              </div>
              <div className="col">
                <div className="image">
                  <img src="/images/new4.png" alt="" />
                </div>
                <div className="cntnt">
                  <h4>Peter Digber</h4>
                  <p>Marketing Agency</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="cta_sec">
          <div className="contain">
            <div className="cntnt">
              <div className="sec_heading text-center">
                <h2><Text string={content?.sec4_heading} /></h2>
                <Text string={content?.sec4_detail} />
              </div>
              <div className="btn_blk text-center">
                <Link href={content?.sec4_button1_link} className="site_btn color min_wid">{content?.sec4_button1_text}</Link>
                <span>OR</span>
                <Link href={content?.sec4_button2_link} className="site_btn white min_wid">{content?.sec4_button2_text}</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonial_sec">
          <div className="contain">
              <div className="sec_heading text-center">
                <h2><Text string={content?.sec5_heading} /></h2>
              </div>
              <Testimonials data={testimonials}/>
          </div>
        </section>
      </main>
    </>
  );
}
