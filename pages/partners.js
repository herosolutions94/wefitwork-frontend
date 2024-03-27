import React from "react";
import Link from "next/link";
import http from "../helpers/http";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";

export const getServerSideProps = async () => {
  const result = await http
    .get("our-partners")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Partners({result}) {
  let { page_title, meta_desc, content, partners } = result;

  return (
    <>
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section className="partners_sec">
            <div className="contain">
                <div className="sec_heading text-center">
                  <h1>
                    <Text string={content?.sec1_heading} />
                  </h1>
                </div>
                <div className="flex">
                {partners?.map((val) => {
                    return (
                        <div className="col" key={val?.id}>
                        <div className="inner">
                            <div className="image">
                                <img src={cmsFileUrl(val?.icon, "partners")} alt={val?.name} />
                            </div>
                            <div className="cntnt">
                                <h4>{val?.name}</h4>
                                <Text string={val?.detail} />
                                <div className="mini_br"></div>
                                <div className="btn_blk">
                                    <Link href={val?.link} className="site_btn">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })}
                   
                    
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
