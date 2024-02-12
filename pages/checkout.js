import React, { useState } from "react";
import Link from "next/link";
import http from "../helpers/http";
import Text from "../components/text";
import MetaGenerator from "../components/meta-generator";
import Testimonials from "../components/testimonials";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { authToken } from "../helpers/authToken";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
    const[step , setStep] = useState(0);
    const[cardMethod , setCardMethod] = useState(false);
    const toggleCard = () =>{
        setCardMethod(!cardMethod);
        setPaypalMethod(false);
    }
    const[paypalMethod , setPaypalMethod] = useState(false);
    const togglePaypal = () =>{
        setPaypalMethod(!paypalMethod);
        setCardMethod(false);
    }
    const NextToggle = () =>{
        setStep(step + 1);
    }
    const BackToggle = () =>{
        setStep(step - 1);
    }
    
  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator />
      <main>
        <section className="checkout_bdy">
          <div className="contain">
            <div className="sec_heading">
                <h1>Maintenance Cover Checkout</h1>
            </div>
            <div className="flex">
                <div className="colL">
                    <div className="steps_bullets">
                        <span className={step == 0 || step == 1 || step == 2 ? "active" : ""}>Personal Details</span>
                        <span className={step == 1 || step == 2 ? "active" : ""}>Terms and conditions</span>
                        <span className={step == 2 ? "active" : ""}>Payment</span>
                    </div>
                    <div className="checkout_blk">
                        <form>
                            <fieldset className={step == 0 ? "active" : ""}>
                                <h4 className="heading">Please fill these fields</h4>
                                <div className="row form_row">
                                    <div className="col-xs-6">
                                        <h6>First name</h6>
                                        <input type="text" name="fname" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Last name</h6>
                                        <input type="text" name="lname" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Phone</h6>
                                        <input type="text" name="phone" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Type of house</h6>
                                        <select className="input" name="">
                                            <option value="">Studio</option>
                                            <option value="">2 bedroom</option>
                                            <option value="">3 bedroom</option>
                                            <option value="">4+ bedrooms</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-12">
                                        <h6>Address</h6>
                                        <input type="text" name="address" className="input" />
                                    </div>
                                    
                                </div>
                                <div className="br"></div>
                                <div className="btn_blk text-center">
                                    <button type="button" className="site_btn" onClick={NextToggle}>Next</button>
                                </div>
                            </fieldset>

                            <fieldset className={step == 1 ? "active" : ""}>
                                <h4 className="heading">Terms and conditions</h4>
                                <div className="row form_row">
                                    <div className="col-xs-12">
                                        <div className="block_terms">
                                            <p>ThisTerms & Conditions describes how [Your Company Name] ("we," "us," or "our") collects, uses, and shares personal information when you visit our website [Your Website URL] (the "Site"). By accessing or using the Site, you consent to the practices described in this policy.</p>
                                            <h4>Information We Collect</h4>

                                            <h5>Personal Information</h5>

                                            <p>We may collect personal information such as:</p>

                                            <ul>
                                                <li>Name</li>
                                                <li>Email address</li>
                                                <li>Postal address</li>
                                                <li>Phone number</li>
                                                <li>Other information you provide voluntarily</li>
                                            </ul>

                                            <h5>Non-Personal Information</h5>

                                            <p>We may also collect non-personal information, including:</p>

                                            <ul>
                                                <li>Browser information</li>
                                                <li>IP address</li>
                                                <li>Cookies and similar tracking technologies</li>
                                            </ul>

                                            <h5>How We Use Your Information</h5>

                                            <p>We use your personal information for the following purposes:</p>

                                            <ul>
                                                <li>To respond to your inquiries and requests</li>
                                                <li>To provide, maintain, and improve our services</li>
                                                <li>To send promotional emails, newsletters, and updates (you can opt out at any time)</li>
                                                <li>To fulfill any other purpose for which you provide your information</li>
                                            </ul>

                                            <h5>Information Sharing</h5>

                                            <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:</p>

                                            <ul>
                                                <li>Service providers and business partners who assist in our operations</li>
                                                <li>Legal authorities when required by law</li>
                                                <li>Third parties in connection with the sale, merger, or transfer of all or part of our business</li>
                                            </ul>

                                            <h5>Cookies</h5>

                                            <p>We use cookies and similar tracking technologies to improve your experience on our Site. You can control the use of cookies through your browser settings.</p>

                                            <h5>Links to Third-Party Websites</h5>

                                            <p>Our Site may contain links to third-party websites. We are not responsible for the privacy practices of these sites. Please read their privacy policies.</p>

                                            <h5>Security</h5>

                                            <p>We take appropriate measures to protect your personal information. However, no online data transmission can be completely secure, and we cannot guarantee the security of your information.</p>

                                            <h5>Your Choices</h5>

                                            <p>You can review, update, and delete your personal information by contacting us. You can also opt out of receiving promotional emails by using the &quot;Unsubscribe&quot; link in our emails.</p>

                                            <h5>Changes to this Privacy Policy</h5>

                                            <p>We may update this Privacy Policy. The revised version will be posted on this page, and the changes will be effective when posted.</p>
                                            
                                        </div>
                                        <div className="br"></div>
                                        <div className="lbl_btn">
                                                <input type="checkbox" name="same" id="agree"/>
                                                <label for="agree">By creating an account you confirm that you agree to our website <a href="/terms-conditions"> terms of use</a> and our <a href="/privacy-policy">privacy notice</a>.</label>
                                            </div>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="btn_blk text-center">
                                    <button type="button" className="site_btn color" onClick={BackToggle}>Back</button>
                                    <button type="button" className="site_btn" onClick={NextToggle}>Next</button>
                                </div>
                            </fieldset>
                            <fieldset className={step == 2 ? "active" : ""}>
                                <h4 className="heading">Payment Methods</h4>
                                <div className="outer_method">
                                    <div className="main_method">
                                        <div className="blk_method">
                                            <div className="lbl_btn">
                                                <input type="radio" name="method" value="card" id="credit_card" />
                                                <label htmlFor="credit_card" onClick={toggleCard}>
                                                    <div className="img_icon">
                                                        <img src="/images/credit-card.png" alt=""/>
                                                    </div>
                                                    <span>Credit Card</span>
                                                </label>
                                            </div>
                                            <div className={cardMethod ? "row form_row show_sec active" : "row form_row show_sec"}>
                                                <div className="col-xs-6">
                                                    <h6>Card number</h6>
                                                    <input type="text" name="" className="input" />
                                                </div>
                                                <div className="col-xs-6">
                                                    <h6>Card holder</h6>
                                                    <input type="text" name="" className="input" />
                                                </div>
                                                <div className="col-xs-6">
                                                    <h6>Expiry(mm/dd/yy)</h6>
                                                    <input type="text" name="" className="input" />
                                                </div>
                                                <div className="col-xs-6">
                                                    <h6>CVC</h6>
                                                    <input type="text" name="" className="input" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="blk_method">
                                            <div className="lbl_btn">
                                                <input type="radio" name="method" value="paypal" id="paypal"/>
                                                <label htmlFor="paypal" onClick={togglePaypal}>
                                                    <div className="img_icon">
                                                        <img src="/images/paypal.png" alt=""/>
                                                    </div>
                                                    <span>Paypal</span>
                                                </label>
                                            </div>
                                            <div className={paypalMethod ? "show_sec active" : "show_sec"}>
                                                <div className="image_paypal">
                                                    <img src="/images/card-out.svg" alt="" />
                                                </div>
                                                <p className="text-center">After clicking "Submit", you will be redirected to PayPal to complete your purchase securely.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="btn_blk text-center">
                                    <button type="button" className="site_btn color" onClick={BackToggle}>Back</button>
                                    <button type="submit" className="site_btn">Submit</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="colR">
                    <div className="inner">
                        <div className="img_icon">
                            <img src="/images/icon2.svg" alt="" />
                        </div>
                        <h3>Electrician Services</h3>
                        <h1>$5,00 <sub>per month</sub></h1>
                        <div className="bdy_in">
                        <p>Keep your home in top shape with routine checks and repairs for</p>
                        <ul>
                            <li>Electrical Installation and Wiring</li>
                            <li>Electrical Repairs</li>
                            <li>Safety Inspections</li>
                            <li>Panel Upgrades</li>
                            <li>Lighting Solutions</li>
                        </ul>
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
