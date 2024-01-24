import React, { useState } from "react";
import Link from "next/link";
import { map } from "jquery";
import http from "@/components/helpers/http";
import MetaGenerator from "@/components/components/meta-generator";
import Text from "@/components/components/text";
import { blogDate, cmsFileUrl } from "@/components/helpers/helpers";
import SocialShare from "@/components/components/socialShare";


export const getServerSideProps = async (context) => {
    const { slug } = context.query;
  
    const result = await http
      .get(`blog-detail/${slug}`)
      .then((response) => response.data)
      .catch((error) => error.response.data.message);
  
    return { props: { result } };
  };


export default function Blog({result}) {
    let { page_title, meta_desc, content, cats, blog, top_posts } = result;
    const[cat,setCat] = useState(false);
    const ToggleCat = () =>{
        setCat(!cat);
    }
 
  return (
    <>
    <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="blog_pg blog_detail_page">
            <div className="contain">
                <div className="flex">
                    <div className="colL">
                        <div className="inner">
                            <h4 onClick={ToggleCat}>Categories</h4>
                            <ul className={cat ? "cat_ul active" : "cat_ul"}>
                            <li>
                    <Link href="/blog" >All BLogs</Link>
                </li>
                                {cats?.map((val)=> {
                                    return(
                                        <li key={val?.id}>
                                            <Link href="/blog/1">{val?.title}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="br"></div>
                        <div className="inner">
                            <h4>Top Posts</h4>
                            <ul className="top_ul">
                                {top_posts?.map((val)=> {
                                    return(
                                        <li key={val?.id}>
                                            <Link href={`/blog/${val?.slug}`} className="image">
                                                <img src={cmsFileUrl(val?.image, "blogs")} alt={val?.title} />
                                            </Link>
                                            <div className="cntnt">
                                                <h5><Link href={`/blog/${val?.slug}`}><Text string={val?.title} /></Link></h5>
                                                <div className="other">
                                                    {/* <span>{val?.cate}</span> */}
                                                    <span>{blogDate(val?.created_date)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="colR">
                        <div className="col">
                            <div className="post_image">
                                <img src={cmsFileUrl(blog?.image, "blogs")} alt={blog?.title} />
                            </div>
                            <div className="post_cntnt">
                                <div className="other">
                                    <span>{blog?.category_id}</span>
                                    <span>{blogDate(blog?.created_date)}</span>
                                </div>
                                <h3><Text string={blog?.title} /></h3>
                                <Text string={blog?.description} />
                            </div>
                            <div className="share_opt">
                                <span>Share on</span>
                                
                                <ul>
                                    <li><Link href=""><img src="/images/facebook.svg" alt="" /></Link></li>
                                    <li><Link href=""><img src="/images/twitter.svg" alt="" /></Link></li>
                                    <li><Link href=""><img src="/images/instagram.svg" alt="" /></Link></li>
                                    <li><Link href=""><img src="/images/linkedin.svg" alt="" /></Link></li>
                                </ul>
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
