import Link from "next/link"
import { useRouter} from 'next/router'
import React,{useState, useEffect, useRef} from 'react';
import { fetchBuyerDashboardData } from "../states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import { deleteCookie } from "cookies-next";
import { SIGNIN_PAGE} from "../constants/link";

export default function LoggedBuyerHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);

  const { site_settings, page_title } = data;

  useEffect(() => {
    dispatch(fetchBuyerDashboardData());
  }, []);

    const[userDrop,setUserDrop] = useState(false);
    const[envelopeDrop,setEnvelopeDrop] = useState(false);
    const[notifyDrop,setNotifyDrop] = useState(false);
    const ToggleUserDrop = () => {
      setUserDrop(!userDrop);
    }
    const ToggleEnvelopeDrop = () => {
      setEnvelopeDrop(!envelopeDrop);
    }
    const ToggleNotifyDrop = () => {
      setNotifyDrop(!notifyDrop);
    }


    const dropOneRef = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (dropOneRef.current && !dropOneRef.current.contains(e.target)) {
        setUserDrop(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);


    const logout = (e) => {
      e.preventDefault();
      deleteCookie("authToken");
      router.push(SIGNIN_PAGE);
    };
    
    return (
      <>
      <header className="logged_header">
        <div className="contain">
          <div className="logo">
              <Link href="/">
                  <Image 
                    src={cmsFileUrl(site_settings?.site_logo)}
                    width={220}
                    height={80}
                    alt={site_settings?.site_name}
                  />
              </Link>
          </div>
          
          <div className="logged_side">
            <ul>
              <li className="logged_drop icon_drop">
                <button className="logged_drop_btn" onClick={ToggleNotifyDrop}>
                  <div className="user_img">
                  <img src="/images/notification_color.svg" alt="" />
                  </div>
                  
                </button>
                <div className={notifyDrop ? "sub active" : "sub"}>
                  <ul className="drop_lst">
                      <li>
                          <div className="notify_header">
                              <h5>You have 5 notifications</h5>
                          </div>
                      </li>
                      <li>
                          <Link href="" className="inner" onClick={ToggleNotifyDrop}>
                              <div className="user_sm_icon color_icon_notify">
                                  <img src="/images/envelope_color.svg" alt=""/>
                              </div>
                              <div className="notify_cntnt">
                                  <p><strong>2 new Messages</strong></p>
                                  <div className="time_ago">2 mins ago</div>
                              </div>
                          </Link>
                      </li>
                      <li>
                          <Link href="" className="inner" onClick={ToggleNotifyDrop}>
                              <div className="user_sm_icon color_icon_notify">
                                  <img src="/images/ChatCircleText.svg" alt=""/>
                              </div>
                              <div className="notify_cntnt">
                                  <p><strong>3 new Comments</strong></p>
                                  <div className="time_ago">2 mins ago</div>
                              </div>
                          </Link>
                      </li>
                      <li>
                          <div className="notify_footer">
                              <Link href="/buyer-dashboard/notifications" onClick={ToggleNotifyDrop}>View all notifications</Link>
                          </div>
                      </li>
                  </ul>
                </div>
              </li>
              <li className="logged_drop icon_drop">
                <button className="logged_drop_btn" onClick={ToggleEnvelopeDrop}>
                  <div className="user_img">
                  <img src="/images/envelope_color.svg" alt="" />
                  </div>
                  
                </button>
                <div className={envelopeDrop ? "sub active" : "sub"}>
                  <ul className="drop_lst">
                      <li>
                          <div className="notify_header">
                              <h5>You have 5 new messages</h5>
                          </div>
                      </li>
                      <li>
                          <Link href="" className="inner" onClick={ToggleEnvelopeDrop}>
                              <div className="user_sm_icon">
                                  <img src="/images/testi1.png" alt=""/>
                              </div>
                              <div className="notify_cntnt">
                                  <p><strong>Eleven Smith</strong> Just see the my admin...</p>
                                  <div className="time_ago">2 mins ago</div>
                              </div>
                          </Link>
                      </li>
                      <li>
                          <Link href="" className="inner" onClick={ToggleEnvelopeDrop}>
                              <div className="user_sm_icon">
                                  <img src="/images/testi2.png" alt=""/>
                              </div>
                              <div className="notify_cntnt">
                                  <p><strong>Zicher</strong> Hi! I am a...</p>
                                  <div className="time_ago">2 mins ago</div>
                              </div>
                          </Link>
                      </li>
                      <li>
                          <Link href="" className="inner" onClick={ToggleEnvelopeDrop}>
                              <div className="user_sm_icon">
                                  <img src="/images/testi3.png" alt=""/>
                              </div>
                              <div className="notify_cntnt">
                                  <p><strong>John</strong> I've finished it! See you soo...</p>
                                  <div className="time_ago">2 mins ago</div>
                              </div>
                          </Link>
                      </li>
                      <li>
                          <div className="notify_footer">
                              <Link href="/buyer-dashboard/inbox" onClick={ToggleEnvelopeDrop}>View all messages</Link>
                          </div>
                      </li>
                  </ul>
                </div>
              </li>
              {isLoading ? <div className="text-center">
                  <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                :
              <li className="logged_drop">
                <button className="logged_drop_btn" onClick={ToggleUserDrop}>
                  <div className="user_img">
                  {member?.mem_image ? 
                    (<Image 
                      width={40}
                      height={40}
                      src={cmsFileUrl(member?.mem_image, "members")}
                      alt={member?.mem_fname}
                    />) 
                    : 
                    (
                      <Image 
                      width={40}
                      height={40}
                      src="/images/no-user.svg"
                      alt={"user-dp"}
                    />
                    )
                  }
                  
                  </div>
                  <div className="cntnt">
                    <h6>{member?.mem_fname}</h6>
                    <p>{member?.mem_email}</p>
                  </div>
                </button>
                <ul className={userDrop ? "sub active" : "sub"} ref={dropOneRef}>
                  <li><Link href="/buyer-dashboard" onClick={ToggleUserDrop}><img src="/images/dashboard.svg" alt="" /> <span>Dashboard</span></Link></li>
                  <li><Link href="/buyer-dashboard/profile-settings" onClick={ToggleUserDrop}><img src="/images/setting.svg" alt="" /> <span>Profile Settings</span></Link></li>
                  <li className="drop_hide_dsk"><Link href="/buyer-dashboard/my-account" onClick={ToggleUserDrop}><img src="/images/account.svg" alt="" /> <span>My Account</span></Link></li>
                  <li><Link href="/buyer-dashboard/wishlist" onClick={ToggleUserDrop}><img src="/images/wishlist.svg" alt="" /> <span>Wishlist</span></Link></li>
                  <li><Link href="/buyer-dashboard/bookings" onClick={ToggleUserDrop}><img src="/images/booking.svg" alt="" /> <span>Bookings</span></Link></li>
                  <li><Link href="#" onClick={logout}><img src="/images/logout.svg" alt="" /> <span>Logout</span></Link></li>
                  <li><Link href="/professional-dashboard" onClick={ToggleUserDrop} className="site_btn"><img src="/images/logout.svg" alt="" /> <span>Go to Professional Dashboard</span></Link></li>

                </ul>
              </li>
              }
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </header>
      </>
    )
  }