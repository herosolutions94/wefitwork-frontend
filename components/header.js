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
  }
  const toggleProfessional = () => {
    setProfessional(!professional);
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
                  <div onClick={toggleHomeOwner}>For Homeowner</div>
                  <ul className={homeOwner ? "sub active" : "sub"}>
                      <li><Link href="/login" onClick={ToggleAction}>Login</Link></li>
                      <li><Link href="/signup" onClick={ToggleAction}>Signup</Link></li>
                      <li><Link href="/search" onClick={ToggleAction}>Leave a review</Link></li>
                  </ul>
              </li>
              <li className="drop">
                  <div onClick={toggleProfessional}>For Professionals</div>
                  <ul className={professional ? "sub active" : "sub"}>
                      <li><Link href="/login" onClick={ToggleAction}>Login</Link></li>
                  </ul>
              </li>
              <li><Link href="/" onClick={ToggleAction}>Maintenance cover</Link></li>
            </ul>
          </nav>
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