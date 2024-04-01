import React, { useState } from "react";
import Link from "next/link";
import Text from "../components/text";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { createAccount } from "../states/actions/signup";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { parse } from "cookie";
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
    .get("signup-page")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Signup({ result }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.signup.isFormProcessing
  );

  let { page_title, meta_desc, content, site_settings } = result;

  const { from } = router.query;
  // console.log('from', from);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleCreateAccount = (data, e) => {
    e.preventDefault();

    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+234\d{10}$/;
    // const phoneRegex = /^\+1[2-9]\d{2}[2-9](?!11)\d{6}$/;

    const isEmail = emailRegex.test(data.email);
    const isPhone = phoneRegex.test(data.email);

    if (isEmail) {
      data = { ...data, contact_type: "email" };
    } else if (isPhone) {
      data = { ...data, contact_type: "phone" };
    } else {
      toast.error("Invalid email or phone format");
      return false;
    }


    if (from == "become-professional") {
      data = { ...data, mem_type: "professional" };
    } else {
      data = { ...data, mem_type: "member" };
    }

    // console.log(data);
    dispatch(createAccount(data));
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
                {!from && (
                  <Link
                    href={content?.right_top_button_link}
                    className="site_btn"
                  >
                    <Text string={content?.right_top_button_text} />
                  </Link>
                )}
              </div>
            </div>
            <div className="right_inner">
              <h2>
                <Text string={content?.right_sec_heading} />
              </h2>
              <p>
                <Text string={content?.right_sec_tagline} />
              </p>
              <form method="POST" onSubmit={handleSubmit(handleCreateAccount)}>
                <div className="form_blk">
                  <input
                    id="full-name"
                    type="text"
                    name="fullname"
                    autoComplete="fullname"
                    placeholder="Full name"
                    className="input"
                    {...register("fullname", {
                      pattern: {
                        value: /^[a-zA-Z][a-zA-Z ]*$/,
                        message: "Invalid Value",
                      },
                      required: "Full Name is Rquired",
                    })}
                  />

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.fullname?.message}
                  </div>
                </div>

                <div className="form_blk relative">
                  <input
                    id="frm-email"
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="Email address/Phone Number"
                    className="input"
                    {...register("email", {
                      required: "Email / Phone is Required",
                      pattern: {
                        value: /^\+234\d{10}$|^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,


                        message:
                          " Email / phone format is not valid! Valid email format : abc@def.fgh. Valid phone format : +2341231231234 ",
                      },
                    })}
                  />
                  <div class="settings_header">
                    <div class="info">
                      <strong></strong>
                      <div class="infoIn ckEditor">
                        <Text string={content?.email_phone_tooltip} />
                      </div>
                    </div>

                  </div>
                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.email?.message}
                  </div>
                </div>

                <div className="form_blk">
                  <input
                    id="frm-password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input"
                    {...register("password", {
                      required: "Password is Required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]{8,}$/,
                        message:
                          "The password should contain at least 8 characters, that contain at least one lowercase letter, one uppercase letter and one numeric digit.",
                      },
                    })}
                  />

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.password?.message}
                  </div>
                </div>
                <div className="have_check">
                  <div className="lbl_btn">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      {...register("agree", { required: "Required" })}
                    />

                    <label htmlFor="agree">
                      <Text string={content?.check_box_text} />
                      <Link href="/terms-conditions">terms of use</Link> and our
                      <Link href="/privacy-policy">privacy notice</Link>.
                    </label>
                  </div>
                </div>
                <div className="validation-error" style={{ color: "red" }}>
                  {errors.agree?.message}
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
