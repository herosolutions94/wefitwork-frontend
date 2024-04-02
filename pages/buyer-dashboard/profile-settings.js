import React, { useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import BuyerSidebar from "@/components/components/buyerSidebar";
import Head from "next/head";

import {
  fetchBuyerAccountSettings,
  saveBuyerAccountSettings,
} from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { checkEmailOrPhone, cmsFileUrl } from "@/components/helpers/helpers";
import InputMask from "react-input-mask";
import Image from "next/image";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.account.isFormProcessing
  );

  const { page_title } = data;

  useEffect(() => {
    dispatch(fetchBuyerAccountSettings());
  }, []);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileDpRef = useRef(null);

  const handleDpClick = (e) => {
    e.preventDefault();
    fileDpRef.current.click();
  };
  const handleDpSelected = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSaveBuyerSettings = (data) => {
    data.phone = data.phone.slice(1);
    data.phone = "+234"+data.phone;
    if (image !== null) data.profile = image.target.files;
    dispatch(saveBuyerAccountSettings(data));
  };

  return (
    <>
      {/* <NextNProgress color="#004AAD" /> */}
      <main>
        <Toaster position="top-center" />
        <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
        <section className="dashboard">
          <div className="contain">
            <div className="layout_sidebar flex">
              <div className="colL">
                <BuyerSidebar data={"profile"} />
              </div>
              <div className="colR">
                <div className="sec_heading">
                  <h2>Profile</h2>
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
                      onSubmit={handleSubmit(handleSaveBuyerSettings)}
                    >
                      <p>
                        <strong>Profile Dp</strong>
                      </p>
                      <div className="dp_flex">
                        <div className="dp_icon">
                          {previewImage != null ? (
                            <img src={previewImage} alt="User DP" />
                          ) : member?.mem_image == null ||
                            member?.mem_image == "" ? (
                            <img src="/images/user_icon.svg" alt="DP" />
                          ) : (
                            <Image
                              src={cmsFileUrl(member?.mem_image, "members")}
                              width={60}
                              height={60}
                              alt={member?.mem_fname}
                            />
                          )}
                        </div>
                        <div className="btn_blk">
                          <button
                            className="site_btn color"
                            type="button"
                            onClick={handleDpClick}
                          >
                            Upload
                          </button>
                          {/* <button className="site_btn blank blue_blank" type="button">Remove</button> */}
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="from_row row">
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>
                              Display Name <span>(Visible to others)</span>
                            </h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="display_name"
                                defaultValue={member?.mem_display_name}
                                className="input"
                                placeholder="Entre Dispaly Name Here"
                                {...register("display_name", {
                                  required: "Display Name is required.",
                                })}
                              />

                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.display_name?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>
                              Name <span> (Your given name)</span>
                            </h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="fname"
                                defaultValue={member?.mem_fname}
                                className="input"
                                placeholder="Entre Full Name Here"
                                {...register("fname", {
                                  required: "Name is required.",
                                })}
                              />

                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.fname?.message}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>
                              Email
                            </h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="fname"
                                defaultValue={checkEmailOrPhone(member?.mem_email) == "email" ? member?.mem_email : ''}
                                className="input"
                                placeholder="Entre Email Here"
                                // {...register("email", {
                                //   required: "Email is required.",
                                // })}
                                readOnly
                                disabled={true}
                              />

                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.email?.message}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>Phone Number</h6>
                            <div className="form_blk">
                              <InputMask
                                id="phone"
                                mask="99999999999"
                                name="phone"
                                autoComplete="phone"
                                placeholder="Phone Number"
                                value={member?.mem_phone?.replace("+234", "0")}
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
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <div className="blk_form">
                            <h6>Address</h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="address"
                                defaultValue={member?.mem_address}
                                className="input"
                                placeholder="Entre Address Here"
                                {...register("address", {
                                  required: "Address is required.",
                                })}
                              />

                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.address?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="br"></div>
                      <div className="btn_blk text-right cell_wide_full">
                        <button
                          type="submit"
                          className="site_btn"
                          disabled={isFormProcessing}
                        >
                          Save changes
                          {isFormProcessing && (
                            <i
                              className={
                                isFormProcessing ? "spinner" : "spinnerHidden"
                              }
                            ></i>
                          )}
                        </button>
                      </div>

                      <input
                        type="file"
                        ref={fileDpRef}
                        style={{ display: "none" }}
                        onChange={handleDpSelected}
                      />
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
ProfileSettings.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
