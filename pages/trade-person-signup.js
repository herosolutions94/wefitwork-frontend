import React, { useState} from "react";
import Link from 'next/link';
export default function TradePersonSignup() {
    const [payment, setPayment] = useState("credit_card");
    const [step, setStep] = useState(1);
    const handleNext = () => {
        setStep(step + 1);
      };
    
      const handleBack = () => {
        setStep(step - 1);
      };
      const handleSubmit = () => {
        onClose();
      };
      const [selectedValue, setSelectedValue] = useState(null);
      const [employeValue, setEmployeValue] = useState(null);

        const handleLabelClick = (event, id) => {
            setSelectedValue(id);
        };
        const handleEmployeeLabelClick = (event, id) => {
            setEmployeValue(id);
        };
        const business_type = [
        {
          id:"self",
          title:"Self Employed",
        },
        {
          id:"limited",
          title:"Limited company",
        },
        {
          id:"start",
          title:"Looking to start a business",
        },
      ]
      const employes = [
        {
          id:"1",
          title:"1",
        },
        {
          id:"2_5",
          title:"2-5",
        },
        {
          id:"6_9",
          title:"6-9",
        },
        {
            id:"10",
            title:"10+",
          },
      ]
      const question_add = [
        {
          id:"fill_gap",
          title:"I’m looking to fill the gaps in my diary",
        },
        {
          id:"flow_leads",
          title:"I need a steady flow of leads",
        },
        {
          id:"leads",
          title:"I need as many leads as possible",
        },
        {
            id:"profile",
            title:"I just want a Checkatrade profile",
          },
          {
            id:"not_sure",
            title:"I’m not sure",
          },
      ]
  return (
    <>
      <main className="logon_main">
        <section className="logon_sec">
            <div className="logon_left">
                <div className="inner">
                    <div className={step === 4 ? 'hide_text' : ''}>
                        <div className="inner_text">
                            <h1>Hello Friend</h1>
                            <p>Unlock New Opportunities Connect, Showcase, and Grow Your Services in One Place.</p>
                        </div>
                        <div className="membership_card">
                            <div className="inner_membership">
                                <div className="mini_pro">
                                    <img src="/images/pro_membership.svg" alt="" />
                                    <span>PRO</span>
                                </div>
                                <div className="price_head">
                                    <h2>₦1000 <span>per Month</span></h2>
                                </div>
                                <ul>
                                    <li>Unlimited Access</li>
                                    <li>Exclusive Features</li>
                                    <li>Enhanced Support</li>
                                    <li>Easy Billing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <ul>
                    <li><Link href="/contact">Contact  Us</Link></li>
                    <li><Link href="/contact">Terms of use</Link></li>
                    <li><Link href="/contact">Privacy Policy</Link></li>
                </ul>
            </div>
            <div className="logon_right">
                <div className="login_header trade_person_header">
                    <div className="logon_logo">
                        <Link href="/">
                            <img src="images/logo_log.svg" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="right_inner">
                    <form action="">
                        <div className="multi-step-form trade_register_form">
                            <div className={`step ${step === 1 ? 'field_set active' : 'field_set'}`}>
                                <h6>What Service You Offered</h6>
                                <div className="form_blk">
                                    <select name="" className="input">
                                        <option>Choose offered service</option>
                                        <option value="electrician">Electrician</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Handyman">Handyman</option>
                                    </select>
                                </div>
                            </div>
                            <div className={`step ${step === 2 ? 'field_set active' : 'field_set'}`}>
                                
                                <div className="form_blk">
                                    <h6>What is your business called?</h6>
                                    <input type="text" name="" className="input" placeholder="Enter your business name"/>
                                </div>
                                <div className="form_blk">
                                    <h6>Address of your business</h6>
                                    <input type="text" name="" className="input" placeholder="Enter address of your business"/>
                                </div>
                                <div className="form_blk">
                                    <h6>Business type</h6>
                                    <ul className='l_flex two_flex last_full'>
                                        {business_type.map((val)=>{
                                            return(
                                            <li key={val.id}>
                                                <div className={`lbl_btn ${selectedValue === val.id ? 'active' : ''}`}>
                                                <input type='radio' name='business_type' value={val.title} id={val.id} checked={selectedValue === val.id} onChange={() => setSelectedValue(val.id)}/>
                                                <label htmlFor={val.id} onClick={(e) => handleLabelClick(e, val.id)}>{val.title}</label>
                                                </div>
                                            </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="form_blk">
                                    <h6>How many employes do you have?</h6>
                                    <ul className='l_flex no_wrap_flex'>
                                        {employes.map((val)=>{
                                            return(
                                            <li key={val.id}>
                                                <div className={`lbl_btn ${selectedValue === val.id ? 'active' : ''}`}>
                                                <input type='radio' name='employes' value={val.title} id={val.id} checked={employeValue === val.id} onChange={() => setEmployeValue(val.id)}/>
                                                <label htmlFor={val.id} onClick={(e) => handleEmployeeLabelClick(e, val.id)}>{val.title}</label>
                                                </div>
                                            </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className={`step ${step === 3 ? 'field_set active' : 'field_set'}`}>
                                
                                
                                <div className="form_blk">
                                    <h6>What are you looking for?</h6>
                                    <ul className='l_flex all_full'>
                                        {question_add.map((val)=>{
                                            return(
                                            <li key={val.id}>
                                                <div className={`lbl_btn ${selectedValue === val.id ? 'active' : ''}`}>
                                                <input type='radio' name='business_type' value={val.title} id={val.id} checked={selectedValue === val.id} onChange={() => setSelectedValue(val.id)}/>
                                                <label htmlFor={val.id} onClick={(e) => handleLabelClick(e, val.id)}>{val.title}</label>
                                                </div>
                                            </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                               
                            </div>
                            <div className={`step checkout_step ${step === 4 ? 'field_set active' : 'field_set'}`}>
                                <div className="form_blk">
                                    <h6>Checkout</h6>
                                    <div className="btn_blk payment_btn">
                                        <button type="button" className={`site_btn blank credit ${payment === "credit_card" ? 'active' : ''}`} onClick={() => setPayment("credit_card")}><img src="/images/creditcard.svg" alt="credit card" /><span>Credit Card</span></button>
                                        <button type="button" className={`site_btn blank paypal ${payment === "pay_pal" ? 'active' : ''}`} onClick={() => setPayment("pay_pal")}><img src="/images/paypal-solid.svg" alt="credit card" /><span>Pay Pal</span></button>
                                    </div>
                                    <div className={`credit_fields ${payment === "credit_card" ? '' : "hide"}`}>
                                        <div className="form_blk relative_field">
                                            <input type="text" name="" placeholder="Card number" className="input"/>
                                            <img src="/images/ri_visa-line.svg" alt="" />
                                        </div>
                                        <div className="form_blk">
                                            <input type="text" name="" placeholder="Card holder name" className="input"/>
                                        </div>
                                        <div className="flex flex_blk">
                                            <input type="text" name="" placeholder="Exp. Date" className="input"/>
                                            <input type="text" name="" placeholder="CVV" className="input"/>
                                        </div>
                                    </div>
                                    <div className={`credit_fields ${payment === "pay_pal" ? '' : "hide"}`}>
                                        <p>After clicking "Submit", you will be redirected to PayPal to complete your purchase securely.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="btn_blk text-center">
                                {step > 1 && <button onClick={handleBack} className='site_btn color' type="button">Back</button>}
                                {step < 4 ? (
                                <button onClick={handleNext} className='site_btn' type="button">Next</button>
                                ) : (
                                <button onClick={handleSubmit} className='site_btn' type="button">Submit</button>
                                )}
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
