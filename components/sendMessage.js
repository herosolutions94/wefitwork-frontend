import React, { useState,useRef } from "react";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";
import Text from "./text";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { authToken } from "../helpers/authToken";
import http from "../helpers/http";
import { doObjToFormData } from "../helpers/helpers";
import toast from "react-hot-toast";

export default function SendMessage({data, handleClosePopupSend}) {
    const router = useRouter();
    const [isFormProcessing, setIsFormProcessing] = useState(false);
    const workscope = getCookie("workscope") ? getCookie("workscope") : '';

    const handleSendSMS = () => {
      setIsFormProcessing(true);
      let formData = {work_scope: workscope, token: authToken(), pro: data?.mem_id, pro_name: data?.mem_fname, pro_phone: data?.mem_phone, base_path: window.location.origin} 
      try {
        http.post("user/send-message", doObjToFormData(formData)).then((data) => {
          // console.log(data);
          if (data.data.status) {
          
            toast.success(data.data.msg);
            
            setTimeout(() => {
              setIsFormProcessing(false);
              handleClosePopupSend()
              router.reload();
              
            }, 2000);
           
          } else {
            if (data.data.validationErrors) {
              toast.error(<Text string={data.validationErrors} parse={true} />, {
                duration: 6000,
              });
            }else{
              toast.error(data.data.msg);
            }
            setIsFormProcessing(false);
          }
        });
      } catch (errors) {
        console.log("Errors", errors);
      }
    }
    
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
                    <button type="button" className="site_btn" disabled={isFormProcessing} onClick={handleSendSMS}>Send SMS{isFormProcessing && (
                      <i
                        className={
                          isFormProcessing ? "spinner" : "spinnerHidden"
                        }
                      ></i>
                    )}</button>
                </div>
           </div>
        </div>
      </>
    );
}