import React from "react";
import Link from "next/link";
import http from "../helpers/http";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { authToken } from "../helpers/authToken";
import toast,{ Toaster } from "react-hot-toast";


export const getServerSideProps = async () => {
  const result = await http
    .get("become-pro")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function BecomeProfessional({result}) {
  const router = useRouter();
  let { page_title, meta_desc, content, how_works, site_settings} = result;

  const token = authToken() ? authToken() : false;

  const handleRedirectProfession = (e) => {
    const mem_type = getCookie('mem_type');
    e.preventDefault();
    if(!token){
      setCookie('mem_type', 'professional');
      router.push(`/signup?from=become-professional`);
    } else if(token && mem_type === 'member'){
      router.push(`/trade-person-signup`);
    }else if(token && mem_type === 'professional'){
      router.push(`/professional-dashboard/services`);
    }else{
      toast.error('Something Went Wrong');
    }
    
  }

  return (
    <>
    <Toaster position="top-center" />
    <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
          <section className="become_professional_banner" style={{ background : cmsFileUrl(content?.image2)}}>
            <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="sec_heading">
                      <h1><Text string={content?.sec1_heading} /></h1>
                    </div>
                    <Text string={content?.sec1_detail} />
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                      <Link href={'#'} onClick={handleRedirectProfession} className="site_btn color min_wid"><Text string={content?.sec1_button1_text} /></Link>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="image">
                      <Image 
                        src={cmsFileUrl(content?.image2)}
                        width={555}
                        height={389}
                        alt="Baner"
                      />
                      
                    </div>
                  </div>
                </div>
            </div>
          </section>
          <section className="choose_us_sec">
            <div className="contain">
                <Link href={content?.ribbon_button1_link} className="announcment_lbl">
                  <Image 
                    src={cmsFileUrl(content?.image4)}
                    width={500}
                    height={74}
                    alt="Ribbon"
                  />
                  
                </Link>
                <div className="sec_heading">
                  <h2><Text string={content?.sec2_heading} /></h2>
                  <Text string={content?.sec2_detail} />
                </div>
                <div className="inner_choose">
                  <Text string={content?.sec2_key_features} />
                </div>
            </div>
          </section>
          <section className="professional_how_it_works">
            <div className="contain">
              <div className="sec_heading">
                <h2><Text string={content?.sec3_heading} /></h2>
                <Text string={content?.sec3_detail} />
              </div>
              <div className="flex">
                {how_works.map((val)=>{
                  return(
                    <div className="col" key={val.id}>
                        <div className="inner">
                          <div className="img_icon">
                          <Image 
                            src={cmsFileUrl(val?.image)}
                            width={50}
                            height={50}
                            alt={val?.title}
                          />
                           
                          </div>
                          <h5><Text string={val.title} /></h5>
                          <p><Text string={val.txt1} /></p>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="join_now">
            <div className="contain">
              <div className="flex">
                <div className="colL">
                  <div className="image">
                    <Image 
                      src={cmsFileUrl(content?.image3)}
                      width={585}
                      height={451}
                      alt="section4-image"
                    />
                    
                  </div>
                </div>
                <div className="colR">
                  <div className="inner">
                    <div className="sec_heading">
                      <h2><Text string={content?.sec4_heading} /></h2>
                      <Text string={content?.sec4_detail} />
                    </div>
                    
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                      <Link href={'#'} onClick={handleRedirectProfession} className="site_btn color min_wid"><Text string={content?.sec4_button1_text} /></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ready_sec">
            <div className="contain">
              <div className="cntnt">
                <div className="sec_heading">
                  <h2><Text string={content?.sec5_heading} /></h2>
                </div>
                <Text string={content?.sec5_detail} />
                <div className="btn_blk text-center">
                  <Link href={'#'} onClick={handleRedirectProfession} className="site_btn min_wid"><Text string={content?.sec5_button1_text} /></Link>
                </div>
                <h6><Text string={content?.sec5_tagline} /></h6>
                <Link href={`tel:${site_settings?.site_phone}`} className="call_btn">Call:  {site_settings?.site_phone}</Link>
              </div>
            </div>
          </section>
      </main>
    </>
  );
}
