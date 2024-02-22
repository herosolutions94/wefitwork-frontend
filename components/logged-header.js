import Link from "next/link"
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import Text from "./text";
import { fetchProfessioanlDashboardData } from "../states/actions/professional/proProfile";
import { useDispatch, useSelector } from "react-redux";
import { cmsFileUrl, getArrayCount, getObjKeyCount, isArrayEmpty, isEmpty, timeAgo } from "../helpers/helpers";
import Image from "next/image";
import { deleteCookie, getCookies } from "cookies-next";
import { isEmptyObject } from "jquery";

export default function LoggedHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.proProfile.content);
  const member = useSelector((state) => state.proProfile.mem);
  const isLoading = useSelector((state) => state.proProfile.isLoading);

  const { site_settings, page_title, notifications, notifications_count } = data;

  useEffect(() => {
    dispatch(fetchProfessioanlDashboardData());
  }, []);

  // console.log(data);

  const [userDrop, setUserDrop] = useState(false);
  const [envelopeDrop, setEnvelopeDrop] = useState(false);
  const [notifyDrop, setNotifyDrop] = useState(false);
  const ToggleUserDrop = () => {
    setUserDrop(!userDrop);
  }
  const ToggleEnvelopeDrop = () => {
    setEnvelopeDrop(!envelopeDrop);
  }
  const ToggleNotifyDrop = () => {
    setNotifyDrop(!notifyDrop);
  }

  const logout = (e) => {
    e.preventDefault();
    const cookies = getCookies();
    Object.keys(cookies).forEach((cookieName) => {
      deleteCookie(cookieName);
    });
    localStorage.clear();
    router.push("/login");
   
  };

  return (
    <>
      <header className="logged_header">
        <div className="contain">
        {!isLoading && 
          <>
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
                        <h5>You have {notifications !== null ? notifications_count : 0} new notifications</h5>
                      </div>
                    </li>
                    {notifications !== null  ? 
                      notifications?.map((notify, i) => {
                        return (
                          <li key={i}>
                      <Link href="" className="inner" onClick={ToggleNotifyDrop}>
                        <div className="user_sm_icon color_icon_notify">
                          <img src="/images/envelope_color.svg" alt="" />
                        </div>
                        <div className="notify_cntnt">
                          <p><strong>{notify?.txt}</strong></p>
                          <div className="time_ago">{timeAgo(notify?.created_at)}</div>
                        </div>
                      </Link>
                    </li>
                        )
                      })
                      : 
                      <li>
                      <Link href="" className="inner" onClick={ToggleNotifyDrop}>
                        <div className="user_sm_icon color_icon_notify">
                          <img src="/images/envelope_color.svg" alt="" />
                        </div>
                        <div className="notify_cntnt">
                          <p className="alert alert-danger" ><strong>No New Notifications</strong></p>
                          {/* <div className="time_ago">2 mins ago</div> */}
                        </div>
                      </Link>
                    </li>
                    }
                    
                    
                    <li>
                      <div className="notify_footer">
                        <Link href="/professional-dashboard/notifications" onClick={ToggleNotifyDrop}>View all notifications</Link>
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
                          <img src="/images/testi1.png" alt="" />
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
                          <img src="/images/testi2.png" alt="" />
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
                          <img src="/images/testi3.png" alt="" />
                        </div>
                        <div className="notify_cntnt">
                          <p><strong>John</strong> I've finished it! See you soo...</p>
                          <div className="time_ago">2 mins ago</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="notify_footer">
                        <Link href="/professional-dashboard/inbox" onClick={ToggleEnvelopeDrop}>View all messages</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
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
                    <h6><Text string={member?.mem_fname} /></h6>
                    <p><Text string={member?.mem_email} /></p>
                  </div>
                </button>
                <ul className={userDrop ? "sub active" : "sub"}>
                  <li><Link href="/professional-dashboard" onClick={ToggleUserDrop}><img src="/images/dashboard.svg" alt="" /> <span>Dashboard</span></Link></li>
                  <li><Link href="/professional-dashboard/profile-settings" onClick={ToggleUserDrop}><img src="/images/setting.svg" alt="" /> <span>Profile Settings</span></Link></li>
                  <li className="drop_hide_dsk"><Link href="/professional-dashboard/my-account" onClick={ToggleUserDrop}><img src="/images/account.svg" alt="" /> <span>My Account</span></Link></li>
                  <li className="drop_hide_dsk"><Link href="/professional-dashboard/subscription" onClick={ToggleUserDrop}><img src="/images/subscription.svg" alt="" /> <span>Subscription</span></Link></li>
                  <li><Link href="/professional-dashboard/services" onClick={ToggleUserDrop}><img src="/images/service.svg" alt="" /> <span>Services</span></Link></li>
                  <li><Link href="#" onClick={logout}><img src="/images/logout.svg" alt="" /> <span>Logout</span></Link></li>
                  <div className="br"></div>
                  <div className="btn_blk text-center">
                  <Link href="/buyer-dashboard" onClick={ToggleUserDrop} className="site_btn color"> <span>My Buyer Dashboard</span></Link>
                  </div>
                  


                </ul>
              </li>
            </ul>
          </div>
          </>
        }
          

          
          <div className="clearfix"></div>
        </div>
      </header>
    </>
  )
}