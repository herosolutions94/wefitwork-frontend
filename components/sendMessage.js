import React, { useState,useRef } from "react";
export default function SendMessage({data}) {
    
    
    return (
      <>
        <div className="send_message_pop">
           <h3>You are about to send an SMS</h3> 
           <div className="send_blk_msg">
                <div className="head_professional">
                    <div className="image">
                        <img src="/images/pro1.png" alt="Thomas Alenjery"/>
                    </div>
                    <div className="cntnt">
                        <h4>Thomas Alenjery</h4>
                        <p>Carpentry Repairs, Framing..</p>
                        <div className="rating_lbl">
                            <img src="/images/star.svg" alt=""/>
                            <span>5.0 (10 Reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="btn_blk">
                    <button type="button" className="site_btn">Send SMS</button>
                </div>
           </div>
        </div>
      </>
    );
}