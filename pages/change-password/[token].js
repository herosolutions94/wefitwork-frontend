import React, { useState } from "react";
import Link from "next/link";
import http from "@/components/helpers/http";
import Text from "@/components/components/text";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { resetPassword } from "@/components/states/actions/forgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { doObjToFormData, cmsFileUrl } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";

export const getServerSideProps = async (context) => {
  const { token } = context.query;
  const params = {};
  const result = await http
    .post(`reset-password-page`, doObjToFormData(params))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);
  return { props: { result, token } };
};

export default function ResetPassword({ result, token }) {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.forgetPassword.isFormProcessing
  );
  let { page_title, meta_desc, content, site_settings } = result;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const handleResetPassword = (data, e) => {
    e.preventDefault();
    data = { ...data, token };
    dispatch(resetPassword(data));
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
              <form method="POST" onSubmit={handleSubmit(handleResetPassword)}>
                <div className="form_blk">
                  <input
                    id="frm-password"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    className="input"
                    {...register("password", {
                      required: "Required",
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
                <div className="form_blk">
                  <input
                    id="frm-r-password"
                    type="password"
                    name="c_password"
                    placeholder="Confirm new password"
                    className="input"
                    {...register("c_password", {
                      required: "Confirm Password is required.",
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your passwords do no match.";
                        }
                      },
                    })}
                  />
                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.c_password?.message}
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
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
