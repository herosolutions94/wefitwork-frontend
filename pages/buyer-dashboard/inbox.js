import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import { useRouter } from "next/router";
import { fetchConversationData } from "@/components/states/actions/chat";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Image from "next/image";
import { cmsFileUrl } from "@/components/helpers/helpers";

export default function Inbox() {
    const router = useRouter();
    const {con} = router.query;

    const chat_id = con ? con : '';
    
    const dispatch = useDispatch();
  const data = useSelector((state) => state.chat.content);
  const member = useSelector((state) => state.chat.mem);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const isChatLoading = useSelector((state) => state.chat.isChatLoading);

  const convo_data = useSelector((state) => state.chat.convo_data);
  const chat_users = useSelector((state) => state.chat.chat_users);
  const chat_messages = useSelector((state) => state.chat.chat_messages);

  const { site_settings, page_title} = data;
//   console.log(data)


    useEffect(() => {
        dispatch(fetchConversationData({chat_id : chat_id ? chat_id : null}));
  }, []);

  const handleChangeChat = (chat_id) => {
    router.replace(`/buyer-dashboard/inbox?con=${chat_id}`);
    dispatch(fetchConversationData({chat_id : chat_id}));
    
  }

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
  };

  const filteredChatUsers = searchQuery
    ? chat_users.filter((user) =>
        user.receiver_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chat_users;
 
/// Attachments

const [attachments, setAttachments] = useState({files : []});

const fileRef = useRef(null);
const handleClick = (e) => {
  e.preventDefault();
  fileRef.current.click();
};

const handleAttachmentsUpload = (e) => {
    setAttachments({...attachments});
    console.log(e.target.files);
}



  return (
    <>
    <Toaster position="top-center" />
      <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
      <main className="main_dashboard" inbox="">
      {isLoading && (
                  <>
                    <div className="br"></div>
                    <div className="text-center">
                      <div
                        className="spinner-border text-danger"
                        role="status"
                        style={{ width: "3rem", height: "3rem" }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </>
                )}
    {!isLoading && (
       
        <div className="contain-fluid">
            <div className="barBlk relative">
                <div className="srch relative">
                    <input type="text" className="input" placeholder="Search contact" onChange={handleSearchChange} />
                    <button type="button"><img src="/images/bx_search.svg" alt="" /></button>
                </div>
                <ul className="frnds scrollbar">
                {filteredChatUsers?.map((val, i) => {
                    return(
                        <li data-chat={`person${val?.id}`} className={val?.id == convo_data?.id ? "active" : ""} key={i} onClick={() => handleChangeChat(val?.encrypted_id)}>
                        <div className="inner sms">
                            <div className="ico">
                            {val?.receiver_image ? 
                                <Image 
                                    src={cmsFileUrl(val?.receiver_image, "members")}
                                    width={48}
                                    height={48}
                                    alt={val?.receiver_name}

                                />
                                : 
                                <img
                          src="/images/no-user.svg"
                          alt={val?.receiver_name}
                        />
                            }
                                </div>
                            <div className="txt">
                                <h5>{val?.receiver_name}</h5>
                                <p>Welcome to Ticket Graze</p>
                            </div>
                            <div className="time_msg_ago">
                                Just Now
                            </div>
                        </div>
                    </li>
                    )
                })}
                    
                </ul>
            </div>
            <div className="chatBlk relative">
            {isChatLoading && 
                <div className="no_chat">
                <div className="text-center">
                      <div
                        className="spinner-border text-danger"
                        role="status"
                        style={{ width: "3rem", height: "3rem" }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <div className="br"></div>
                      <h4 className="text-danger">Loading Chat</h4>
                    </div>
                </div>
            }
            {!isChatLoading && 
                <>
                {convo_data == null || convo_data == 'null' || convo_data == undefined 
                ? 
                <div className="no_chat">
                    <h4 style={{color: '#747B83'}}>Select a chat or start a new conversation.</h4>
                </div>
                : 
                <>
                <div className="chatPerson">
                    <div className="backBtn"><Link href="" className="fi-arrow-left"></Link></div>
                    <div className="ico">{convo_data?.receiver_image ? 
                                <Image 
                                    src={cmsFileUrl(convo_data?.receiver_image, "members")}
                                    width={30}
                                    height={30}
                                    alt={convo_data?.receiver_name}

                                />
                                : 
                                <img
                          src="/images/no-user.svg"
                          alt={convo_data?.receiver_name}
                        />
                            }</div>
                    <h6>{convo_data?.receiver_name}</h6>
                    
                </div>
                {chat_users?.map((chat, i) => {
                    return(
                        <div className={`chat scrollbar ${chat?.id == convo_data?.id ? "active" : ""}`} data-chat={convo_data?.id}>

                    <div className="buble you">
                        <div className="ico"><img src="/images/testi4.png" alt=""/></div>
                        <div className="txt">
                            <div className="cntnt">
                            <p>{i}You are absolutely right. I will take time to practice and to learn to relax and express myself really well. Wish me luck, Catherine!</p></div>
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
                    )
                })}
                
                <div className="write">
                    <form className="relative">
                        
                        <div className="btm">
                            <button type="button" className="site_btn arrowBtn blank" title="Upload Files" onClick={handleClick}><img src="/images/clip.svg" alt=""/></button>
                            <textarea className="input" placeholder="Type a message"></textarea>
                            <button type="submit" className="site_btn icoBtn"><img src="/images/send.svg" alt=""/></button>


                            <input type="file" name="" id="chat_attachments" className="uploadFile" data-upload="gallery_image" ref={fileRef} multiple onChange={(e) => handleAttachmentsUpload(e) } />

                        </div>
                    </form>
                </div>
                </>
            }
           
                </>
                
            }
                
            </div>
        </div>
    )}
        
    </main>
    </>
  );
}
Inbox.getLayout = function(page) {
    return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
