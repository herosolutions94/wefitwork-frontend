import React from "react";
import Link from "next/link";
import http from "../helpers/http";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";

// export const getServerSideProps = async () => {
//   const result = await http
//     .get("about")
//     .then((response) => response.data)
//     .catch((error) => error.response.data.message);

//   return { props: { result } };
// };

export default function Partners() {
//   let { page_title, meta_desc, content, testimonials, our_team } = result;

  return (
    <>
      {/* <MetaGenerator page_title={page_title} meta_desc={meta_desc} /> */}

      <main>
        <section className="partners_sec">
            <div className="contain">
                <div className="sec_heading text-center">
                  <h1>
                    Our Partners
                  </h1>
                </div>
                <div className="flex">
                    <div className="col">
                        <div className="inner">
                            <div className="image">
                                <img src="/images/partner2.png" alt="" />
                            </div>
                            <div className="cntnt">
                                <h4>Company Name</h4>
                                <p>We carefully vet every professional through a rigorous selection process we carefully vet every professional through a rigorous selection process</p>
                                <div className="mini_br"></div>
                                <div className="btn_blk">
                                    <Link href="" className="site_btn">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <div className="image">
                                <img src="/images/partner3.png" alt="" />
                            </div>
                            <div className="cntnt">
                                <h4>Company Name</h4>
                                <p>We carefully vet every professional through a rigorous selection process we carefully vet every professional through a rigorous selection process</p>
                                <div className="mini_br"></div>
                                <div className="btn_blk">
                                    <Link href="" className="site_btn">Read More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="inner">
                            <div className="image">
                                <img src="/images/partner4.png" alt="" />
                            </div>
                            <div className="cntnt">
                                <h4>Company Name</h4>
                                <p>We carefully vet every professional through a rigorous selection process we carefully vet every professional through a rigorous selection process</p>
                                <div className="mini_br"></div>
                                <div className="btn_blk">
                                    <Link href="" className="site_btn">Read More</Link>
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
