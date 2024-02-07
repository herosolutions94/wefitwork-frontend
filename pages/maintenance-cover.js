import React from "react";
import Link from "next/link";
import http from "../helpers/http";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import Testimonials from "../components/testimonials";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { authToken } from "../helpers/authToken";
import toast, { Toaster } from "react-hot-toast";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

export default function MaintenanceCover() {
  const pkgs = {
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
const testimonials = [
  {
    id: 1,
    image: '/images/testi1.png',
    detail: 'I am so impressed with the quality of service. The technicians were prompt, skilled, and fixed the issue with my plumbing in no time. Highly recommended!',
    name: 'John Doe',
    designation: 'Homeowner',
  },
  {
    id: 2,
    image: '/images/testi2.png',
    detail: 'The Total Home Protection package has been a lifesaver for me. I never have to worry about home maintenance anymore. Thank you for the excellent service!',
    name: 'Jane Smith',
    designation: 'Property Manager',
  },
];
  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator />

      <main>
        <section
          className="become_professional_banner"
        >
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h1>Comprehensive Maintenance Solutions Just a Click Away!</h1>
                </div>
                <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bene_fits_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h2>Why Choose Our Maintenance Cover?</h2>
                  <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                </div>
              </div>
              <div className="colR">
                  <div className="flex">
                    <div className="col">
                      <div className="image">
                        <img src="/images/24-hour-service.png" alt=""/>
                      </div>
                      <h4>24/7 Support</h4>
                      <p>Our team is ready to assist you anytime, day or night</p>
                    </div>
                    <div className="col">
                      <div className="image">
                        <img src="/images/high-quality.png" alt=""/>
                      </div>
                      <h4>Qualified Professionals</h4>
                      <p>Skilled and certified technicians ensure quality service</p>
                    </div>
                    <div className="col">
                      <div className="image">
                        <img src="/images/peace.png" alt=""/>
                      </div>
                      <h4>Peace of Mind</h4>
                      <p>Enjoy a well-maintained home without the stress of unexpected issues</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
        <section className="maintenance_pkg">
          <div className="contain">
              <div className="sec_heading">
                <h2>Comprehensive Maintenance Cover Packages</h2>
              </div>
              <OwlCarousel {...pkgs} className="owl-carousel owl-theme slide_pkg">
                <div className="col">
                  <div className="inner">
                    <h3>Electrician Services</h3>
                    <h1>$5,00 <sub>per month</sub></h1>
                    <div className="bdy_in">
                      <p>Keep your home in top shape with routine checks and repairs for</p>
                      <ul>
                        <li>Electrical Installation and Wiring</li>
                        <li>Electrical Repairs</li>
                        <li>Safety Inspections</li>
                        <li>Panel Upgrades</li>
                        <li>Lighting Solutions</li>
                      </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href="/detail-maintenance-cover" className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <h3>Plumber Services</h3>
                    <h1>$6,00 <sub>per month</sub></h1>
                    <div className="bdy_in">
                    <p>Experience worry-free living with our Total Home Protection package.</p>
                    <ul>
                      <li>Leak Repairs</li>
                      <li>Drain Cleaning</li>
                      <li>Pipe Installation and Repair</li>
                      <li>Water Heater Services</li>
                      <li>Fixture Installation</li>
                    </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href="/detail-maintenance-cover" className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <h3>Plumber Services</h3>
                    <h1>$4,00 <sub>per month</sub></h1>
                    <div className="bdy_in">
                    <p>Experience worry-free living with our Total Home Protection package.</p>
                    <ul>
                      <li>Custom Woodworking</li>
                      <li>Carpentry Repairs</li>
                      <li>Trim and Molding Installation</li>
                      <li>Deck and Patio Construction</li>
                      <li>Cabinet Installation and Repair</li>
                    </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href="/detail-maintenance-cover" className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <h3>Painter Services</h3>
                    <h1>$4,00 <sub>per month</sub></h1>
                    <div className="bdy_in">
                    <p>Experience worry-free living with our Total Home Protection package.</p>
                    <ul>
                      <li>Interior Painting</li>
                      <li>Exterior Painting</li>
                      <li>Surface Preparation</li>
                      <li>Cabinet and Furniture Painting</li>
                      <li>Special Finishes</li>
                    </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href="/detail-maintenance-cover" className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <h3>Electrician Services</h3>
                    <h1>$5,00 <sub>per month</sub></h1>
                    <div className="bdy_in">
                      <p>Keep your home in top shape with routine checks and repairs for</p>
                      <ul>
                        <li>Electrical Installation and Wiring</li>
                        <li>Electrical Repairs</li>
                        <li>Safety Inspections</li>
                        <li>Panel Upgrades</li>
                        <li>Lighting Solutions</li>
                      </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href="/detail-maintenance-cover" className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="inner">
                    <h3>Plumber Services</h3>
                    <h1>$6,00 <sub>per month</sub></h1>
                    <div className="bdy_in">
                    <p>Experience worry-free living with our Total Home Protection package.</p>
                    <ul>
                      <li>Leak Repairs</li>
                      <li>Drain Cleaning</li>
                      <li>Pipe Installation and Repair</li>
                      <li>Water Heater Services</li>
                      <li>Fixture Installation</li>
                    </ul>
                    </div>
                    <div className="btn_blk">
                      <Link href="/detail-maintenance-cover" className="site_btn">Get Started</Link>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
          </div>
        </section>
        <section className="professional_how_it_works">
          <div className="contain">
            <div className="sec_heading">
              <h2>How It Works</h2>
              <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
            </div>
            <div className="flex">
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src="/images/step5.svg" alt=""/>
                  </div>
                  <h5>
                  Choose Your Package
                  </h5>
                  <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src="/images/step6.svg" alt=""/>
                  </div>
                  <h5>
                  Custom Maintenance Request (if applicable)
                  </h5>
                  <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src="/images/step3.svg" alt=""/>
                  </div>
                  <h5>
                  Our Professionals at Your Doorstep
                  </h5>
                  <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="img_icon">
                    <img src="/images/step8.svg" alt=""/>
                  </div>
                  <h5>
                  Enjoy a Well-Maintained Home!
                  </h5>
                  <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="new_sec_main">
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="image">
                  <img src="/images/choose.png" alt=""/>
                </div>
              </div>
              <div className="colR">
                <div className="inner">
                  <div className="sec_heading">
                    <h2>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</h2>
                    <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                  </div>
                  <p>Whether you specialize in home repairs, creative services, event planning, fitness, or anything in between, Shapperly gives you the tools to promote your business and connect with your perfect customers.</p>
                  <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
                  <p>Whether you specialize in home repairs, creative services, event planning, fitness, or anything in between, Shapperly gives you the tools to promote your business and connect with your perfect customers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="testimonial_sec">
          <div className="contain">
            <div className="sec_heading text-center">
              <h2>What Our Clients Say</h2>
            </div>
            <Testimonials data={testimonials} />
          </div>
        </section>
      </main>
    </>
  );
}
