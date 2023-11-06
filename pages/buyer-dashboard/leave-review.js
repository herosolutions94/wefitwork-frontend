import React, { useRef, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import ReactStars from "react-stars";


export default function LeaveReview() {
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedRatingQuality, setSelectedRatingQuality] = useState(null);
    const [selectedRatingTidiness, setSelectedRatingTidiness] = useState(null);
    const [selectedRatingCourtesy, setSelectedRatingCourtesy] = useState(null);
    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };
    const handleRatingQualityClick = (rating) => {
        setSelectedRatingQuality(rating);
    };
    const handleRatingTidinessClick = (rating) => {
        setSelectedRatingTidiness(rating);
    };
    const handleRatingCourtesyClick = (rating) => {
        setSelectedRatingCourtesy(rating);
    };

    const [isYesSelected, setIsYesSelected] = useState(false);

    const handleYesClick = () => {
        setIsYesSelected(true);
    };

    const handleNoClick = () => {
        setIsYesSelected(false);
    };

    const fileRef = useRef(null);
    const handleClick = () => {
        fileRef.current.click();
      };
    const handleSelected = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          console.log('Selected file:', selectedFile.name);
        }
      };

    const number = [
        {
            rate :1
        },
        {
            rate :2
        },
        {
            rate :3
        },
        {
            rate :4
        },
        {
            rate :5
        },
        {
            rate :6
        },
        {
            rate :7
        },
        {
            rate :8
        },
        {
            rate :9
        },
        {
            rate :10
        },
    ]
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
                        <div className="sec_heading">
                            <h4>How would you rate the experience?</h4>
                        </div>
                        <div className="rate_check">
                            <p>1 = Terrible, 10 = Excellent</p>
                            <ul>
                                <li>
                                    <h6>Reliability & timekeeping</h6>
                                    <div className="btn_blk">
                                        {number.map((rating)=>{
                                            return(
                                                <button type="button"
                                                key={rating.rate}
                                                onClick={() => handleRatingClick(rating.rate)}
                                                className={rating.rate === selectedRating ? "site_btn blank active" : "site_btn blank"}
                                                >
                                                {rating.rate}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="lbl_btn">
                                        <input type="checkbox" name="reliablitiy_timekeeping" id="reliablitiy_timekeeping_not_applicable"/>
                                        <label htmlFor="reliablitiy_timekeeping_not_applicable">Not Applicable</label>
                                    </div>
                                </li>
                                <li>
                                    <h6>Quality of workmanship</h6>
                                    <div className="btn_blk">
                                        {number.map((rating)=>{
                                            return(
                                                <button type="button"
                                                key={rating.rate}
                                                onClick={() => handleRatingQualityClick(rating.rate)}
                                                className={rating.rate === selectedRatingQuality ? "site_btn blank active" : "site_btn blank"}
                                                >
                                                {rating.rate}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="lbl_btn">
                                        <input type="checkbox" name="quality_workmanship" id="quality_workmanship_not_applicable"/>
                                        <label htmlFor="quality_workmanship_not_applicable">Not Applicable</label>
                                    </div>
                                </li>
                                <li>
                                    <h6>Tidiness</h6>
                                    <div className="btn_blk">
                                        {number.map((rating)=>{
                                            return(
                                                <button type="button"
                                                key={rating.rate}
                                                onClick={() => handleRatingTidinessClick(rating.rate)}
                                                className={rating.rate === selectedRatingTidiness ? "site_btn blank active" : "site_btn blank"}
                                                >
                                                {rating.rate}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="lbl_btn">
                                        <input type="checkbox" name="Tidiness" id="Tidiness_not_applicable"/>
                                        <label htmlFor="Tidiness_not_applicable">Not Applicable</label>
                                    </div>
                                </li>
                                <li>
                                    <h6>Courtesy</h6>
                                    <div className="btn_blk">
                                        {number.map((rating)=>{
                                            return(
                                                <button type="button"
                                                key={rating.rate}
                                                onClick={() => handleRatingCourtesyClick(rating.rate)}
                                                className={rating.rate === selectedRatingCourtesy ? "site_btn blank active" : "site_btn blank"}
                                                >
                                                {rating.rate}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="lbl_btn">
                                        <input type="checkbox" name="Courtesy" id="Courtesy_not_applicable"/>
                                        <label htmlFor="Courtesy_not_applicable">Not Applicable</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="br"></div>
                        <div>
                            <div className="sec_heading">
                                <h4>Work Scope</h4>
                            </div>
                            <textarea name="workscope" className="input" placeholder="Write your work scope"></textarea>
                        </div>
                        <div className="br"></div>
                        <div>
                            <h4>Your Rating</h4>
                            <ReactStars
                            className="rates"
                            count={5}
                            value={0}
                            size={24}
                            color1={'#717171'}
                            color2={'#FF3D3D'}/>
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
                        <div className="br"></div>
                        <div>
                            <div className="sec_heading">
                                <h4>Please share with us proof of work</h4>
                            </div>
                            <button className="site_btn color upload_file_blk" type="button" onClick={handleClick}>
                                <img src="/images/Camera.svg" alt=""/>
                            </button>
                            <input
                                    type="file"
                                    ref={fileRef}
                                    style={{ display: 'none' }}
                                    onChange={handleSelected}
                                />
                        </div>
                        <div className="br"></div>
                        <div className="profile_grid_edit scrollbar">
                            <div className="flex">
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img src="/images/portfolio1.png" alt=""/>
                                        <button className="x_btn" type="button"></button>
                                    </div>
                                </div>
                                <div className="img_col">
                                    <div className="inner_img">
                                        <img src="/images/portfolio2.png" alt=""/>
                                        <button className="x_btn" type="button"></button>
                                    </div>
                                </div>
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
LeaveReview.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
