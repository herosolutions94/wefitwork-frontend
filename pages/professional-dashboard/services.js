import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import ServicesFaq from "@/components/components/serviceFaq";



export default function Services() {
    const data = {
        faq_list : [
            {
                id: "1",
                title: "Plumber",
                content: "<ul><li>Pipe Installation and Repair</li><li>Sump Pump Installation and Repair</li><li>Emergency Plumbing Services</li><li>Remodeling and Renovation</li><li>Water Filtration and Treatment</li><li>Fixing Low Water Pressure</li><li>Gas Line Services</li><li>Fixture Upgrades</li></ul>",
            },
            {
                id: "2",
                title: "Electrician",
                content: "<ul><li>Pipe Installation and Repair</li><li>Sump Pump Installation and Repair</li><li>Emergency Plumbing Services</li><li>Remodeling and Renovation</li><li>Water Filtration and Treatment</li><li>Fixing Low Water Pressure</li><li>Gas Line Services</li><li>Fixture Upgrades</li></ul>",
            }
        ]
    }
    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <ProfessionalSidebar data={"services"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading service_sec_heading">
                            <h2>Services Offered</h2>
                            <div className="btn_blk">
                                <Link href="add-service" className="site_btn color">Add More</Link>
                            </div>
                        </div>
                        <div className="profile_blk custom_blk">
                            <ServicesFaq data={data}/>
                        </div>
                    </div>
                </div>
            </div>
         </section>
      </main>
      
    </>
  );
}
Services.getLayout = function(page) {
    return <LayoutDashboard>{page}</LayoutDashboard>;
};
