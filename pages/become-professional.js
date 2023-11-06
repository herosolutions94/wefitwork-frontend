import React from "react";
import Link from "next/link";
export default function BecomeProfessional() {
  const how_work = [
    {
      id:"step1",
      icon:"/images/step1.svg",
      title:"Join Our Platform",
      pera:"Create your professional profile by signing up with your details. Provide accurate information about your skills, experience, and services."
    },
    {
      id:"step2",
      icon:"/images/step2.svg",
      title:"Profile Approval",
      pera:"Our team will review your profile to ensure it meets our quality standards. This step is crucial to maintaining the trust of our users."
    },
    {
      id:"step3",
      icon:"/images/step3.svg",
      title:"Subscription",
      pera:"Select a subscription plan that suits your needs. Subscribing unlocks your ability to offer services to buyers."
    },
    {
      id:"step4",
      icon:"/images/step4.svg",
      title:"Set Your Availability",
      pera:"Customize your availability to match your schedule. Choose the days and times you'll be available for bookings."
    },
    {
      id:"step5",
      icon:"/images/step5.svg",
      title:"Respond to Bookings",
      pera:"Once a buyer requests your service, you'll receive a notification. Review the details and accept or decline the booking."
    },
    {
      id:"step6",
      icon:"/images/step6.svg",
      title:"Communication",
      pera:"Chat with buyers in real-time to discuss project specifics, quotes, and scheduling."
    },
    {
      id:"step7",
      icon:"/images/step7.svg",
      title:"Service Delivery",
      pera:"Provide high-quality service to your clients, ensuring their satisfaction."
    },
    {
      id:"step8",
      icon:"/images/step8.svg",
      title:"Receive Reviews",
      pera:"Buyers can leave reviews to build your reputation. Positive reviews can help you attract more clients."
    },
  ]
  return (
    <>
      <main>
          <section className="become_professional_banner">
            <div className="contain">
                <div className="flex">
                  <div className="colL">
                    <div className="sec_heading">
                      <h1>Join Our Network of Skilled Professionals</h1>
                    </div>
                    <p>Are you a skilled handyman, plumber, electrician, roofer, or any other professional looking to expand your client base? Join our platform and connect with homeowners in need of your services.</p>
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                      <Link href="/trade-person-signup" className="site_btn color min_wid">Get Started</Link>
                    </div>
                  </div>
                  <div className="colR">
                    <div className="image">
                      <img src="/images/banner3.png" alt=""/>
                    </div>
                  </div>
                </div>
            </div>
          </section>
          <section className="choose_us_sec">
            <div className="contain">
                <Link href="" className="announcment_lbl">
                  <img src="/images/label.png" alt=""/>
                </Link>
                <div className="sec_heading">
                  <h2>Why Choose Us</h2>
                  <p>By becoming a professional on our platform, you gain access to a vast network of potential clients, a user-friendly platform, and our dedicated support team to help you every step of the way.</p>
                </div>
                <div className="inner_choose">
                  <h4>Key Features for Professionals</h4>
                  <ul>
                    <li>
                      <h5>Subscription Options</h5>
                      <p>Select the subscription plan that fits your business needs.</p>
                    </li>
                    <li>
                      <h5>Exposure to Clients</h5>
                      <p>Increase your visibility to potential clients who are actively searching for services like yours.</p>
                    </li>
                    <li>
                      <h5>Real-Time Communication</h5>
                      <p>Communicate with clients in real-time to discuss projects and schedule bookings.</p>
                    </li>
                    <li>
                      <h5>Mobile-Responsive Profiles</h5>
                      <p>Your profile looks great on all devices, making it easy for clients to find and contact you.</p>
                    </li>
                  </ul>
                </div>
            </div>
          </section>
          <section className="professional_how_it_works">
            <div className="contain">
              <div className="sec_heading">
                <h2>How it works</h2>
                <p>Create your professional profile by signing up with your details. Provide accurate information about your skills, experience, and services. Create your professional profile by signing up with your details.</p>
              </div>
              <div className="flex">
                {how_work.map((val)=>{
                  return(
                    <div className="col" key={val.id}>
                        <div className="inner">
                          <div className="img_icon">
                            <img src={val.icon} alt={val.title} />
                          </div>
                          <h5>{val.title}</h5>
                          <p>{val.pera}</p>
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="join_now">
            <div className="contain">
              <div className="flex">
                <div className="colL">
                  <div className="image">
                    <img src="/images/choose.png" alt=""/>
                  </div>
                </div>
                <div className="colR">
                  <div className="inner">
                    <div className="sec_heading">
                      <h2>Join Our Network</h2>
                      <p>We believe in transparency, and we're committed to providing you with a platform you can trust. Your convenience and peace of mind are our top priorities.</p>
                    </div>
                    
                    <ul>
                      <li>WEFITWORK is designed with your needs in mind, offering a user-friendly experience.</li>
                      <li>Enjoy the convenience of finding, booking, and communicating with service providers in one place.</li>
                    </ul>
                    <div className="mini_br"></div>
                    <div className="btn_blk">
                      <Link href="" className="site_btn color min_wid">Get Started</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="ready_sec">
            <div className="contain">
              <div className="cntnt">
                <div className="sec_heading">
                  <h2>Ready to start with us?</h2>
                </div>
                <p>Are you a skilled handyman, plumber, electrician, roofer, or any other professional looking to expand your client base? Join our platform and connect with homeowners in need of your services.</p>
                <p>Our support team is available to assist you during business hours.</p>
                <div className="btn_blk text-center">
                  <Link href="" className="site_btn min_wid">Get Started</Link>
                </div>
                <h6>or speak with an advisor today</h6>
                <Link href="" className="call_btn">Call  +942-4289-292</Link>
              </div>
            </div>
          </section>
      </main>
    </>
  );
}
