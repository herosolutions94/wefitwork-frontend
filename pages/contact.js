import React, { useEffect, useState } from "react";
import Link from "next/link";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import InputMask from "react-input-mask";
import { saveContactQuery } from "../states/actions/contactUs";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from 'react-google-recaptcha'
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
  const result = await http
    .get("contact-us")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Contact({ result }) {
  let { page_title, meta_desc, content, site_settings } = result;

  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.contactUs.isFormProcessing
  );
  const isSaved = useSelector(
    (state) => state.contactUs.isSaved
  );
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue, reset
  } = useForm();

  const handleContactFormSubmit = (data, e) => {
    e.preventDefault();
    if (data?.recaptcha_token) {
      dispatch(saveContactQuery(data));
      // e.target.reset();


    }
    else {
      toast.error("Please verify your are not a robot!"); return;
    }
  };
  useEffect(() => {
    if (isSaved) {
      reset();
      setTimeout(() => {
        router.reload();
      }, 2000);
    }
  }, [isSaved]);

  const handleCaptchaChange = (value) => {
    setValue('recaptcha_token', value)
  };

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main>
        <section className="contact_pg">
          <div className="contain">
            <div className="sec_heading text-center">
              <h1>
                <Text string={content?.heading} />
              </h1>
            </div>
            <div className="cmn_blk">
              <div className="contact_flex flex">
                <div className="colL">
                  <h3>
                    <Text string={content?.sec4_heading} />
                  </h3>
                  <Text string={content?.sec4_detail} />
                  <div className="contact_info_blk">
                    <ul className="contact_info">
                      <li>
                        <span>
                          <img src="images/contact_email.svg" alt="" />
                        </span>
                        <Link
                          href={`mailto:${site_settings?.site_general_email}`}
                        >
                          <Text string={site_settings?.site_general_email} />
                        </Link>
                      </li>
                      <li>
                        <span>
                          <img src="images/contact_phone.svg" alt="" />
                        </span>
                        <Link href={`tel:${site_settings?.site_phone}`}>
                          <Text string={site_settings?.site_phone} />
                        </Link>
                      </li>
                      <li>
                        <span>
                          <img src="images/contact_map.svg" alt="" />
                        </span>
                        <p>
                          <Text string={site_settings?.site_address} />
                        </p>
                      </li>
                    </ul>
                    <div className="social_logon">
                      {site_settings?.site_facebook && (
                        <Link
                          href={site_settings?.site_facebook}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/images/facebook.svg" alt="" />
                        </Link>
                      )}

                      {site_settings?.site_twitter && (
                        <Link
                          href={site_settings?.site_twitter}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/images/twitter.svg" alt="" />
                        </Link>
                      )}

                      {site_settings?.site_instagram && (
                        <Link
                          href={site_settings?.site_instagram}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/images/instagram.svg" alt="" />
                        </Link>
                      )}

                      {site_settings?.site_linkedin && (
                        <Link
                          href={site_settings?.site_linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src="/images/linkedin.svg" alt="" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="colR">
                  <div className="inner">
                    <h3>
                      <Text string={content?.form_heading} />
                    </h3>
                    <form
                      onSubmit={handleSubmit(handleContactFormSubmit)}
                      method="POST"
                    >
                      <div className="form_blk">
                        <input
                          id="frm-name"
                          type="text"
                          name="full_name"
                          autoComplete="full_name"
                          placeholder="Full Name"
                          className="input"
                          {...register("full_name", {
                            required: "Full Name is required.",
                            pattern: {
                              value: /^[a-zA-Z][a-zA-Z ]*$/,
                              message: "Invalid Value",
                            },
                            minLength: {
                              value: 2,
                              message:
                                "Name should contains atleast 2 letters.",
                            },
                          })}
                        />
                        <div
                          className="validation-error"
                          style={{ color: "red" }}
                        >
                          {errors.full_name?.message}
                        </div>
                      </div>

                      <div className="form_blk">
                        <div className="d-flex align-items-center">
                          <img src="/images/ni-flag.png" alt="Nigerian Flag" style={{ width: "32px", height: "32px" }} />
                          <InputMask
                            id="frm-phone"
                            mask="99999999999"

                            name="phone"
                            autoComplete="tel"
                            placeholder="Phone Number"
                            className="input"
                            {...register("phone", {
                              required: "Phone Number is Required",
                            })}
                          />
                        </div>
                        {/* <img src="/images/ni-flag.png" alt="" srcset="" style={{width: "32px", height:"32px"}} />
                        <InputMask
                        
                          id="frm-phone"
                          mask="+999-999-9999 9999"
                          name="phone"
                          autoComplete="tel"
                          placeholder="Phone Number"
                          className="input"
                          {...register("phone", {
                            required: "Phone Number is Required",
                          })}
                        /> */}

                        <div
                          className="validation-error"
                          style={{ color: "red" }}
                        >
                          {errors.phone?.message}
                        </div>
                      </div>
                      <div className="form_blk">
                        <input
                          id="frm-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder="Email Address"
                          className="input"
                          {...register("email", {
                            required: "Email is required.",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Please enter a valid email",
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
                      <div className="form_blk">
                        <textarea
                          id="frm-message"
                          name="message"
                          className="input"
                          placeholder="Enter Your Message Here"
                          {...register("msg", {
                            required: "Message is required.",
                          })}
                        ></textarea>

                        <div
                          className="validation-error"
                          style={{ color: "red" }}
                        >
                          {errors.msg?.message}
                        </div>
                      </div>
                      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
                      <div className="btn_blk">
                        <button
                          type="submit"
                          className="site_btn min_wid"
                          disabled={isFormProcessing}
                        >
                          <Text string={content?.form_btn} />
                          {isFormProcessing && (
                            <i
                              className={
                                isFormProcessing ? "spinner" : "spinnerHidden"
                              }
                            ></i>
                          )}
                        </button>
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
