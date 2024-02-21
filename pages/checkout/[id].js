import React, { useState } from "react";
import Link from "next/link";
import http from "@/components/helpers/http";
import Text from "@/components/components/text";
import MetaGenerator from "@/components/components/meta-generator";
import Testimonials from "@/components/components/testimonials";
import {
  cmsFileUrl,
  doObjToFormData,
  format_amount_comma,
} from "@/components/helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { authToken } from "@/components/helpers/authToken";
import toast, { Toaster } from "react-hot-toast";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import { parse } from "cookie";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const m_id = encrypt_decrypt("decrypt", id);

  const { req } = context;
  const cookieHeader = req.headers.cookie || "";
  // Parse the cookie header to extract the specific cookie value
  const cookieValue = parse(cookieHeader);
  const authToken =
    cookieValue["authToken"] !== undefined &&
    cookieValue["authToken"] !== null &&
    cookieValue["authToken"] !== ""
      ? cookieValue["authToken"]
      : null;

  const result = await http
    .post(`checkout-page/${m_id}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Checkout({ result }) {
  let { page_title, meta_desc, content, maintenance_cover, included, memData } =
    result;

  const [step, setStep] = useState(0);
  const [cardMethod, setCardMethod] = useState(false);
  const toggleCard = () => {
    setCardMethod(!cardMethod);
    setPaypalMethod(false);
  };
  const [paypalMethod, setPaypalMethod] = useState(false);
  const togglePaypal = () => {
    setPaypalMethod(!paypalMethod);
    setCardMethod(false);
  };
  const NextToggle = () => {
    setStep(step + 1);
  };
  const BackToggle = () => {
    setStep(step - 1);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
    watch,
  } = useForm();

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="checkout_bdy">
          <div className="contain">
            <div className="sec_heading">
              <h1>
                <Text string={content?.sec1_heading} />
              </h1>
            </div>
            <div className="flex">
              <div className="colL">
                <div className="steps_bullets">
                  <span
                    className={
                      step == 0 || step == 1 || step == 2 ? "active" : ""
                    }
                  >
                    Personal Details
                  </span>
                  <span className={step == 1 || step == 2 ? "active" : ""}>
                    Terms and conditions
                  </span>
                  <span className={step == 2 ? "active" : ""}>Payment</span>
                </div>
                <div className="checkout_blk">
                  <form method="POST">
                    <fieldset className={step == 0 ? "active" : ""}>
                      <h4 className="heading">Please fill these fields</h4>
                      <div className="row form_row">
                        <div className="col-xs-6">
                          <h6>Full name</h6>
                          <input
                            type="text"
                            name="fullname"
                            className="input"
                            defaultValue={memData?.mem_fname}
                            {...register("fullname", {
                              pattern: {
                                value: /^[a-zA-Z][a-zA-Z ]*$/,
                                message: "Invalid Value",
                              },
                              required: "Full Name is Rquired",
                            })}
                          />
                          <div
                          className="validation-error"
                          style={{ color: "red" }}
                        >
                          {errors.fullname?.message}
                        </div>
                        </div>
                        
                        <div className="col-xs-6">
                          <h6>Email</h6>
                          <input
                            id="frm-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email address"
                            defaultValue={memData?.mem_email}
                            className="input"
                            {...register("email", {
                              required: "Email is Required",
                              pattern: {
                                value:
                                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                                message: "Email format is not valid!",
                              },
                            })}
                          />

                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.email?.message}
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <h6>Phone</h6>
                          <InputMask
                            id="phone"
                            mask="+234 999 999 9999"
                            name="phone"
                            autoComplete="phone"
                            value={memData?.mem_phone}
                            placeholder="Phone Number"
                            className="input"
                            {...register("phone", {
                              required: "Phone Number is Required",
                            })}
                          />
                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.phone?.message}
                          </div>
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
                        <button
                          type="button"
                          className="site_btn"
                          onClick={NextToggle}
                        >
                          Next
                        </button>
                      </div>
                    </fieldset>

                    <fieldset className={step == 1 ? "active" : ""}>
                      <h4 className="heading">Terms and conditions</h4>
                      <div className="row form_row">
                        <div className="col-xs-12">
                          <div className="block_terms">
                            <Text string={content?.sec1_detail} />
                          </div>
                          <div className="br"></div>
                          <div className="lbl_btn">
                            <input type="checkbox" name="same" id="agree" />
                            <label for="agree">
                              <Text string={content?.sec1_checkbox_text} />
                              <a href="/terms-conditions"> terms of use</a> and
                              our <a href="/privacy-policy">privacy notice</a>.
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-center">
                        <button
                          type="button"
                          className="site_btn color"
                          onClick={BackToggle}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="site_btn"
                          onClick={NextToggle}
                        >
                          Next
                        </button>
                      </div>
                    </fieldset>
                    <fieldset className={step == 2 ? "active" : ""}>
                      <h4 className="heading">Payment Methods</h4>
                      <div className="outer_method">
                        <div className="main_method">
                          <div className="blk_method">
                            <div className="lbl_btn">
                              <input
                                type="radio"
                                name="method"
                                value="card"
                                id="credit_card"
                              />
                              <label htmlFor="credit_card" onClick={toggleCard}>
                                <div className="img_icon">
                                  <img src="/images/credit-card.png" alt="" />
                                </div>
                                <span>Credit Card</span>
                              </label>
                            </div>
                            <div
                              className={
                                cardMethod
                                  ? "row form_row show_sec active"
                                  : "row form_row show_sec"
                              }
                            >
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
                              <input
                                type="radio"
                                name="method"
                                value="paypal"
                                id="paypal"
                              />
                              <label htmlFor="paypal" onClick={togglePaypal}>
                                <div className="img_icon">
                                  <img src="/images/paypal.png" alt="" />
                                </div>
                                <span>Paypal</span>
                              </label>
                            </div>
                            <div
                              className={
                                paypalMethod ? "show_sec active" : "show_sec"
                              }
                            >
                              <div className="image_paypal">
                                <img src="/images/card-out.svg" alt="" />
                              </div>
                              <p className="text-center">
                                After clicking "Submit", you will be redirected
                                to PayPal to complete your purchase securely.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-center">
                        <button
                          type="button"
                          className="site_btn color"
                          onClick={BackToggle}
                        >
                          Back
                        </button>
                        <button type="submit" className="site_btn">
                          Submit
                        </button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div className="colR">
                <div className="inner">
                  {/* <div className="img_icon">
                            <img src="/images/icon2.svg" alt="" />
                        </div> */}
                  <h3>
                    <Text string={maintenance_cover?.service_title} />
                  </h3>
                  <h1>
                    {format_amount_comma(parseFloat(maintenance_cover?.price))}{" "}
                    <sub>
                      {maintenance_cover?.interval == "monthly" && "Per Month"}{" "}
                      {maintenance_cover?.interval == "yearly" && "Per Year"}
                    </sub>
                  </h1>
                  <div className="bdy_in">
                    <p>
                      <Text string={maintenance_cover?.short_desc} />
                    </p>
                    <ul>
                      {included?.map((inc) => {
                        return (
                          <li key={inc?.id}>
                            <Text string={inc?.title} />
                          </li>
                        );
                      })}
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
