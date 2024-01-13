import React from "react";
import Link from "next/link";
import Pagination from "../components/pagination";

export default function Search() {
    const result = [
        {
            id:"1",
            image:"/images/pro1.png",
            name:"John Gilbert",
            services:"Carpentry Repairs, Framing..",
            rating:"5.0",
            reviews:"10",
            complete_work:"30"
        },
        {
            id:"2",
            image:"/images/pro2.png",
            name:"Thomas Alenjery",
            services:"Carpentry Repairs, Framing..",
            rating:"5.0",
            reviews:"12",
            complete_work:"16"
        },
        {
            id:"3",
            image:"/images/pro3.png",
            name:"John Gilbert",
            services:"Carpentry Repairs, Framing..",
            rating:"5.0",
            reviews:"16",
            complete_work:"9"
        },
        {
            id:"4",
            image:"/images/pro4.png",
            name:"Thomas Alenjery",
            services:"Carpentry Repairs, Framing..",
            rating:"5.0",
            reviews:"12",
            complete_work:"16"
        },
        {
            id:"5",
            image:"/images/pro5.png",
            name:"John Gilbert",
            services:"Carpentry Repairs, Framing..",
            rating:"5.0",
            reviews:"12",
            complete_work:"16"
        },
        {
            id:"6",
            image:"/images/pro6.png",
            name:"John Gilbert",
            services:"Carpentry Repairs, Framing..",
            rating:"5.0",
            reviews:"12",
            complete_work:"16"
        },
      ]
  return (
    <>

      <main>
        <section className="banner_search_review">
            <div className="contain">
                <div className="cntnt">
                    <h1>Search Professional</h1>
                    <form>
                        <input type="text" className="input" name="" placeholder={"Professional  (eg, Electrician)"}/>
                        <button type="button"><img src="/images/search.svg" alt="" /></button>
                    </form>
                </div>
                <div className="flex flex_view">
                    {result.map((val)=>{
                        return(
                        <div className="col" key={val.id}>
                            <div className="inner">
                                <div className="head_professional">
                                    <div className="image">
                                        <img src={val.image} alt={val.name}/>
                                    </div>
                                    <div className="cntnt">
                                        <h4><Link href={`/search-result/${val.id}`}>{val.name}</Link></h4>
                                        <p>{val.services}</p>
                                        <div className="rating_lbl">
                                            <img src="/images/star.svg" alt=""/>
                                            <span>{val.rating} ({val.reviews} Reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="done_work">
                                    <p>Projects Completed</p>
                                    <h3>{val.complete_work}</h3>
                                </div>
                                <div className="btn_blk">
                                    <Link href="" className="site_btn color block">Leave Review</Link>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
                <div className="text-center pagination_outer">
                    <Pagination />
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
