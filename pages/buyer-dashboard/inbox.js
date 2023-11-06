import React, { useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";


export default function Inbox() {
  
  return (
    <>
      <main className="main_dashboard" inbox="">
        <div className="contain-fluid">
            <div className="barBlk relative">
                <div className="srch relative">
                    <input type="text" className="input" placeholder="Search contact" />
                    <button type="button"><img src="/images/bx_search.svg" alt="" /></button>
                </div>
                <ul className="frnds scrollbar">
                    <li data-chat="person1" className="active">
                        <div className="inner sms">
                            <div className="ico"><img src="/images/testi1.png" alt="" /></div>
                            <div className="txt">
                                <h5>Jennifer Kem</h5>
                                <p>Welcome to Ticket Graze</p>
                            </div>
                            <div className="time_msg_ago">
                                Just Now
                            </div>
                        </div>
                    </li>
                    <li data-chat="person2">
                        <div className="inner unread">
                            <div className="ico"><img src="/images/testi1.png" alt="" /></div>
                            <div className="txt">
                                <h5>Chris Gale</h5>
                                <p>Could you describe please</p>
                            </div>
                            <div className="time_msg_ago">
                                10:20 pm
                            </div>
                        </div>
                    </li>
                    <li data-chat="person3">
                        <div className="inner sms unread">
                            <div className="ico"><img src="/images/testi2.png" alt=""/></div>
                            <div className="txt">
                                <h5>Sofia Safinaz</h5>
                                <p>Great, Thank You!</p>
                            </div>
                            <div className="time_msg_ago">
                                9:00 pm
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="chatBlk relative">
                <div className="chatPerson">
                    <div className="backBtn"><Link href="" className="fi-arrow-left"></Link></div>
                    <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                    <h6>Samantha James</h6>
                    
                </div>
                <div className="chat scrollbar active" data-chat="person1">
                    <div className="buble you">
                        <div className="ico"><img src="/images/testi4.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>You are absolutely right. I will take time to practice and to learn to relax and express myself really well. Wish me luck, Catherine!</p></div>
                            <div className="time">11:59 am</div>
                        </div>
                    </div>
                    <div className="buble me">
                        <div className="ico"><img src="/images/testi3.png" alt="" /></div>
                        <div className="txt">
                            <div className="cntnt"><p>it's me.</p></div>
                            <div className="time">11:59 am</div>
                        </div>
                    </div>
                    <div className="buble me">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>Pictures will keep your audience from being bored. In order for you to succeed, you need to keep them interested and involved.</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                    <div className="buble you">
                        <div className="ico"><img src="/images/testi1.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                                <p>I have shared some photos, Please have a look.</p>
                                <div className="flex_col_chat">
                                    <div className="col">
                                        <img src="/images/portfolio3.png" />
                                    </div>
                                    <div className="col">
                                        <img src="/images/portfolio4.png" />
                                    </div>
                                    <div className="col">
                                        <img src="/images/portfolio1.png" />
                                    </div>
                                </div>
                            </div>
                            <div className="time">11:59 am</div>
                        </div>
                    </div>
                    <div className="buble me">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>Good idea! By the way, do you have any facts to back you up? For example, change of climate, yearly disasters…</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                    <div className="buble you">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>I should talk about more precisely the sequence of my presentation?</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                    <div className="buble me">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>I have done a lot of research on the subject, and I know I can answer any questions I will receive from the audience.</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                    <div className="buble you">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>I have to give a presentation on global warming on Friday, and I am so nervous.</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                    <div className="buble you">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>????</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                    <div className="buble me">
                        <div className="ico"><img src="/images/testi3.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>I know you. You can do it. Good luck, Jennifer!</p></div>
                            <div className="time">10:00 Pm</div>
                        </div>
                    </div>
                </div>
                <div className="write">
                    <form className="relative">
                        
                        <div className="btm">
                            <button type="button" className="site_btn arrowBtn blank" title="Upload Files"><img src="/images/clip.svg" alt=""/></button>
                            <textarea className="input" placeholder="Type a message"></textarea>
                            <button type="submit" className="site_btn icoBtn"><img src="/images/send.svg" alt=""/></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    </main>
    </>
  );
}
Inbox.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
