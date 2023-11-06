import React,{useState} from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
export default function HelpDetails() {
  const[openCat,setOpenCat] = useState(false);
  const ToggleCat = () =>{
    setOpenCat(!openCat);
  }
  const router = useRouter();
  const path = router.asPath;
  const p_name = path.split('/');
  const pageName = p_name[p_name.length - 1];
  console.log(pageName);
  const cats =[
    {
      id:"account_management",
      title:"Account Management",
    },
    {
      id:"booking_reservations",
      title:"Booking and Reservations",
    },
    {
      id:"payments_billing",
      title:"Payments and Billing",
    },
    {
      id:"service_providers",
      title:"Service Providers",
    },
    {
      id:"troubleshooting",
      title:"Troubleshooting",
    },
    {
      id:"contact_support",
      title:"Contact Support",
    }
  ]
  return (
    <>
      <main>
        <section className="help_pg">
          <div className="contain">
            <div className="cntnt">
              <h1>How we can help you</h1>
                <form>
                  <input type="text" className="input" name="" placeholder={"Search.."}/>
                  <button type="submit"><img src="/images/search.svg" alt=""/></button>
                </form>
            </div>
            <div className="help_grid_devide">
                <div className="colL">
                    <h4 onClick={ToggleCat}>Categories</h4>
                    <ul className={openCat ? "side_cat_lst active" : "side_cat_lst"}>
                        {cats.map((val)=>{
                          return(
                            <li key={val.id} className={(pageName==val.id) ? "active" : ""}>
                              <Link href={`/help/${val.id}`}>{val.title}</Link>
                            </li>
                          );
                        })}
                    </ul>
                </div>
                <div className="colR">
                    <div className="sec_heading">
                        <h3>Account Management</h3>
                        <div className="mini_br"></div>
                    </div>
                    <div className="question_blk">
                      <h5>How to Create an Account</h5>
                      <ul>
                        <li><Link href="">A step-by-step guide to creating an account on our platform</Link></li>
                        <li><Link href="">A guide on how to book a handyman, plumber, electrician, etc</Link></li>
                      </ul>
                      <div className="mini_br"></div>
                      <h5>Changing Password</h5>
                      <ul>
                        <li><Link href="">Instructions on how to update your password for security</Link></li>
                        <li><Link href="">A guide on how to book a handyman, plumber, electrician, etc</Link></li>
                        <li><Link href="">Instructions on how to update your password for security</Link></li>
                      </ul>
                      <div className="mini_br"></div>
                      <h5>Modifying or Canceling a Booking</h5>
                      <ul>
                        <li><Link href="">A step-by-step guide to creating an account on our platform</Link></li>
                        <li><Link href="">A guide on how to book a handyman, plumber, electrician, etc</Link></li>
                        <li><Link href="">Instructions on how to update your password for security</Link></li>
                        <li><Link href="">A guide on how to book a handyman, plumber, electrician, etc</Link></li>
                        <li><Link href="">Instructions on how to update your password for security</Link></li>
                      </ul>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
