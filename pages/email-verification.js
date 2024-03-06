import React, { useState } from "react";
import Link from "next/link";
import Text from "../components/text";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import Image from "next/image";
import { cmsFileUrl } from "../helpers/helpers";
import OTPInput from "react-otp-input";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { parse } from "cookie";
import { getCookie } from "cookies-next";
import { verifyEmail } from "../states/actions/signup";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = async (context) => {
  // const { req } = context;
  // const cookieHeader = req.headers.cookie || "";
  // // Parse the cookie header to extract the specific cookie value
  // const cookieValue = parse(cookieHeader);
  // const authToken =
  //   cookieValue["authToken"] !== undefined &&
  //   cookieValue["authToken"] !== null &&
  //   cookieValue["authToken"] !== ""
  //     ? cookieValue["authToken"]
  //     : null;
  // if (authToken !== null) {
  //   return {
  //     redirect: {
  //       destination: "/buyer-dashboard", // Replace '/dashboard' with the appropriate URL
  //       permanent: false,
  //     },
  //   };
  // }

  const result = await http
    .get("email-verify-page")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function EmailVerification({ result }) {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.signup.isFormProcessing
  );

  let { page_title, meta_desc, content, site_settings } = result;

  const contactType = getCookie('contact_type');
  // console.log(contactType);
  

  const { handleSubmit, control, formState } = useForm();

  const handleVerifyEmail = (data, e) => {
    e.preventDefault();
    const mem_email = localStorage.getItem("email");
    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const phoneRegex = /^\+234\d{10}$/;
  const phoneRegex = /^\+1[2-9]\d{2}[2-9](?!11)\d{6}$/;

  const isEmail = emailRegex.test(mem_email);
  const isPhone = phoneRegex.test(mem_email);

  if (isEmail) {
    data = { ...data, contact_type: "email"}
  } else if (isPhone) {
    data = { ...data, contact_type: "phone"}

  } else {
    alert("Invalid email or phone format");
    return;
  } 

    data = { ...data, email: localStorage.getItem("email") };
    dispatch(verifyEmail(data));
  };

  const [emailVerify, setEmailVerify] = useState(false);

  // if (typeof window !== "undefined") {
  //   // Access localStorage here
  //   const user_email = localStorage.getItem('email');

  // }

  const resendEmail = async (e) => {
    setEmailVerify(true);
    var form_data = new FormData();
    const mem_email = localStorage.getItem("email");
    
    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const phoneRegex = /^\+234\d{10}$/;
  const phoneRegex = /^\+1[2-9]\d{2}[2-9](?!11)\d{6}$/;

  const isEmail = emailRegex.test(mem_email);
  const isPhone = phoneRegex.test(mem_email);

  if (isEmail) {
    form_data.append("contact_type", "email")
  } else if (isPhone) {
    form_data.append("contact_type", "phone")
  } else {
    alert("Invalid email or phone format");
    return;
  } 
    form_data.append("email", mem_email);

    await http.post("auth/resend-email", form_data).then((data) => {
      // console.log(data);
      setEmailVerify(false);
      if (data?.data?.status === 1) {
        toast.success(data?.data?.msg, { duration: 6000 });
      } else {
        if (data?.data?.validationErrors) {
          toast.error(<Text string={data.validationErrors} parse={true} />, {
            duration: 6000,
          });
        }
        toast.error(data?.data?.msg, { duration: 6000 });
      }
    });
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
            </div>
            <div className="right_inner">
            {contactType == 'phone' && <>
            <h2>
                <Text string={"Phone Verification"} />
              </h2>
              <p>
                <Text string={"We Have send an phone verification code on your phone number. Please Entre That six digit code to verify your account"} />
              </p>
            </>
            
            }
            {contactType == "email" && <>
            <h2>
                <Text string={content?.right_sec_heading} />
              </h2>
              <p>
                <Text string={content?.right_sec_tagline} />
              </p>
            </>}
              
              <form method="POST" onSubmit={handleSubmit(handleVerifyEmail)}>
                <div className="form_blk">
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Verify Code is required" }}
                    render={({ field, fieldState }) => (
                      <OTPInput
                        value={field.value}
                        onChange={field.onChange}
                        numInputs={6}
                        isInputNum
                        inputStyle={{ width: "50px" }}
                        renderSeparator={<span> &nbsp;-&nbsp; </span>}
                        renderInput={(props) => (
                          <input {...props} className="input" />
                        )}
                      />
                    )}
                  />
                </div>

                <div className="btn_blk">
                  <button
                    className="site_btn"
                    type="button"
                    onClick={resendEmail}
                    disabled={emailVerify}
                  >
                    <Text string={content?.left_tagline_link_text} />
                    {emailVerify && (
                      <i
                        className={emailVerify ? "spinner" : "spinnerHidden"}
                      ></i>
                    )}
                  </button>

                  <button
                    className="site_btn"
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
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
