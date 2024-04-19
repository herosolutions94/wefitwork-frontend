import React, { useState } from "react";
import Link from "next/link";
import Text from "../components/text";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import { parse } from "cookie";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { signin } from "../states/actions/signin";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
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
  if (authToken !== null) {
    return {
      redirect: {
        destination: "/buyer-dashboard", // Replace '/dashboard' with the appropriate URL
        permanent: false,
      },
    };
  }

  const result = await http
    .get("login-page")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Login({ result }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { from } = router.query;

  let { page_title, meta_desc, content, site_settings } = result;

  const isFormProcessing = useSelector(
    (state) => state.signin.isFormProcessing
  );

  let redirect_url = "";
  if (typeof window !== "undefined") {
    redirect_url = localStorage.getItem("redirect_url");
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSignin = (data, e) => {
    e.preventDefault();

    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^0\d{10}$/;
    // const phoneRegex = /^\+1[2-9]\d{2}[2-9](?!11)\d{6}$/;

    const isEmail = emailRegex.test(data.email);
    const isPhone = phoneRegex.test(data.email);

    if (isEmail) {
      data = { ...data, contact_type: "email" };
    } else if (isPhone) {
      data.email = data.email.slice(1);
      // console.log(data.email);
      data.email = "+234" + data.email;
      data = { ...data, contact_type: "phone" };
    } else {
      toast.error("Invalid email or phone format");
      return false;
    }

    // console.log(data);
    dispatch(signin(data, redirect_url ? redirect_url : from));
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
              <form method="POST" onSubmit={handleSubmit(handleSignin)}>
                <div className="form_blk">
                  <input
                    id="frm-email"
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="Enter your email or phone"
                    className="input"
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^0\d{10}$|^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email / phone format is not valid! Valid email format : abc@def.fgh. Valid phone format : 01231231234",
                      },
                    })}
                  />

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.email?.message}
                  </div>
                </div>
                <div className="form_blk">
                  <input
                    id="frm-password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input"
                    {...register("password", {
                      required: "Required",
                    })}
                  />
                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.password?.message}
                  </div>
                </div>
                <div className="have_check">
                  <div className="lbl_btn">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">
                      <Text string={content?.check_box_text} />
                    </label>
                  </div>
                  <Link href="/forgot-password">
                    <Text string={content?.forgot_pswd_text} />
                  </Link>
                </div>
                <div className="btn_blk">
                  <button
                    className="site_btn block"
                    type="submit"
                    disabled={isFormProcessing}
                  >
                    <Text string={content?.button_text} />
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
                    <Text string={content?.l_link_tagline} />
                    <Link href={content?.register_link}>
                      <Text string={content?.register_link_text} />
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
