import React, { useState} from "react";
import Link from 'next/link'
export default function Contact() {
    async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
    }
  return (
    <>
      <main>
        <section className="contact_pg">
            <div className="contain">
                <div className="sec_heading text-center">
                    <h1>Get In Touch With Us</h1>
                </div>
                <div className="cmn_blk">
                    <div className="contact_flex flex">
                        <div className="colL">
                            <h3>Let’s discuss on something cool together</h3>
                            <p>Suspendisse posuere nisi eu neque pharetra tristique iaculis erat tempor. Curabitur sed justo auctor sodals nunc in finibus purus donec tellus tristique iaculis erat tempor.</p>
                            <div className="contact_info_blk">
                                <ul className="contact_info">
                                    <li>
                                        <span><img src="images/contact_email.svg" alt="" /></span>
                                        <Link href="mailto:wefitwork@gmail.com">wefitwork@gmail.com</Link>
                                    </li>
                                    <li>
                                        <span><img src="images/contact_phone.svg" alt="" /></span>
                                        <Link href="tel:+123456789">+123 456 789</Link>
                                    </li>
                                    <li>
                                        <span><img src="images/contact_map.svg" alt="" /></span>
                                        <p>123 Street 456 House</p>
                                    </li>
                                </ul>
                                <div className="social_logon">
                                    <Link href="/" target="_blank" rel="noreferrer">
                                    <img src="/images/facebook.svg" alt="" />
                                    </Link>
                                    <Link href="/" target="_blank" rel="noreferrer">
                                    <img src="/images/twitter.svg" alt="" />
                                    </Link>
                                    <Link href="/" target="_blank" rel="noreferrer">
                                    <img src="/images/instagram.svg" alt="" />
                                    </Link>
                                    <Link href="/" target="_blank" rel="noreferrer">
                                    <img src="/images/linkedin.svg" alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="colR">
                            <div className="inner">
                                <h3>Need Any Help?</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form_blk">
                                        <input
                                        id="frm-name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        placeholder="Full Name"
                                        className="input"
                                        required
                                        />
                                    </div>
                                    <div className="form_blk">
                                        <input
                                        id="frm-phone"
                                        type="text"
                                        name="phone"
                                        autoComplete="tel"
                                        placeholder="Phone Number"
                                        className="input"
                                        required
                                        />
                                    </div>
                                    <div className="form_blk">
                                        <input
                                        id="frm-email"
                                        type="email"
                                        name="email"
                                        autoComplete="tel"
                                        placeholder="Email Address"
                                        className="input"
                                        required
                                        />
                                    </div>
                                    <div className="form_blk">
                                        <textarea id="frm-message" name="message" className="input" placeholder="Enter Your Message Here"></textarea>
                                    </div>
                                    <div className="btn_blk">
                                        <button type="submit" className="site_btn min_wid">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
