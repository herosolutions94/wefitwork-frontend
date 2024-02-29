import Link from "next/link"
import { useRouter} from 'next/router'
import React,{useState} from 'react'
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import { authToken } from "../helpers/authToken";
import { getCookie } from "cookies-next";

export default function Header({siteSettings}) {
  const [homeOwner, setHomeOwner] = useState();
  const [professional, setProfessional] = useState();
  const toggleHomeOwner = () => {
    setHomeOwner(!homeOwner);
    setProfessional(false);
  }
  const toggleProfessional = () => {
    setProfessional(!professional);
    setHomeOwner(false);
  }
  const token = authToken();
  // console.log(siteSettings);
    const[toggle,setToggle] = useState(false);
    const ToggleAction = () =>{
      setToggle(!toggle);
    }
    const[userDrop,setUserDrop] = useState(false);
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
              <li className="drop">
                  <div onClick={toggleHomeOwner} className="btn_nav">Homeowner</div>
                  <div className={homeOwner ? "sub active" : "sub"}>
                      <ul>
                      {!token ? 
                      
                      <>
                      <li>
                          <div className="inner_sub_nav">
                              <h5>Login</h5>
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
                              <div className="btn_blk">
                              <Link href="/login" onClick={ToggleAction} className="site_btn color">Login</Link>
                              </div>
                              <Link href="/login" onClick={ToggleAction} className="hide_hide_hide">Login</Link>
                          </div>
                        </li>
                        <li>
                          <div className="inner_sub_nav">
                              <h5>Signup</h5>
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
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
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
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
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
                              <div className="btn_blk">
                              <Link href="/search" onClick={ToggleAction} className="site_btn">Leave a review</Link>
                              </div>
                              <Link href="/search" onClick={ToggleAction} className="site_btn hide_hide_hide">Leave a review</Link>
                          </div>
                        </li>
                      </ul>
                  </div>
              </li>
              <li className="drop">
                  <div onClick={toggleProfessional} className="btn_nav">Professionals</div>
                  <div className={professional ? "sub active" : "sub"}>
                      <ul>
                      {!token ? 
<>
<li>
                          <div className="inner_sub_nav">
                              <h5>Login</h5>
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
                              <div className="btn_blk">
                              <Link href="/login" onClick={ToggleAction} className="site_btn">Login</Link>
                              </div>
                              <Link href="/login" onClick={ToggleAction} className="hide_hide_hide">Login</Link>
                          </div>
                        </li>
                        <li>
                          <div className="inner_sub_nav">
                              <h5>Signup</h5>
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
                              <div className="btn_blk">
                              <Link href="/become-professional" onClick={ToggleAction} className="site_btn">Signup</Link>
                              </div>
                              <Link href="/become-professional" onClick={ToggleAction} className="hide_hide_hide">Signup</Link>
                          </div>
                        </li>
</>
: 
(token && mem_type == 'member') ? 
<li>
                          <div className="inner_sub_nav">
                              <h5>Become A Pro</h5>
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
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
                              <p>Only the Best Make the Cut We carefully vet every pro with a rigorous selection process.</p>
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
              
              <li><Link href="/maintenance-cover" onClick={ToggleAction} className="site_btn color">Repair Cover</Link></li>
            </ul>
          </nav>
          <div className="cell_btn_show">
          <Link href="/maintenance-cover" className="site_btn color">Repair Cover</Link>
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