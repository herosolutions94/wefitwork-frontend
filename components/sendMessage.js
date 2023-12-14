import React, { useState,useRef } from "react";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";
import Text from "./text";

export default function SendMessage({data}) {
    
    console.log("dataaaa", data);
    
    return (
      <>
        <div className="send_message_pop">
           <h3>You are about to send an SMS</h3> 
           <div className="send_blk_msg">
                <div className="head_professional">
                    <div className="image">
                    {data?.mem_image ? (
                                  <Image
                                    src={cmsFileUrl(data?.mem_image, "members")}
                                    width={100}
                                    height={100}
                                    alt={data?.mem_fname}
                                  />
                                ) : (
                                  <img
                                    src="/images/no-user.svg"
                                    alt={data?.mem_fname}
                                  />
                                )}
                    </div>
                    <div className="cntnt">
                        <h4><Text string={data?.mem_fname} /></h4>
                        <p><Text string={`${data?.service_title} (${data?.sub_services?.join(', ')})`} /></p>
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