import React, { useState } from "react";
import Link from "next/link";
import Text from "../components/text";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import { useForm } from "react-hook-form";
import { resetLinkRequest } from "../states/actions/forgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

export const getServerSideProps = async () => {
  const result = await http
    .get("reset-request-page")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function ForgotPassword({ result }) {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.forgetPassword.isFormProcessing
  );

  let { page_title, meta_desc, content, site_settings } = result;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleResetRequstSubmit = (data, e) => {
    e.preventDefault();
    dispatch(resetLinkRequest(data));
  };

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />

      <main className="logon_main">
        <section className="logon_sec">
          <div className="logon_left">
            <div className="inner">
              <h1>
                <Text string={content?.sec1_heading} />
              </h1>
              <Text string={content?.sec1_detail} />
            </div>
            <ul>
              <li>
                <Link href={content?.sec1_button1_link}>
                  <Text string={content?.sec1_button1_text} />
                </Link>
              </li>
              <li>
                <Link href={content?.sec1_button2_link}>
                  <Text string={content?.sec1_button2_text} />
                </Link>
              </li>
              <li>
                <Link href={content?.sec1_button3_link}>
                  <Text string={content?.sec1_button3_text} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="logon_right">
            <div className="login_header">
              <div className="logon_logo">
                <Link href="/">
                  <Image
                    src={cmsFileUrl(site_settings?.site_logo)}
                    width={220}
                    height={40}
                    alt={site_settings?.site_name}
                  />
                </Link>
              </div>
              <div className="btn_blk">
                <Link
                  href={content?.right_top_button_link}
                  className="site_btn"
                >
                  <Text string={content?.right_top_button_text} />
                </Link>
              </div>
            </div>
            <div className="right_inner">
              <h2>
                <Text string={content?.right_sec_heading} />
              </h2>
              <p>
                <Text string={content?.right_sec_tagline} />
              </p>
              <form
                method="POST"
                onSubmit={handleSubmit(handleResetRequstSubmit)}
              >
                <div className="form_blk">
                  <input
                    id="frm-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="input"
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                        message: "Email format is not valid!",
                      },
                    })}
                  />

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.email?.message}
                  </div>
                </div>

                <div className="btn_blk">
                  <button
                    className="site_btn block"
                    type="submit"
                    disabled={isFormProcessing}
                  >
                    <Text string={content?.submit_text} />
                    {isFormProcessing && (
                      <i
                        className={
                          isFormProcessing ? "spinner" : "spinnerHidden"
                        }
                      ></i>
                    )}
                  </button>
                </div>
                <div className="question">
                  <p>
                    <Text string={content?.left_tagline} />
                    <Link href={content?.link_url}>
                      <Text string={content?.left_tagline_link_text} />
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
