import React, { useState} from "react";
import Link from 'next/link';
// import Gallery from "@/components/components/Gallery";
import GalleryPopup from "@/components/components/GalleryPopup";
import PopupLarge from "@/components/components/popupLarge";
import ReactStars from 'react-stars'
import SendMessage from "@/components/components/sendMessage";
import PopupSmall from "@/components/components/popupSmall";
export default function SearchResult() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenSend, setIsPopupOpenSend] = useState(false);
    
    const handleOpenPopupSend = () => {
        setIsPopupOpenSend(true);
    };
    const handleClosePopupSend = () => {
        setIsPopupOpenSend(false);
    };
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const rating_value = [
        {
            title:"Accuracy",
            star:"5"
        },
        {
            title:"Experience",
            star:"5"
        },
        {
            title:"Responsiveness",
            star:"4"
        },
        {
            title:"Safety",
            star:"5"
        },
    ]
    const reviews = [
        {
            id:"review1",
            icon:"/images/pro5.png",
            name:"John Doeing",
            time_message:"in the last week",
            star:"5",
            comment:"I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        },
        {
            id:"review2",
            icon:"/images/testi8.webp",
            name:"Stefen Gilbert",
            time_message:"in the last week",
            star:"5",
            comment:"I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        },
        {
            id:"review3",
            icon:"/images/testi9.png",
            name:"Kreg Geo",
            time_message:"in the last week",
            star:"5",
            comment:"I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. I am text block. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
        },
    ]
    const galleryImages = [
        {
          large: '/images/portfolio1_1.jpg',
          thumb: '/images/portfolio1.png',
        },
        {
            large: '/images/portfolio2_1.webp',
            thumb: '/images/portfolio2.png',
        },
        {
            large: '/images/portfolio3_1.jpg',
            thumb: '/images/portfolio3.png',
        },
        {
            large: '/images/portfolio4_1.jpg',
            thumb: '/images/portfolio4.png',
        },
        
      ];
      const galleryImagesPopup = [
        {
          large: '/images/portfolio1_1.jpg',
          thumb: '/images/portfolio1.png',
        },
        {
            large: '/images/portfolio2_1.webp',
            thumb: '/images/portfolio2.png',
        },
        {
            large: '/images/portfolio3_1.jpg',
            thumb: '/images/portfolio3.png',
        },
        {
            large: '/images/portfolio4_1.jpg',
            thumb: '/images/portfolio4.png',
        },
        {
            large: '/images/portfolio1_1.jpg',
            thumb: '/images/portfolio1.png',
          },
          {
              large: '/images/portfolio3_1.jpg',
              thumb: '/images/portfolio3.png',
          },
          {
              large: '/images/portfolio4_1.jpg',
              thumb: '/images/portfolio4.png',
          },
          {
            large: '/images/portfolio1_1.jpg',
            thumb: '/images/portfolio1.png',
          },
          {
              large: '/images/portfolio2_1.webp',
              thumb: '/images/portfolio2.png',
          },
          {
              large: '/images/portfolio3_1.jpg',
              thumb: '/images/portfolio3.png',
          },
          {
              large: '/images/portfolio4_1.jpg',
              thumb: '/images/portfolio4.png',
          },
          {
            large: '/images/portfolio1_1.jpg',
            thumb: '/images/portfolio1.png',
          },
          {
              large: '/images/portfolio2_1.webp',
              thumb: '/images/portfolio2.png',
          },
          {
              large: '/images/portfolio3_1.jpg',
              thumb: '/images/portfolio3.png',
          },
          {
              large: '/images/portfolio4_1.jpg',
              thumb: '/images/portfolio4.png',
          }
      ];
  return (
    <>
      <main>
        <section className="professional_details">
            <div className="contain">
                <div className="professiona_view_tile">
                    <div className="col">
                        <div className="action_buttons">
                            <button type="button" className="like_btn">
                                <img src="/images/heart.svg" alt="save" />
                            </button>
                            <button type="button" className="share_btn">
                                <img src="/images/ShareNetwork.svg" alt="save" />
                            </button>
                        </div>
                        <div className="inner">
                            <div className="head_professional">
                                <div className="image">
                                    <img src="/images/pro3.png" alt="Thomas Alenjery"/>
                                </div>
                                <div className="cntnt">
                                    <h4>Thomas Alenjery</h4>
                                    <div className="rating_lbl">
                                        <img src="/images/star.svg" alt=""/>
                                        <span>5.0 (10 Reviews)</span>
                                    </div>
                                    <div className="_done_work">
                                        <p>Projects Completed</p>
                                        <h3>3</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="done_work">
                                <p>Specialization</p>
                                <h3>Commercial & Residential</h3>
                            </div>
                            <div className="btn_blk">
                                <Link href="" className="site_btn color block">Start Chat</Link>
                                <button type="button" onClick={handleOpenPopupSend} className="site_btn block">Send SMS</button>
                            </div>
                        </div>
                    </div>
                    <div className="col other_intro">
                        <h5>INTRODUCTION</h5>
                        <p>With over 10 years of experience in electrical work, I provide reliable and high-quality services to meet all your electrical needs. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
                        <div className="br"></div>
                        <h5>SERVICES OFFERED</h5>
                        <h6 className="color">General Plumbing</h6>
                        <ul>
                            <li>Bathroom & Kitchen Plumbing</li>
                            <li>Emergency Plumber Service</li>
                            <li>Water Mains Specialist</li>
                            <li>Blocked Baths</li>
                            <li>Pipe Fitter</li>
                            <li>Water Leak Detection</li>
                            <li>Blocked Sinks</li>
                            <li>Plumbing Repairs</li>
                            <li>Blocked Toilets</li>
                        </ul>
                        <div className="br"></div>
                        <h5>portfolio</h5>
                        <div className="portfolio_grid">
                            {/* <Gallery images={galleryImages}/> */}
                            <div id="my-gallery">
                                {galleryImages.map((val)=>{
                                    return(
                                        <div className='image_grid'>
                                            <img src={val.large} alt="gallery" />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="btn_blk">
                                <button type="button" className="site_btn" onClick={handleOpenPopup}>View all Images</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="rating_view_block">
                            <div className="rating_view_block_header">
                                <div className="sumary_rating">
                                    <img src="/images/star.svg" alt="" />
                                    <span>5.0 (3 Reviews)</span>
                                </div>
                                <div className="overall_rating">
                                    {rating_value.map((val)=>{
                                        return(
                                        <div key={val.id}>
                                            <h5>{val.title}</h5>
                                            <ReactStars
                                            className="rates"
                                            count={5}
                                            value={val.star}
                                            size={24}
                                            color1={'#ddd'}
                                            color2={'#FF3D3D'}
                                            edit={false}/>
                                        </div>
                                        );
                                    })}
                                    
                                    
                                </div>
                            </div>
                            <div className="rateing_list_review">
                                {reviews.map((val)=>{
                                    return(
                                        <div className="buyer_review" key={val.id}>
                                            <div className="head_review">
                                                <div className="buyer_info">
                                                    <div className="img_icon">
                                                        <img src={val.icon} alt={val.name}/>
                                                    </div>
                                                    <div className="cntnt">
                                                        <h6>{val.name}</h6>
                                                        <p><small>{val.time_message}</small></p>
                                                    </div>
                                                </div>
                                                <div className="rating_star_reviw">
                                                    <ReactStars
                                                    className="rates"
                                                    count={5}
                                                    value={val.star}
                                                    size={24}
                                                    color1={'#ddd'}
                                                    color2={'#FF3D3D'}
                                                    edit={false}/>
                                                </div>
                                            </div>
                                            <p>{val.comment}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <PopupLarge isOpen={isPopupOpen} onClose={handleClosePopup}>
        <GalleryPopup onClose={handleClosePopup} images={galleryImagesPopup}/>
      </PopupLarge>
      <PopupSmall isOpen={isPopupOpenSend} onClose={handleClosePopupSend}>
        <SendMessage />
      </PopupSmall>
    </>
  );
}
