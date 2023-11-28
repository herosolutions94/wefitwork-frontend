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
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { authToken } from "@/components/helpers/authToken";
import http from "@/components/helpers/http";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.proProfile.content);
  const member = useSelector((state) => state.proProfile.mem);
  const isLoading = useSelector((state) => state.proProfile.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.proProfile.isFormProcessing
  );
  const portfolioImages = data?.portfolioImages ? data?.portfolioImages : '';

  const { page_title } = data;

  useEffect(() => {
    dispatch(fetchProfessionalAccountSettings());
  }, []);

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
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

  // Images
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewUploadedImages, setPreviewUploadedImages] = useState([]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const newUploadedImages = [...uploadedImages, ...selectedFiles];
      setUploadedImages(newUploadedImages);

      const newPreviewImages = [...previewUploadedImages];
      for (let i = 0; i < selectedFiles.length; i++) {
        newPreviewImages.push(URL.createObjectURL(selectedFiles[i]));
      }
      setPreviewUploadedImages(newPreviewImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);

    const updatedPreviews = [...previewUploadedImages];
    updatedPreviews.splice(index, 1);
    setPreviewUploadedImages(updatedPreviews);
  };

  //API CAll

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSaveProfessionalSettings = (data) => {
    if (image !== null) data.profile = image.target.files;
    if (uploadedImages !== null ) data.portfolio_images = uploadedImages;

    // console.log(data);
    dispatch(saveProfessionalAccountSettings(data));
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
                                mask="+9 999-999-9999"
                                name="phone"
                                autoComplete="phone"
                                placeholder="Phone Number"
                                value={member?.mem_phone}
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
                        <div className="col-sm-6">
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
                      <div className="add_portfolio_blk">
                        <div className="sec_heading">
                          <h4>Add Your Portfolio</h4>
                        </div>
                        <div className="profile_grid_edit scrollbar">
                          <div className="flex">
                            {(previewUploadedImages == "" ||
                            previewUploadedImages == null) && (portfolioImages == "" || portfolioImages == null)? (
                                                          
                                    <div className="alert alert-primary text-center">
                                Please Select Images
                                                           
                                  </div>
                              
                            ) : (<>
                                {portfolioImages && portfolioImages?.map((img, i) => {
                                return (
                                  <div className="img_col" key={i}>
                                    <div className="inner_img">
                                      <img
                                        src={cmsFileUrl(img?.image, "members/portfolio")}
                                        alt={`Uploaded ${img?.id}`}
                                      />
                                      <button
                                        className="x_btn"
                                        type="button"
                                        
                                      ></button>
                                    </div>
                                  </div>
                                );
                              })}
                                {previewUploadedImages.map((preview, index) => {
                                return (
                                  <div className="img_col" key={index}>
                                    <div className="inner_img">
                                      <img
                                        src={preview}
                                        alt={`Uploaded ${index + 1}`}
                                      />
                                      <button
                                        className="x_btn"
                                        type="button"
                                        onClick={() => removeImage(index)}
                                      ></button>
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                              
                            )}
                          </div>
                        </div>
                        <div className="br"></div>
                        <div className="btn_blk">
                          <button
                            type="button"
                            className="site_btn color filter_btn"
                            onClick={handleButtonClick}
                          >
                            <img src="/images/clip.svg" alt="" />
                            <span>Upload</span>
                          </button>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-right cell_wide_full">
                        <button
                          type="submit"
                          className="site_btn"
                          disabled={isFormProcessing}
                        >
                          Save changes{" "}
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
                        ref={fileInputRef}
                        multiple
                        style={{ display: "none" }}
                        onChange={handleFileSelected}
                      />
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
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
