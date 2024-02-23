import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import { useRouter } from "next/router";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import {
  fetchAddRequestPage,
  addMaintenanceCoverRequest,
} from "@/components/states/actions/buyer/maintenanceCover";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";


export default function AddRequest() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenanceCover.content);
  const member = useSelector((state) => state.maintenanceCover.mem);
  const isLoading = useSelector((state) => state.maintenanceCover.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.maintenanceCover.isFormProcessing
  );

  const { site_settings, page_title, maintenance_services } = data;

  //   console.log(data);

  useEffect(() => {
    dispatch(fetchAddRequestPage());
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewUploadedImages, setPreviewUploadedImages] = useState([]);

  const fileInputRef = useRef(null);
  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSelected = (e) => {
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

  const [subServices, setSubServices] = useState(false);
  const [getingSubServices, setGetingSubServices] = useState(false);

  const getSubServices = (id) => {
    setGetingSubServices(true);
    setSubServices(false);
    try {
      http
        .post("get-mc-sub-services", doObjToFormData({ purchase_id: id }))
        .then((data) => {
          if (data?.data?.status == true) {
            setSubServices(data?.data?.sub_services);
            setGetingSubServices(false);
          } else {
            setSubServices(false);
            setGetingSubServices(false);
          }
        });
    } catch (errors) {
      setSubServices(false);
      setGetingSubServices(false);
      console.log("Errors", errors);
    }
  };

  const handleSubmitRequest = (data) => {
    if (uploadedImages !== null) data.request_images = uploadedImages;
    // console.log(data);
    dispatch(addMaintenanceCoverRequest(data));
  };

  return (
    <>
      {/* <NextNProgress color="#004AAD" /> */}
      <main>
        <Toaster position="top-center" />

        {isLoading && (
          <>
            <Head>
              <title>{"fetching..."}</title>
            </Head>
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
          <>
            <Head>
              <title>{page_title ? page_title : "fetching..."}</title>
            </Head>
            <section className="dashboard professional_details">
              <div className="contain">
                <div className="sec_heading">
                  <h3>Add New Maintenance Request</h3>
                </div>
                <div className="custom_blk_main">
                  <form
                    method="POST"
                    onSubmit={handleSubmit(handleSubmitRequest)}
                  >
                    <div className="from_row row">
                      <div className="col-sm-12">
                        <div className="blk_form">
                          <h6>Title</h6>
                          <div className="form_blk">
                            <input
                              type="text"
                              name="request_title"
                              placeholder="Request Title"
                              className="input"
                              {...register("request_title", {
                                required: "Request is Rquired",
                              })}
                            />
                            <div
                              className="validation-error"
                              style={{ color: "red" }}
                            >
                              {errors.request_title?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="blk_form">
                          <h6>Choose Service</h6>
                          <div className="form_blk">
                            <select
                              className="input"
                              {...register("purchase_id", {
                                required: "Required",
                                onChange: (e) => {
                                  getSubServices(e.target.value);
                                },
                              })}
                            >
                              <option value="">
                                Choose Service from your Purchased
                              </option>
                              {maintenance_services?.map((ser) => {
                                return (
                                  <option value={ser?.id} key={ser?.id}>
                                    {ser?.service_title} | Address:
                                    {ser?.address}
                                  </option>
                                );
                              })}
                            </select>
                            <div
                              className="validation-error"
                              style={{ color: "red" }}
                            >
                              {errors.purchase_id?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="blk_form">
                          <h6>
                            Choose Sub Service{" "}
                            {getingSubServices && (
                              <div
                                className="spinner-border text-danger"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            )}{" "}
                          </h6>

                          <div className="form_blk">
                            <select
                              className="input"
                              disabled={getingSubServices}
                              {...register("sub_cat_id", {
                                required: "Required",
                              })}
                            >
                              {!subServices && (
                                <option value="">
                                  Select Service to Choose Sub Service{" "}
                                </option>
                              )}
                              {subServices && (
                                <>
                                  <option value="">Choose Sub Service</option>
                                  {subServices?.map((sub) => {
                                    return (
                                      <option value={sub?.id} key={sub?.id}>
                                        {sub?.title}
                                      </option>
                                    );
                                  })}
                                </>
                              )}
                            </select>

                            <div
                              className="validation-error"
                              style={{ color: "red" }}
                            >
                              {errors.sub_cat_id?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="blk_form">
                          <h6>Details</h6>
                          <div className="form_blk">
                            <textarea
                              className="input"
                              placeholder="Entre request detail"
                              {...register("detail", {
                                required: "Required",
                              })}
                            ></textarea>
                            <div
                              className="validation-error"
                              style={{ color: "red" }}
                            >
                              {errors.detail?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <h6>Upload Images</h6>
                        <div className="add_portfolio_blk">
                          <div className="profile_grid_edit scrollbar">
                            <div className="flex">
                              {previewUploadedImages?.map((preview, index) => {
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
                            <input
                              type="file"
                              ref={fileInputRef}
                              multiple
                              style={{ display: "none" }}
                              onChange={handleSelected}
                              accept="image/*"
                            />
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
                        Submit
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
          </>
        )}
      </main>
    </>
  );
}
AddRequest.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
