import React, { useRef, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";


export default function BookingDetails() {
    
    const [isYesSelected, setIsYesSelected] = useState(false);

    const handleYesClick = () => {
        setIsYesSelected(true);
    };

    const handleNoClick = () => {
        setIsYesSelected(false);
    };
    const [isYesSelectedTwo, setIsYesSelectedTwo] = useState(false);

    const handleYesClickTwo = () => {
        setIsYesSelectedTwo(true);
    };

    const handleNoClickTwo = () => {
        setIsYesSelectedTwo(false);
    };
  return (
    <>
      <main>
         <section className="dashboard professional_details">
            <div className="contain">
                <div className="professiona_view_tile">
                    <div className="col custom_blk">
                        <h4 className="color">Choosed Service</h4>
                        <h6>Plumber, Sewer Line Repair</h6>
                        <div className="mini_br"></div>
                        <div className="address_booking"><img src="/images/MapPin.svg" alt=""/><span>4346 Abelardo Ford Apt. 483, Connecticut, UK</span></div>
                        <div className="br"></div>
                        <h4 className="color">Work Scope</h4>
                        <p>Addressing issues with the main sewer line is crucial to prevent sewage backups and maintain proper sanitation. Plumbers install, repair, or replace gas lines for appliances like stoves, ovens, and water heaters. Plumbers can install water filtration systems to improve water quality or address specific water treatment needs. Plumbers can install water filtration systems to improve water quality or address specific water treatment needs. They install and maintain backflow prevention devices to ensure that contaminated water does not enter the clean water supply.</p>
                    </div>
                    <div className="col custom_blk">
                        <div className="action_buttons">
                            <button type="button" className="like_btn">
                                <img src="/images/heart.svg" alt="save" />
                            </button>
                            <button type="button" className="share_btn">
                                <img src="/images/ShareNetwork.svg" alt="save" />
                            </button>
                        </div>
                        <div className="inner">
                            <div className="head_professional">
                                <div className="image">
                                    <img src="/images/pro3.png" alt="Thomas Alenjery"/>
                                </div>
                                <div className="cntnt">
                                    <h4>Thomas Alenjery</h4>
                                    <div className="rating_lbl">
                                        <img src="/images/star.svg" alt=""/>
                                        <span>5.0 (10 Reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="done_work">
                                <p>Projects Completed</p>
                                <h3>3</h3>
                            </div>
                            <div className="done_work">
                                <p>Specialization</p>
                                <h3>Commercial & Residential</h3>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col custom_blk">
                        <ul className="booking_ul">
                            <li>
                                <div className="ques">
                                    <h4>Have <em>Thomas Alenjery</em> Contacted you?</h4>
                                </div>
                                <div className="button-container">
                                    <button onClick={handleYesClick} className={isYesSelected ? 'active' : ''}>
                                    Yes
                                    </button>
                                    <button onClick={handleNoClick} className={!isYesSelected ? 'active' : ''}>
                                    No
                                    </button>
                                </div>
                            </li>

                            <li>
                                <div className="ques">
                                    <h4>Have you hired <em>Thomas Alenjery</em> ?</h4>
                                </div>
                                <div className="button-container">
                                    <button onClick={handleYesClickTwo} className={isYesSelectedTwo ? 'active' : ''}>
                                    Yes
                                    </button>
                                    <button onClick={handleNoClickTwo} className={!isYesSelectedTwo ? 'active' : ''}>
                                    No
                                    </button>
                                </div>
                            </li>
                        </ul>
                        <div className="br"></div><div className="br"></div>
                        <div className="btn_blk text-center">
                            <Link href="leave-review" className="site_btn">Leave Review</Link>
                        </div>
                    </div>
                </div>
            </div>
         </section>
      </main>
      
    </>
  );
}
BookingDetails.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
