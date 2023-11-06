import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";


export default function Subscription() {
    
    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <ProfessionalSidebar data={"subscription"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>Subscription</h2>
                        </div>
                        <div className="profile_blk custom_blk">
                            <div className="subscription_block_dash">
                                <p>Contact at <Link href="">+324-434-2343</Link> or <Link href="">wefitwork@gmail.com</Link>  </p>
                                <div className="out_flex_subs">
                                    <div className="flex_subs">
                                        <div>User</div>
                                        <div>License</div>
                                    </div>
                                    <div className="flex_subs">
                                        <div>Aleena Gilbert</div>
                                        <div>₦1000 per month.</div>
                                    </div>
                                </div>
                                <div className="membership_card">
                                    <div className="inner_membership">
                                        <div className="mini_pro">
                                            <img src="/images/pro_membership.svg" alt="" />
                                            <span>PRO</span>
                                        </div>
                                        <div className="price_head">
                                            <h2>₦1000 <span>per Month</span></h2>
                                        </div>
                                        <p>Reset on 28 Sep 2024 | 04:59 GMT+5</p>
                                        <div className="btn_blk">
                                            <button type="submit" className="site_btn block white">Upgrade Now</button>
                                        </div>
                                    </div>
                                </div>
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
Subscription.getLayout = function(page) {
    return <LayoutDashboard>{page}</LayoutDashboard>;
};
