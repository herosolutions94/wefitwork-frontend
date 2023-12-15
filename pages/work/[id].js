import React, { useState} from "react";
import Link from 'next/link';
import Text from "@/components/components/text";
import http from "@/components/helpers/http";
import { authToken } from "@/components/helpers/authToken";
import { doObjToFormData } from "@/components/helpers/helpers";

export const getServerSideProps = async (context) => {
    const { id } = context.query;
  
    const result = await http
      .get(`work-scope/${id}`)
      .then((response) => response.data)
      .catch((error) => error.response.data.message);
  
    return { props: { result, id } };
  };

export default function WorkScope({result}) {
   console.log(result)
   let { page_title, meta_desc, content, work_scope} = result;

   
 return (
   <>
     <main>
       <section className="professional_details">
           <div className="contain">
               <div className="professiona_view_tile">
                   
                   <div className="col other_intro">
                       <h5>Work Scope</h5>
                       <p><Text string={work_scope?.work_scope} /></p>
                       <div className="br"></div>
                       <h5>Budget</h5>
                       <p><Text string={work_scope?.budget} /></p>

                       <div className="br"></div>
                       <h5>Job Start</h5>
                       <p><Text string={work_scope?.job_start} /></p>

                       <div className="br"></div>
                       <h5>Attached File</h5>
                       <div className="portfolio_grid">
                          
                           <div className="btn_blk text-center">
                  <a
                    className="site_btn"
                    type="submit"
                    
                  >
                    Download File
                  </a>
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
