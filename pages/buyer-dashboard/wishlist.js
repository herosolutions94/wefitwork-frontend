import React, { useRef, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import SendMessage from "@/components/components/sendMessage";
import PopupSmall from "@/components/components/popupSmall";


export default function Wishlist() {
    const [isPopupOpenSend, setIsPopupOpenSend] = useState(false);
    
    const handleOpenPopupSend = () => {
        setIsPopupOpenSend(true);
    };
    const handleClosePopupSend = () => {
        setIsPopupOpenSend(false);
    };
  return (
    <>
      <main>
         <section className="dashboard professional_details">
            <div className="contain">
                <div className="sec_heading">
                    <h2>My Wishlist</h2>
                </div>
                <div className="professiona_view_tile">
                    <div className="col">
                        <div className="action_buttons">
                            <button type="button" className="like_btn active">
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
                                    <h4>Thomas Alenjery<span className="work_expert">Electrician</span></h4>
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
                    <div className="col">
                        <div className="action_buttons">
                            <button type="button" className="like_btn active">
                                <img src="/images/heart.svg" alt="save" />
                            </button>
                            <button type="button" className="share_btn">
                                <img src="/images/ShareNetwork.svg" alt="save" />
                            </button>
                        </div>
                        <div className="inner">
                            <div className="head_professional">
                                <div className="image">
                                    <img src="/images/pro1.png" alt="Thomas Alenjery"/>
                                </div>
                                <div className="cntnt">
                                    <h4>Thomas Alenjery<span className="work_expert">Electrician</span></h4>
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
                    <div className="col">
                        <div className="action_buttons">
                            <button type="button" className="like_btn active">
                                <img src="/images/heart.svg" alt="save" />
                            </button>
                            <button type="button" className="share_btn">
                                <img src="/images/ShareNetwork.svg" alt="save" />
                            </button>
                        </div>
                        <div className="inner">
                            <div className="head_professional">
                                <div className="image">
                                    <img src="/images/pro4.png" alt="Thomas Alenjery"/>
                                </div>
                                <div className="cntnt">
                                    <h4>Thomas Alenjery<span className="work_expert">Electrician</span></h4>
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
                </div>
            </div>
         </section>
      </main>
      <PopupSmall isOpen={isPopupOpenSend} onClose={handleClosePopupSend}>
        <SendMessage />
      </PopupSmall>
    </>
  );
}
Wishlist.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
