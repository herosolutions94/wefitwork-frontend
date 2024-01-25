import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import {
  fetchProfessionalAccountSettings,
  saveProfessionalAccountSettings,
} from "@/components/states/actions/professional/proProfile";
import { useDispatch, useSelector } from "react-redux";
import { cmsFileUrl, doObjToFormData } from "@/components/helpers/helpers";
import InputMask from "react-input-mask";
import Image from "next/image";
import Text from "@/components/components/text";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { authToken } from "@/components/helpers/authToken";
import http from "@/components/helpers/http";
import PopupSmall from "@/components/components/popupSmall";
import VerifyPhone from "@/components/components/verifyPhone";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.proProfile.content);
  const member = useSelector((state) => state.proProfile.mem);
  const isLoading = useSelector((state) => state.proProfile.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.proProfile.isFormProcessing
  );
  const portfolioImages = data?.portfolioImages ? data?.portfolioImages : "";

  const { page_title } = data;

  useEffect(() => {
    dispatch(fetchProfessionalAccountSettings());
  }, []);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileDpRef = useRef(null);

  //DP Photo
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

  //API CAll

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSaveProfessionalSettings = (data) => {
    if (image !== null) data.profile = image.target.files;
    dispatch(saveProfessionalAccountSettings(data));
  };

  const [verifyPopup, setVerifyPopup] = useState(false);
  const handleVerifyPhonePopup = () => {
    setVerifyPopup(true);
  };

  return (
    <>
      <main>
        <Toaster position="top-center" />
        <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
        <section className="dashboard">
          <div className="contain">
            <div className="layout_sidebar flex">
              <div className="colL">
                <ProfessionalSidebar data={"profile"} />
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
                      onSubmit={handleSubmit(handleSaveProfessionalSettings)}
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
                        {/* <div className="col-sm-6">
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
                        </div> */}
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>
                              Name <span> (Your given name)</span>
                            </h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="name"
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
                            <h6>Phone Number</h6>
                            <div className="form_blk">
                              <InputMask
                                id="phone"
                                mask="+234 999 999 9999"
                                name="phone"
                                autoComplete="phone"
                                placeholder="Phone Number"
                                value={member?.mem_phone}
                                className="input"
                                readOnly
                                {...register("phone")}
                              />
                              {member?.mem_phone_verified !== "1" &&
                              member?.mem_phone_verified !== 1 ? (
                                <button
                                  type="button"
                                  onClick={handleVerifyPhonePopup}
                                  className="verfiy_btn"
                                >
                                  Verfiy
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) =>
                                    toast.success(
                                      "This phone nnumber is already verified"
                                    )
                                  }
                                  className="verfiy_btn"
                                  style={{ color: "#02932A" }}
                                >
                                  <b> ✓ </b>Verfied
                                  <i class="fa-solid fa-house"></i>
                                </button>
                              )}
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.phone?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>Specialization</h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="specialization"
                                defaultValue={member?.mem_specialization}
                                className="input"
                                placeholder="Entre Your Specializtion"
                                {...register("specialization", {
                                  required: "Specialization is Required",
                                })}
                              />
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.specialization?.message}
                              </div>
                            </div>
                          </div>
                        </div> */}
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
                        <div className="col-sm-12">
                          <div className="blk_form">
                            <h6>Personal Bio</h6>
                            <div className="form_blk">
                              <textarea
                                name="mem_bio"
                                className="input"
                                placeholder="Write about yourself"
                                {...register("mem_bio", {
                                  required: "Required.",
                                })}
                              >
                                {member?.mem_bio}
                              </textarea>
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.mem_bio?.message}
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
      <PopupSmall
        isOpen={verifyPopup}
        onClose={() => {
          setVerifyPopup(false);
          window.location.reload();
        }}
      >
        {verifyPopup && (
          <VerifyPhone phoneNumber={member?.mem_phone} phoneType="mem" />
        )}
      </PopupSmall>
    </>
  );
}
ProfileSettings.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
