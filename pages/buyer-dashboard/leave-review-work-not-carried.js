import React, { useRef, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";


export default function LeaveReviewWorkNotCarried() {

    const [isYesSelected, setIsYesSelected] = useState(false);

    const handleYesClick = () => {
        setIsYesSelected(true);
    };

    const handleNoClick = () => {
        setIsYesSelected(false);
    };

    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="rate_review_dash_blk custom_blk">
                    <div className="sec_heading">
                        <h2>Rate and Review</h2>
                    </div>
                    <div className="rating_person">
                        <div className="icon_img">
                            <img src="/images/pro1.png" alt=""/>
                        </div>
                        <div className="cntnt">
                            <h5>John Gilbert</h5>
                            <p>Carpentry Repairs, Framing..</p>
                        </div>
                    </div>
                    <div className="br"></div>
                    <form>
                        <div className="br"></div>
                        <div>
                            <div className="sec_heading">
                                <h4>Work Scope</h4>
                            </div>
                            <textarea name="workscope" className="input" placeholder="Write your work scope"></textarea>
                        </div>
                        <div className="br"></div>
                        <div>
                            <div className="sec_heading">
                                <h4>Your Review</h4>
                            </div>
                            <textarea name="review" className="input" placeholder="Share details of your own experience"></textarea>
                        </div>
                        <div className="br"></div>
                        <div>
                            <div className="sec_heading">
                                <h4>Would you recommend this tradesperson?</h4>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={handleYesClick} className={isYesSelected ? 'active' : ''}>
                                Yes
                                </button>
                                <button type="button" onClick={handleNoClick} className={!isYesSelected ? 'active' : ''}>
                                No
                                </button>
                            </div>
                        </div>
                        <div className="br"></div><div className="br"></div>
                        <div className="btn_blk text-center">
                            <button type="submit" className="site_btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
         </section>
      </main>
    </>
  );
}
LeaveReviewWorkNotCarried.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
