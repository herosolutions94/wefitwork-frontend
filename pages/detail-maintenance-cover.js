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
import Faq from "../components/faq";

export default function DetailMaintenanceCover() {
  const data = {
  faq_list : [
    {
      id:"1",
      title:"What types of electrical installations do electricians handle?",
      content:"Electricians handle various installations, including wiring for new constructions, lighting fixtures, outlets, and electrical panels."
    },
    {
      id:"2",
      title:"How can I identify electrical issues that require repair?",
      content:"Look out for signs such as flickering lights, tripped circuit breakers, or burning odors. Any unusual behavior with your electrical system may indicate a problem."
    },
    {
      id:"3",
      title:"Do electricians offer emergency services?",
      content:"Many electricians provide emergency services for urgent issues such as power outages, electrical malfunctions, or safety concerns."
    },
    {
      id:"4",
      title:"What is involved in a safety inspection by an electrician?",
      content:"Safety inspections involve a thorough examination of your electrical system to identify potential hazards, ensure compliance with codes, and recommend improvements."
    },
    {
      id:"5",
      title:"When should I consider a panel upgrade?",
      content:"Consider a panel upgrade if you're experiencing frequent tripped breakers, outdated electrical panels, or if you're adding new appliances that require additional power."
    },
    {
      id:"6",
      title:"Can electricians assist with energy-efficient lighting solutions?",
      content:"Yes, electricians can help you upgrade to energy-efficient lighting, such as LED installations, to reduce energy consumption and lower utility bills."
    },
    {
      id:"7",
      title:"What types of electrical repairs do electricians commonly handle?",
      content:"Electricians can address a wide range of repairs, including fixing faulty wiring, repairing outlets, and resolving issues with circuit breakers."
    },
    {
      id:"8",
      title:"How do I choose the right electrical service for my home or business?",
      content:"Consider the specific needs of your property, the expertise of the electrician, and any recommendations for improvements or upgrades they may provide."
    },
    {
      id:"9",
      title:"Are electricians licensed and insured?",
      content:"Yes, reputable electricians are typically licensed and insured. It's important to verify their credentials to ensure quality and safety."
    },
  ]
  }
  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator />

      <main>
        <section
          className="new_become_professional_banner"
        >
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h1>Electrical Installation and Wiring</h1>
                </div>
                <p>Your Home Deserves the Best Care: Introducing Our Comprehensive Maintenance Solutions!</p>
              </div>
              <div className="colR">
                <div className="inner">
                        <h1>$5,00</h1>
                        <p>a month in your first year</p>
                        <div className="mini_br"></div>
                        <div className="bdy_in">
                            <h4>Annual price :	$40</h4>
                            <h4>Your excess :	$50</h4>
                            <div className="mini_br"></div>
                            <p>Your price will increase at renewal, but you’ll always receive a reminder. If you choose to continue into your second year, the expected price for customers who haven’t made a claim is $560 a month* ($560 for the year).</p>
                        </div>
                        <div className="mini_br"></div>
                        <div className="btn_blk">
                          <Link href="" className="site_btn block">Buy Now</Link>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </section>
        <section className="difference_maintenance_sec">
            <div className="contain">
                <div className="sec_heading text-center">
                    <h2>Electrician Services Overview</h2>
                    <p>Specialized service often provided by experts in smart home technology</p>
                </div>
                <div className="custom_owned flex">
                    <div className="col">
                        <div className="inner">
                            <h4>Included</h4>
                            <ul>
                                <li>Electrical Installation and Wiring</li>
                                <li>Electrical Repairs</li>
                                <li>Safety Inspections</li>
                                <li>Panel Upgrades</li>
                                <li>Lighting Solutions</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <h4>Excluded</h4>
                            <ul>
                                <li>Appliance Repair: (This may be a separate service, handled by appliance technicians.)</li>
                                <li>Home Automation Installation: (Specialized service often provided by experts in smart home technology.)</li>
                                <li>Generator Installation: (Requires specialized knowledge in generators and backup power systems.)</li>
                                <li>Security System Installation: (Typically handled by security system professionals.)</li>
                                <li>HVAC System Electrical Work: (Part of a broader service offered by HVAC technicians.)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="mini_banner">
          <div className="contain">
            <div className="top_heading sec_heading text-center">
              <h2>Remove the stress and cost of unexpected electrics problems...</h2>
              <p>Contact us for all your electrical needs. Our experts are ready to assist you!</p>
            </div>
            <div className="inner_banner">
              <div className="cntnt">
                <div className="sec_heading">
                  <h2>Ready to get started?</h2>
                  <p>Contact us for all your electrical needs. Our experts are ready to assist you!</p>
                </div>
                <div className="mini_br"></div>
                <div className="btn_blk">
                  <Link href="" className="site_btn">Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="_faq_sec">
          <div className="contain">
              <div className="sec_heading">
                <h2>Frequently Asked Questions (FAQs) about Electrician Services</h2>
                <p>Explore the following frequently asked questions to gain a better understanding of the services provided by electricians. Whether you're looking for information about installations, repairs, or safety inspections, these FAQs cover key aspects to help you make informed decisions for your electrical needs.</p>
              </div>
              <Faq data={data} />
          </div>
        </section>
        <section className="question_new_sec">
            <div className="contain">
                <div className="question_new flex">
                    <div className="col">
                        <div className="inner">
                            <h4>Looking for something different?</h4>
                            <p>We offer a range of options, so you can pick the one that works for you</p>
                            <div className="mini_br"></div>
                            <div className="btn_blk">
                              <Link href="/maintenance-cover" className="site_btn color block">Find the Right Service</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <h4>Unsure about something?</h4>
                            <p>No problem! <em>We’re always happy to help</em></p>
                            <div className="mini_br"></div>
                            <div className="btn_blk">
                              <Link href="/contact" className="site_btn block">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
