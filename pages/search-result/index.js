import React, { useState} from "react";
import Link from 'next/link';
import Pagination from "../../components/pagination";
import DistanceSlider from "@/components/components/DistanceSlider";
export default function SearchResult() {
    const [viewMode, setViewMode] = useState('grid');
    const[openCat,setOpenCat] = useState(false);
    const ToggleCat = () =>{
        setOpenCat(!openCat);
    }
    const toggleView = (mode) => {
        setViewMode(mode);
      };
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
        <section className="search_result">
            <div className="contain">
                <div className="sec_heading">
                    <h1>Search Result</h1>
                </div>
                <div className="flex flex_search_result">
                    <div className="filter_mobile" onClick={ToggleCat}>
                        <span>Filters</span>
                    </div>
                    <div className={openCat ? "colL active" : "colL"}>
                        <h5>Search</h5>
                        <div className="form_blk">
                            <div className="relative_field">
                                <input type="text" className="input" name="" defaultValue={"Carpenter"}/>
                                <button type="button"><img src="/images/PencilSimple.svg" alt=""/></button>
                            </div>
                        </div>
                        <div className="form_blk">
                            <div className="relative_field">
                                <input type="text" className="input" name="" defaultValue={"Flooring & skirting"}/>
                                <button type="button"><img src="/images/PencilSimple.svg" alt=""/></button>
                            </div>
                        </div>
                        <div className="form_blk">
                            <div className="relative_field">
                                <input type="text" className="input" name="" defaultValue={"1711 O Street Sanger,CA 93657 Suite 102"}/>
                                <button type="button"><img src="/images/PencilSimple.svg" alt=""/></button>
                            </div>
                        </div>
                        <div className="mini_br"></div>
                        <h5>Distance</h5>
                        <DistanceSlider/>
                        <div className="mini_br"></div><div className="mini_br"></div>
                        <h5>Ratings</h5>
                        <div className="rating_blk_filter">
                            <div className="lbl_btn">
                                <input type="checkbox" name="rating" defaultValue={"5"} id="5_rating"/>
                                <label htmlFor="5_rating">
                                    <img src="/images/5_star.svg" alt="5 stars"/>
                                    <span>5.0</span>
                                </label>
                            </div>
                            <div className="lbl_btn">
                                <input type="checkbox" name="rating" defaultValue={"4"} id="4_rating"/>
                                <label htmlFor="4_rating">
                                    <img src="/images/4_star.svg" alt="4 stars"/>
                                    <span>4.0</span>
                                </label>
                            </div>
                            <div className="lbl_btn">
                                <input type="checkbox" name="rating" defaultValue={"3"} id="3_rating"/>
                                <label htmlFor="3_rating">
                                    <img src="/images/3_star.svg" alt="3 stars"/>
                                    <span>3.0</span>
                                </label>
                            </div>
                            <div className="lbl_btn">
                                <input type="checkbox" name="rating" defaultValue={"2"} id="2_rating"/>
                                <label htmlFor="2_rating">
                                    <img src="/images/2_star.svg" alt="2 stars"/>
                                    <span>2.0</span>
                                </label>
                            </div>
                        </div>
                        <div className="mini_br"></div>
                        <h5>Projects Completed</h5>
                        <div className="project_completed_filter">
                            <div className="lbl_btn">
                                <input type="checkbox" name="project_done" defaultValue={"1-10"} id="1_10"/>
                                <label htmlFor="1_10">1 - 10</label>
                            </div>
                            <div className="lbl_btn">
                                <input type="checkbox" name="project_done" defaultValue={"10-30"} id="10-30"/>
                                <label htmlFor="10-30">10 - 30</label>
                            </div>
                            <div className="lbl_btn">
                                <input type="checkbox" name="project_done" defaultValue={"30-50"} id="30-50"/>
                                <label htmlFor="30-50">30 - 50</label>
                            </div>
                            <div className="lbl_btn">
                                <input type="checkbox" name="project_done" defaultValue={"50-100"} id="50-100"/>
                                <label htmlFor="50-100">50 - 100+</label>
                            </div>
                        </div>
                        <div className="mini_br"></div><div className="mini_br"></div>
                        <h5>Specializations</h5>
                        <div className="specialization_filter">
                            <div className="lbl_btn">
                                <input type="radio" name="specialization" defaultValue={"Residential"} id="Residential"/>
                                <label htmlFor="Residential">Residential</label>
                            </div>
                            <div className="lbl_btn">
                                <input type="radio" name="specialization" defaultValue={"Commercial"} id="Commercial"/>
                                <label htmlFor="Commercial">Commercial</label>
                            </div>
                        </div>
                    </div>
                    <div className="colR">
                        <div className="result_head">
                            <p>6 carpenters found nearby in your area</p>
                            <div className="lst_grid">
                                <button onClick={() => toggleView('list')}
                                className={viewMode === 'list' ? 'active' : ''}>
                                    <img src="/images/list.svg" alt=""/>
                                </button>
                                <button 
                                onClick={() => toggleView('grid')}
                                className={viewMode === 'grid' ? 'active' : ''}
                                >
                                    <img src="/images/grid.svg" alt=""/>
                                </button>
                            </div>
                        </div>
                        <div className={viewMode === 'grid' ? 'flex flex_view view_grid' : 'flex flex_view'}>
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
                                            <Link href="" className="site_btn color block">Start Chat</Link>
                                            <Link href="" className="site_btn block">Send SMS</Link>
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
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
