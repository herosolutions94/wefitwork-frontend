import React from "react";
import Link from "next/link";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), {ssr: false});
import Testimonials from "../components/testimonials";

export default function About() {
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
        <section className="grid_first">
          <div className="contain">
             <div className="flex">
                <div className="colL">
                    <div className="sec_heading">
                        <h1>About us</h1>
                    </div>
                    <p>At WEFITWORK, we started with a simple idea: to create a user-friendly platform that makes it effortless for homeowners to find and book service providers.</p>
                    <p>It all began when John doe encountered the challenges of finding reliable professionals for their own home projects.</p>
                    <p>This inspired us to create a solution that bridges the gap between homeowners and service experts.</p>
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                        <Link href="" className="site_btn color min_wid">Explore Service Providers</Link>
                        <Link href="" className="site_btn min_wid">Become a Professional</Link>
                    </div>
                </div>
                <div className="colR">
                    <div className="image">
                        <img src="/images/about.png" alt="about" />
                    </div>
                </div>
             </div>
          </div>
        </section>
        <section className="values_sec">
            <div className="contain">
                <div className="sec_heading text-center">
                    <h2>Our values</h2>
                    <p>We believe in transparency, and we're committed to providing you with a platform you can trust. Your convenience and peace of mind are our top priorities.</p>
                </div>
                <div className="flex">
                    <div className="col">
                        <div className="inner">
                            <div className="img_icon">
                                <img src="/images/value1.svg" alt=""/>
                            </div>
                            <div className="cntnt">
                                <h5>INTEGRITY</h5>
                                <p>Your convenience and peace of mind are our top priorities.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <div className="img_icon">
                                <img src="/images/value2.svg" alt=""/>
                            </div>
                            <div className="cntnt">
                                <h5>RELIABILITY</h5>
                                <p>Your convenience and peace of mind are our top priorities.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <div className="img_icon">
                                <img src="/images/value3.svg" alt=""/>
                            </div>
                            <div className="cntnt">
                                <h5>CUSTOMER SATISFACTION</h5>
                                <p>Your convenience and peace of mind are our top priorities.</p>
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
                        <img src="/images/choose.png" alt="Why choose us" />
                    </div>
                </div>
                <div className="colR">
                    <div className="sec_heading">
                        <h2>Why choose us</h2>
                    </div>
                    <p>We believe in transparency, and we're committed to providing you with a platform you can trust. Your convenience and peace of mind are our top priorities.</p>
                    <ul>
                        <li>WEFITWORK is designed with your needs in mind, offering a user-friendly experience.</li>
                        <li>Our extensive network of professionals ensures you find the right expert for your project.</li>
                        <li>We offer real-time communication, enabling you to chat with professionals and book them with ease.</li>
                        <li>Enjoy the convenience of finding, booking, and communicating with service providers in one place.</li>
                    </ul>
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                        <Link href="" className="site_btn min_wid">Explore Service Providers</Link>
                    </div>
                </div>
             </div>
          </div>
        </section>
        <section className="cta_sec">
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
        </section>
        <section className="testimonial_sec">
          <div className="contain">
              <div className="sec_heading text-center">
                <h2>What Our Clients Say</h2>
              </div>
              <Testimonials data={testi}/>
          </div>
        </section>
      </main>
    </>
  );
}
