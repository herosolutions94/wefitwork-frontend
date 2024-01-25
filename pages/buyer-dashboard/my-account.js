import React, { useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import {
  fetchBuyerAccountSettings,
  changeBuyerPassword,
} from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";

export default function MyAccount() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);
  const isPassChangeProcessing = useSelector(
    (state) => state.account.isPassChangeProcessing
  );

  const { page_title } = data;

  useEffect(() => {
    dispatch(fetchBuyerAccountSettings());
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const handleSavePassword = (data, e) => {
    e.preventDefault();
    dispatch(changeBuyerPassword(data));
  };

  return (
    <>
      <NextNProgress color="#004AAD" />
      <main>
        <Toaster position="top-center" />
        <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
        <section className="dashboard">
          <div className="contain">
            <div className="layout_sidebar flex">
              <div className="colL">
                <BuyerSidebar data={"account"} />
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h2>My Account</h2>
                </div>
                <div className="profile_blk custom_blk">
                  {isLoading && (
                    <>
                      <div className="br"></div>
                      <div className="text-center">
                        <div
                          className="spinner-border text-danger"
                          role="status"
                          style={{ width: "3rem", height: "3rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </>
                  )}
                  {!isLoading && (
                    <form
                      method="POST"
                      onSubmit={handleSubmit(handleSavePassword)}
                    >
                      <div className="from_row row">
                        <div className="col-sm-12">
                          <div className="blk_form">
                            <h6>Email</h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="email"
                                defaultValue={member?.mem_email}
                                className="input"
                                readOnly
                              />
                              <button type="button" className="verfiy_btn">
                                Verfiy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="sec_heading">
                        <h4>Update Password</h4>
                      </div>
                      <div className="from_row row">
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>Current Password</h6>
                            <div className="form_blk">
                              <input
                                type="password"
                                name="pass"
                                placeholder="Entre Current Password"
                                className="input"
                                {...register("pass", {
                                  required: "Current password is required.",
                                })}
                              />

                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.pass?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>New Password</h6>
                            <div className="form_blk">
                              <input
                                type="password"
                                name="new_pass"
                                placeholder="Entre New Password"
                                className="input"
                                {...register("new_pass", {
                                  required: "New password is required.",
                                })}
                              />
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.new_pass?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>Repeat Password</h6>
                            <div className="form_blk">
                              <input
                                type="password"
                                name="confirm_pass"
                                placeholder="Repeat New Password"
                                className="input"
                                {...register("confirm_pass", {
                                  required: "Confirm Password is required.",
                                  validate: (val) => {
                                    if (watch("new_pass") != val) {
                                      return "Your passwords do no match.";
                                    }
                                  },
                                })}
                              />
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.confirm_pass?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="del_account">
                        <div className="dell_left">
                          <h5>Delete Account</h5>
                          <p>Delete your account and all the data</p>
                        </div>
                        <div className="btn_blk">
                          <button
                            type="button"
                            className="site_btn blank blank_red"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-right cell_wide_full">
                        <button
                          type="submit"
                          className="site_btn"
                          disabled={isPassChangeProcessing}
                        >
                          Save changes
                          {isPassChangeProcessing && (
                            <i
                              className={
                                isPassChangeProcessing
                                  ? "spinner"
                                  : "spinnerHidden"
                              }
                            ></i>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
MyAccount.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
