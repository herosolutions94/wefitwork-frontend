import React, { useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";


export default function MyAccount() {
    
    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <BuyerSidebar data={"account"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>My Account</h2>
                        </div>
                        <div className="profile_blk custom_blk">
                            <form>
                                <div className="from_row row">
                                    <div className="col-sm-12">
                                        <div className="blk_form">
                                            <h6>Email</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="email"
                                                defaultValue="francis@gmail.com"
                                                className="input"
                                                />
                                                <button type="button" className="verfiy_btn">Verfiy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="sec_heading">
                                    <h4>Update Password</h4>
                                </div>
                                <div className="from_row row">
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Current Password</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="current_password"
                                                defaultValue="*****"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>New Password</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="new_password"
                                                defaultValue="*****"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Repeat Password</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="repeat_password"
                                                defaultValue="*****"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="del_account">
                                    <div className="dell_left">
                                        <h5>Delete Account</h5>
                                        <p>Delete your account and all the data</p>
                                    </div>
                                    <div className="btn_blk">
                                        <button type="button" className="site_btn blank blank_red">Delete Account</button>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="btn_blk text-right cell_wide_full">
                                    <button type="submit" className="site_btn">Save changes</button>
                                </div>
                                
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
MyAccount.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
