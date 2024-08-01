import Link from "next/link"
import { useRouter } from 'next/router'
import React, { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import { authToken } from "../helpers/authToken";
import { getCookie } from "cookies-next";

export default function Header({ siteSettings }) {
  const router = useRouter();
  const [homeOwner, setHomeOwner] = useState();
  const [professional, setProfessional] = useState();
  const dropdownRef = useRef(null);
  const dropprofessionalRef = useRef(null);
  const leaseReviewRef = useRef(null);
  const toggleHomeOwner = (event) => {
    setHomeOwner(!homeOwner);
    event.stopPropagation();
    setProfessional(false);
  }
  const toggleProfessional = () => {
    setProfessional(!professional);
    setHomeOwner(false);
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setHomeOwner(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropprofessionalRef.current && !dropprofessionalRef.current.contains(event.target)) {
        setProfessional(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const token = authToken();
  // console.log(siteSettings);
  const [toggle, setToggle] = useState(false);
  const ToggleAction = () => {
    setToggle(!toggle);
  }
  const ToggleReviewAction = (e, page) => {
    e.preventDefault()
    setToggle(false);
    setProfessional(false);
    setHomeOwner(false);
    router.push(page);
  }
  const [userDrop, setUserDrop] = useState(false);
  const ToggleUserDrop = () => {
    setUserDrop(!userDrop);
  }

  const mem_type = getCookie('mem_type');
  return (
    <header>
      <div className="contain">
        <div className="logo">
          <Link href="/">

            <img src={cmsFileUrl(siteSettings?.site_logo)} alt={siteSettings?.site_name} />
          </Link>
        </div>
        <div className={toggle ? "toggle active" : "toggle"} onClick={ToggleAction}><span></span></div>
        <nav id="nav" className={toggle ? "active" : ""}>
          <ul>
            <li className="drop" ref={dropdownRef}>
              <div onClick={toggleHomeOwner} className="btn_nav" >Homeowners</div>
              <div className={homeOwner ? "sub active" : "sub"}>
                <ul>
                  {!token ?

                    <>
                      <li>
                        <div className="inner_sub_nav">
                          <h5>Login</h5>
                          <p>Login and have access to our services.</p>
                          <div className="btn_blk">
                            <Link href="/login" onClick={ToggleAction} className="site_btn color">Login</Link>
                          </div>
                          <Link href="/login" onClick={ToggleAction} className="hide_hide_hide">Login</Link>
                        </div>
                      </li>
                      <li>
                        <div className="inner_sub_nav">
                          <h5>Signup</h5>
                          <p>Signup and enjoy our services.</p>
                          <div className="btn_blk">
                            <Link href="/signup" onClick={ToggleAction} className="site_btn color">Signup</Link>
                          </div>
                          <Link href="/signup" onClick={ToggleAction} className="hide_hide_hide">Signup</Link>
                        </div>
                      </li>
                    </>
                    :
                    <li>
                      <div className="inner_sub_nav">
                        <h5>See Your Dashboard</h5>
                        <p>Visit your Dashboard</p>
                        <div className="btn_blk">
                          <Link href="/buyer-dashboard" onClick={ToggleAction} className="site_btn color">Dashboard</Link>
                        </div>
                        <Link href="/buyer-dashboard" onClick={ToggleAction} className="hide_hide_hide">Dashboard</Link>
                      </div>
                    </li>
                  }


                  <li>
                    <div className="inner_sub_nav">
                      <h5>Leave a Review</h5>
                      <p>Let us know how satisfied you are with a professional's work.</p>
                      <div className="btn_blk">
                        <Link href="#!" onClick={(e) => ToggleReviewAction(e, '/search')} className="site_btn">Leave a review</Link>
                      </div>
                      <Link href="#!" onClick={(e) => ToggleReviewAction(e, '/search')} className="site_btn hide_hide_hide">Leave a review</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="drop" ref={dropprofessionalRef}>
              <div onClick={toggleProfessional} className="btn_nav" >Professionals</div>
              <div className={professional ? "sub active" : "sub"}>
                <ul>
                  {!token ?
                    <>
                      <li>
                        <div className="inner_sub_nav">
                          <h5>Login</h5>
                          <p>Login into your dashboard and see your work request.</p>
                          <div className="btn_blk">
                            <Link href="/login" onClick={ToggleAction} className="site_btn">Login</Link>
                          </div>
                          <Link href="/login" onClick={ToggleAction} className="hide_hide_hide">Login</Link>
                        </div>
                      </li>
                      <li>
                        <div className="inner_sub_nav">
                          <h5>Signup</h5>
                          <p>Signup and become a professional on our platform so that homeowners can locate you.</p>
                          <div className="btn_blk">
                            <Link href="/become-professional" onClick={(e) => ToggleReviewAction(e, '/become-professional')} className="site_btn">Signup</Link>
                          </div>
                          <Link href="/become-professional" onClick={(e) => ToggleReviewAction(e, '/become-professional')} className="hide_hide_hide">Signup</Link>
                        </div>
                      </li>
                    </>
                    :
                    (token && mem_type == 'member') ?
                      <li>
                        <div className="inner_sub_nav">
                          <h5>Become A Pro</h5>
                          <p>Become a professional on our platform so that homeowners can locate you..</p>
                          <div className="btn_blk">
                            <Link href="/become-professional" onClick={ToggleAction} className="site_btn">Become A Pro</Link>
                          </div>
                          <Link href="/become-professional" onClick={ToggleAction} className="hide_hide_hide">Become A Pro</Link>
                        </div>
                      </li>
                      :
                      <li>
                        <div className="inner_sub_nav">
                          <h5>Professional Dashboard</h5>
                          <p>Manage your professional account..</p>
                          <div className="btn_blk">
                            <Link href="/professional-dashboard" onClick={ToggleAction} className="site_btn">Pro Dashboard</Link>
                          </div>
                          <Link href="/professional-dashboard" onClick={ToggleAction} className="hide_hide_hide">Pro Dashboard</Link>
                        </div>
                      </li>
                  }

                </ul>
              </div>
            </li>

            <li><Link href="/maintenance-cover" onClick={ToggleAction} className="site_btn color">Repair Plan</Link></li>
          </ul>
        </nav>
        <div className="cell_btn_show">
          <Link href="/maintenance-cover" className="site_btn color">Repair Plan</Link>
        </div>
        {/* =============logged user====== */}
        {/* <div className="logged_side">
            <ul>
              <li className="logged_drop">
                <button className="logged_drop_btn" onClick={ToggleUserDrop}>
                  <div className="user_img curve_drop">
                  <img src="/images/avtar.svg" alt="" />
                  </div>
                  <div className="cntnt loged_cnt">
                    <h6>Arlie Anderson</h6>
                  </div>
                </button>
                <ul className={userDrop ? "sub active" : "sub"}>
                  <li><Link href="/professional-dashboard" onClick={ToggleUserDrop}><img src="/images/dashboard.svg" alt="" /> <span>Dashboard</span></Link></li>
                  <li><Link href="/professional-dashboard/profile-settings" onClick={ToggleUserDrop}><img src="/images/setting.svg" alt="" /> <span>Profile Settings</span></Link></li>
                  <li className="drop_hide_dsk"><Link href="/professional-dashboard/my-account" onClick={ToggleUserDrop}><img src="/images/account.svg" alt="" /> <span>My Account</span></Link></li>
                  <li className="drop_hide_dsk"><Link href="/professional-dashboard/subscription" onClick={ToggleUserDrop}><img src="/images/subscription.svg" alt="" /> <span>Subscription</span></Link></li>
                  <li><Link href="/professional-dashboard/services" onClick={ToggleUserDrop}><img src="/images/service.svg" alt="" /> <span>Services</span></Link></li>
                  <li><Link href="/login" onClick={ToggleUserDrop}><img src="/images/logout.svg" alt="" /> <span>Logout</span></Link></li>
                </ul>
              </li>
            </ul>
          </div> */}
        <div className="clearfix"></div>
      </div>
    </header>
  )
}