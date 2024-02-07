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

export default function DetailMaintenanceCover() {
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
      </main>
    </>
  );
}
