import React from "react";
import Link from 'next/link'
export default function Help() {
  const help_cat = [
    {
      id:"account_management",
      title:"Account Management",
      "image":"/images/help1.svg",
    },
    {
      id:"booking_reservations",
      title:"Booking and Reservations",
      "image":"/images/help2.svg",
    },
    {
      id:"payments_billing",
      title:"Payments and Billing",
      "image":"/images/help3.svg",
    },
    {
      id:"service_providers",
      title:"Service Providers",
      "image":"/images/help4.svg",
    },
    {
      id:"troubleshooting",
      title:"Troubleshooting",
      "image":"/images/help5.svg",
    },
    {
      id:"contact_support",
      title:"Contact Support",
      "image":"/images/help6.svg",
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
            <div className="flex help_flex">
                {help_cat.map((val)=>{
                  return(
                    <div className="col" key={val.id}>
                      <div className="inner">
                        <Link href={`/help/${val.id}`}></Link>
                        <div className="img_icon">
                          <img src={val.image} alt={val.title}/>
                        </div>
                        <h5>{val.title}</h5>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
