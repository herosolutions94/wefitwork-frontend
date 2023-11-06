import React, { useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";


export default function ProfileSettings() {
    const fileDpRef = useRef(null);
    const handleDpClick = () => {
        fileDpRef.current.click();
      };
    const handleDpSelected = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          console.log('Selected file:', selectedFile.name);
        }
      };
    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <BuyerSidebar data={"profile"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>Profile</h2>
                        </div>
                        <div className="profile_blk custom_blk">
                            <form>
                                <p><strong>Profile Dp</strong></p>
                                <div className="dp_flex">
                                    <div className="dp_icon">
                                        <img src="/images/user_icon.svg" alt="" />
                                    </div>
                                    <div className="btn_blk">
                                        <button className="site_btn color" type="button" onClick={handleDpClick}>Upload</button>
                                        <button className="site_btn blank blue_blank" type="button">Remove</button>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="from_row row">
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Display Name <span>(Visible to others)</span></h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="display_name"
                                                defaultValue="Francis"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Name <span> (Your given name)</span></h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="name"
                                                defaultValue="Francis Heather"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Phone Number</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="phone"
                                                defaultValue="+1 414-266-9847"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-12">
                                        <div className="blk_form">
                                            <h6>Address</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="address"
                                                defaultValue="42 Lagos Street, Abuja, Nigeria, 12345"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="br"></div>
                                <div className="btn_blk text-right cell_wide_full">
                                    <button type="submit" className="site_btn">Save changes</button>
                                </div>
                                
                                <input
                                    type="file"
                                    ref={fileDpRef}
                                    style={{ display: 'none' }}
                                    onChange={handleDpSelected}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </section>
      </main>
      
    </>
  );
}
ProfileSettings.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
