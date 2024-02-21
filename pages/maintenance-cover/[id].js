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
import Faq from "@/components/components/faq";
import {parse} from "cookie";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const m_id = encrypt_decrypt('decrypt', id)

  const { req } = context;
  const cookieHeader = req.headers.cookie || "";
  // Parse the cookie header to extract the specific cookie value
  const cookieValue = parse(cookieHeader);
  const authToken = cookieValue["authToken"] !== undefined && cookieValue["authToken"] !== null && cookieValue["authToken"] !== "" ? cookieValue["authToken"] : null;

  const result = await http
    .post(`maintenance-cover-detail/${m_id}`, doObjToFormData({token: authToken}))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function DetailMaintenanceCover({result}) {

  // console.log(result);
  let {
    page_title,
    meta_desc,
    mc_content,
    maintenance_cover,
    excluded,
    included,
    faqs,
    memData,
  } = result;

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
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section
          className="new_become_professional_banner"
        >
          <div className="contain">
            <div className="flex">
              <div className="colL">
                <div className="sec_heading">
                  <h1><Text string={maintenance_cover?.title} /></h1>
                </div>
                <p><Text string={maintenance_cover?.short_desc} /></p>
              </div>
              <div className="colR">
                <div className="inner">
                        <h1>{format_amount_comma(parseFloat(maintenance_cover?.price))}</h1>
                        <p>{maintenance_cover?.interval == 'monthly' && 'Per Month'}{maintenance_cover?.interval == 'yearly' && 'Per Year'}</p>
                        <div className="mini_br"></div>
                        <div className="bdy_in">
                            {/* <h4>Annual price :	$40</h4>
                            <h4>Your excess :	$50</h4> */}
                            <div className="mini_br"></div>
                           <Text string={maintenance_cover?.detail} />
                        </div>
                        <div className="mini_br"></div>
                        <div className="btn_blk">
                          <Link href={`/checkout/${encrypt_decrypt('encrypt', maintenance_cover?.id)}`} className="site_btn block">Buy Now</Link>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </section>
        <section className="difference_maintenance_sec">
            <div className="contain">
                <div className="sec_heading text-center">
                    <h2><Text string={mc_content?.sec2_heading} /></h2>
                    <p><Text string={mc_content?.sec2_tagline} /></p>
                </div>
                <div className="custom_owned flex">
                    <div className="col">
                        <div className="inner">
                            <h4>Included</h4>
                            <ul>
                            {included?.map((inc) => {
                              return (
                                <li key={inc?.id}><Text string={inc?.title} /></li>
                              )
                            })}
                                
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <h4>Excluded</h4>
                            <ul>
                            {excluded?.map((exc) => {
                              return (
                                <li key={exc?.id}><Text string={exc?.title} /></li>
                              )
                            })}
                                
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="mini_banner">
          <div className="contain">
            <div className="top_heading sec_heading text-center">
              <h2><Text string={mc_content?.sec3_heading} /></h2>
              <p><Text string={mc_content?.sec3_tagline} /></p>
            </div>
            <div className="inner_banner">
              <div className="cntnt">
                <div className="sec_heading">
                  <h2><Text string={mc_content?.sec3_heading2} /></h2>
                  <p><Text string={mc_content?.sec3_tagline2} /></p>
                </div>
                <div className="mini_br"></div>
                <div className="btn_blk">
                  <Link href={`/checkout/${encrypt_decrypt('encrypt', maintenance_cover?.id)}`} className="site_btn"><Text string={mc_content?.sec3_button1_text} /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="_faq_sec">
          <div className="contain">
              <div className="sec_heading">
                <h2><Text string={mc_content?.sec4_heading} /></h2>
                <Text string={mc_content?.sec4_detail} />
              </div>
              <Faq data={faqs} />
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
