import React, { useState } from "react";
import Link from "next/link";
import { map } from "jquery";
import Pagination from "@/components/components/pagination-default";

export default function Blog() {
    const[cat,setCat] = useState(false);
    const ToggleCat = () =>{
        setCat(!cat);
    }
 const categories = [
    {
      id:"1",
      name: "Culture"
    },
    {
        id:"2",
        name: "Creativity"
    },
    {
        id:"3",
        name:"Food"
    },
    {
        id:"4",
        name:"Travel"
    },
    {
        id:"5",
        name:"Humor"
    },
    {
        id:"6",
        name:"Music"
    }
 ]
 const posts = [
    {
        id:"post1",
        image:"/images/about.png",
        title:"Need an electrician to fix your light",
        pera:"Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.",
        cate:"Food",
        date:"Nov 17,2023"
    },
    {
        id:"post2",
        image:"/images/989.png",
        title:"Find a quality professionals in your area",
        pera:"Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.",
        cate:"Humor",
        date:"Nov 19,2023"
    },
    {
        id:"post3",
        image:"/images/tab_image2.jpg",
        title:"Find a quality professionals in your area",
        pera:"Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.",
        cate:"Travel",
        date:"Oct 22,2023"
    },
    {
        id:"post4",
        image:"/images/portfolio3_1.jpg",
        title:"Find a quality professionals in your area",
        pera:"Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.",
        cate:"Travel",
        date:"Oct 22,2023"
    },
 ]
  return (
    <>
      <main>
        <section className="blog_pg blog_detail_page">
            <div className="contain">
                <div className="flex">
                    <div className="colL">
                        <div className="inner">
                            <h4 onClick={ToggleCat}>Categories</h4>
                            <ul className={cat ? "cat_ul active" : "cat_ul"}>
                                {categories.map((val)=> {
                                    return(
                                        <li key={val.id}>
                                            <Link href="/blog/1">{val.name}</Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="br"></div>
                        <div className="inner">
                            <h4>Top Posts</h4>
                            <ul className="top_ul">
                                {posts.map((val)=> {
                                    return(
                                        <li key={val.id}>
                                            <Link href="/blog/1" className="image">
                                                <img src={val.image} alt={val.title} />
                                            </Link>
                                            <div className="cntnt">
                                                <h5><Link href="/blog/2">{val.title}</Link></h5>
                                                <div className="other">
                                                    <span>{val.cate}</span>
                                                    <span>{val.date}</span>
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
                                <img src="/images/tab_image2.jpg" alt="" />
                            </div>
                            <div className="post_cntnt">
                                <div className="other">
                                    <span>Food</span>
                                    <span>Nov 17, 2023</span>
                                </div>
                                <h3>Find a quality professionals in your area</h3>
                                <p>Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.</p>
                                <h4>Find a quality professionals in your area</h4>
                                <p>Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.</p>
                                <p>Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.Browse our categories of services, describe the help you need, and we'll instantly connect you to professionals tailored to your job.</p>
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
