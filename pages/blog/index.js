import React, { useState } from "react";
import Link from "next/link";
import { map } from "jquery";
import Pagination from "@/components/components/pagination-default";

export default function Blog() {
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
        <section className="blog_pg">
            <div className="contain">
                <div className="flex">
                    <div className="colL">
                        <div className="inner">
                            <h4>Categories</h4>
                            <ul className="cat_ul">
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
                        {posts.map((val)=>{
                            return(
                                <div className="col" key={val.id}>
                                    <Link href="/blog/3" className="post_image">
                                        <img src={val.image} alt="" />
                                    </Link>
                                    <div className="post_cntnt">
                                        <div className="other">
                                            <span>{val.cate}</span>
                                            <span>{val.date}</span>
                                        </div>
                                        <h3><Link href="/blog/3">{val.title}</Link></h3>
                                        <p>{val.pera}</p>
                                        <Link href="/blog/1" className="read_more">Read More</Link>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="pagination_outer">
                        <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
