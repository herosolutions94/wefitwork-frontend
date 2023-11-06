import React, { useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";


export default function Bookings() {
    
    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <BuyerSidebar data={"bookings"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>My Bookings</h2>
                        </div>
                        {/* =====loop start============== */}
                        <div className="contract_list custom_blk booking_page_list">
                            <div className="col col_l">
                                <div className="user_info">
                                <div className="dp_icon">
                                    <img src="/images/pro4.png" alt=""/>
                                </div>
                                <div className="cntnt">
                                    <h5>John Doe</h5>
                                </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="inner">
                                <p><small>Date</small></p>
                                <p><strong>Feb 26,2023</strong></p>
                                </div>
                            </div>
                            <div className="col col_l">
                                <div className="inner">
                                <p><small>Service</small></p>
                                <p><strong>Pipe Installation and Repair</strong></p>
                                </div>
                            </div>
                            <div className="col col_s">
                                <div className="inner text-right">
                                <Link href="booking-details">View</Link>
                                </div>
                            </div>
                            
                        </div>
                        {/* =============end loop====== */}
                        <div className="contract_list custom_blk booking_page_list">
                            <div className="col col_l">
                                <div className="user_info">
                                <div className="dp_icon">
                                    <img src="/images/pro3.png" alt=""/>
                                </div>
                                <div className="cntnt">
                                    <h5>Stefen Gilbert</h5>
                                </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="inner">
                                <p><small>Date</small></p>
                                <p><strong>Feb 28,2023</strong></p>
                                </div>
                            </div>
                            <div className="col col_l">
                                <div className="inner">
                                <p><small>Service</small></p>
                                <p><strong>Electrician</strong></p>
                                </div>
                            </div>
                            <div className="col col_s">
                                <div className="inner text-right">
                                <Link href="booking-details">View</Link>
                                </div>
                            </div>
                            
                        </div>
                        <div className="contract_list custom_blk booking_page_list">
                            <div className="col col_l">
                                <div className="user_info">
                                <div className="dp_icon">
                                    <img src="/images/pro2.png" alt=""/>
                                </div>
                                <div className="cntnt">
                                    <h5>Alfred Disoza</h5>
                                </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="inner">
                                <p><small>Date</small></p>
                                <p><strong>Feb 28,2023</strong></p>
                                </div>
                            </div>
                            <div className="col col_l">
                                <div className="inner">
                                <p><small>Service</small></p>
                                <p><strong>Roofing</strong></p>
                                </div>
                            </div>
                            <div className="col col_s">
                                <div className="inner text-right">
                                <Link href="booking-details">View</Link>
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
Bookings.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
