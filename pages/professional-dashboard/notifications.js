import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";


export default function Notifications() {
  
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <ProfessionalSidebar data={"notifications"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>Notifications</h2>
                        </div>
                        <div className="notification_blk custom_blk">
                            <div className="list_inner_notify">
                                <div className="user_info">
                                    <div className="dp_icon">
                                        <img src="/images/mini_user.svg" alt=""/>
                                    </div>
                                    <div className="cntnt">
                                        <p><Link href="">Meg Griffin has left you a review. Both of your reviews from this trip are now public.</Link></p>
                                        <div className="time_out">March 1, 2023</div>
                                    </div>
                                </div>
                                <button className="x_btn" type="button"></button>
                            </div>
                            <div className="list_inner_notify">
                                <div className="user_info">
                                    <div className="dp_icon">
                                        <img src="/images/testi3.png" alt=""/>
                                    </div>
                                    <div className="cntnt">
                                        <p><Link href="">Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.</Link></p>
                                        <div className="time_out">March 1, 2023</div>
                                    </div>
                                </div>
                                <button className="x_btn" type="button"></button>
                            </div>
                            <div className="list_inner_notify">
                                <div className="user_info">
                                    <div className="dp_icon">
                                        <img src="/images/mini_user.svg" alt=""/>
                                    </div>
                                    <div className="cntnt">
                                        <p><Link href="">Meg Griffin has left you a review. Both of your reviews from this trip are now public.</Link></p>
                                        <div className="time_out">March 1, 2023</div>
                                    </div>
                                </div>
                                <button className="x_btn" type="button"></button>
                            </div>
                            <div className="list_inner_notify">
                                <div className="user_info">
                                    <div className="dp_icon">
                                        <img src="/images/mini_user.svg" alt=""/>
                                    </div>
                                    <div className="cntnt">
                                        <p><Link href="">Meg Griffin has left you a review. Both of your reviews from this trip are now public.</Link></p>
                                        <div className="time_out">March 1, 2023</div>
                                    </div>
                                </div>
                                <button className="x_btn" type="button"></button>
                            </div>
                            <div className="list_inner_notify">
                                <div className="user_info">
                                    <div className="dp_icon">
                                        <img src="/images/mini_user.svg" alt=""/>
                                    </div>
                                    <div className="cntnt">
                                        <p><Link href="">Meg Griffin has left you a review. Both of your reviews from this trip are now public.</Link></p>
                                        <div className="time_out">March 1, 2023</div>
                                    </div>
                                </div>
                                <button className="x_btn" type="button"></button>
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
Notifications.getLayout = function(page) {
    return <LayoutDashboard>{page}</LayoutDashboard>;
};
