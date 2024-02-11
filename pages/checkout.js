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
            <div className="sec_heading text-center">
                <h1>Maintenance Cover Checkout</h1>
            </div>
            <div className="flex">
                <div className="colL">
                    <div className="checkout_blk">
                        <form>
                            <fieldset className={step == 0 ? "active" : ""}>
                                <h4 className="heading">Please select answers</h4>
                                <div className="row form_row">
                                    <div className="col-xs-6">
                                        <h6>What kind of premises is it?</h6>
                                        <select className="input" name="">
                                            <option value="commercial">Commercial</option>
                                            <option value="Residential">Residential</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>What kind of apartment is it</h6>
                                        <select className="input" name="">
                                            <option value="studio">Studio</option>
                                            <option value="flat">Flat</option>
                                            <option value="terrace">Terrace</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>How long have you lived here</h6>
                                        <select className="input" name="">
                                            <option value=""></option>
                                        </select>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="btn_blk text-center">
                                    <button type="button" className="site_btn" onClick={NextToggle}>Next</button>
                                </div>
                            </fieldset>

                            <fieldset className={step == 1 ? "active" : ""}>
                                <h4 className="heading">Billing Address</h4>
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
                                        <h6>Email</h6>
                                        <input type="text" name="email" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Phone</h6>
                                        <input type="text" name="phone" className="input" />
                                    </div>
                                    <div className="col-xs-12">
                                        <h6>Billing Address</h6>
                                        <input type="text" name="address" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>City</h6>
                                        <input type="text" name="" className="input"/>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>State</h6>
                                        <select className="input" name="">
                                            <option value="usa">Select State</option>
                                            <option value="can">Canada</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Zip Code</h6>
                                        <input type="text" name="zipcode" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Country</h6>
                                        <select className="input" name="">
                                            <option value="af">Afghanistan</option>
                                            <option value="al">Albania</option>
                                            <option value="dz">Algeria</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-12">
                                        <div className="lbl_btn">
                                            <input type="checkbox" name="same" id="same"/>
                                            <label htmlFor="same">Billing Address and Shipping Address Same.</label>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>First name</h6>
                                        <input type="text" name="fname" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Last name</h6>
                                        <input type="text" name="lname" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Email</h6>
                                        <input type="text" name="email" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Phone</h6>
                                        <input type="text" name="phone" className="input" />
                                    </div>
                                    <div className="col-xs-12">
                                        <h6>Shipping Address</h6>
                                        <input type="text" name="address" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>City</h6>
                                        <input type="text" name="" className="input"/>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>State</h6>
                                        <select className="input" name="">
                                            <option value="usa">Select State</option>
                                            <option value="can">Canada</option>
                                        </select>
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Zip Code</h6>
                                        <input type="text" name="zipcode" className="input" />
                                    </div>
                                    <div className="col-xs-6">
                                        <h6>Country</h6>
                                        <select className="input" name="">
                                            <option value="af">Afghanistan</option>
                                            <option value="al">Albania</option>
                                            <option value="dz">Algeria</option>
                                        </select>
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
                        <h1>$5,00</h1>
                        <p>a month in your first year</p>
                        <div className="mini_br"></div>
                        <div className="bdy_in">
                            <h4>Annual price :	$40</h4>
                            <h4>Your excess :	$50</h4>
                            <div className="mini_br"></div>
                            <p>Your price will increase at renewal, but you’ll always receive a reminder. If you choose to continue into your second year, the expected price for customers who haven’t made a claim is $560 a month* ($560 for the year).</p>
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
