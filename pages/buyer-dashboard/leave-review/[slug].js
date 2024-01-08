import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import ReactStars from "react-stars";
import { useForm } from "react-hook-form";
import { fetchReviewPageData, saveReview } from "@/components/states/actions/buyer/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { cmsFileUrl } from "@/components/helpers/helpers";
import Image from "next/image";

export default function LeaveReview() {
  const router = useRouter();
  const { slug } = router.query;
  const pro_mem_id = encrypt_decrypt("decrypt", slug);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reviews.content);
  const member = useSelector((state) => state.reviews.mem);
  const isLoading = useSelector((state) => state.reviews.isLoading);
  const isFormProcessing = useSelector((state) => state.reviews.isFormProcessing);


  useEffect(() => {
    dispatch(fetchReviewPageData(pro_mem_id));
  }, []);

  const { site_settings, page_title, pro_mem_data, pro_mem_profile } = data;

  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedRatingQuality, setSelectedRatingQuality] = useState(null);
  const [selectedRatingTidiness, setSelectedRatingTidiness] = useState(null);
  const [selectedRatingCourtesy, setSelectedRatingCourtesy] = useState(null);

  const handleRatingReliabilityClick = (rating) => {
    setSelectedRating(rating);
    setValue("reliability_timekeeping", rating);
  };

  const handleRatingQualityClick = (rating) => {
    setSelectedRatingQuality(rating);
    setValue("quality_workmanship", rating);
  };

  const handleRatingTidinessClick = (rating) => {
    setSelectedRatingTidiness(rating);
    setValue("tidiness", rating);
  };

  const handleRatingCourtesyClick = (rating) => {
    setSelectedRatingCourtesy(rating);
    setValue("courtesy", rating);
  };

  const [isYesSelected, setIsYesSelected] = useState(false);

  const handleYesClick = () => {
    setIsYesSelected(true);
    setValue("recomended", "yes");
  };

  const handleNoClick = () => {
    setIsYesSelected(false);
    setValue("recomended", "no");
  };

  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewUploadedImages, setPreviewUploadedImages] = useState([]);

  const fileRef = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    fileRef.current.click();
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const number = [
    {
      rate: "Not Applicable",
    },
    {
      rate: 1,
    },
    {
      rate: 2,
    },
    {
      rate: 3,
    },
    {
      rate: 4,
    },
    {
      rate: 5,
    },
    {
      rate: 6,
    },
    {
      rate: 7,
    },
    {
      rate: 8,
    },
    {
      rate: 9,
    },
    {
      rate: 10,
    },
  ];

  const [starRating, setStarRating] = useState(0);
  const ratingChanged = (newRating) => {
    setStarRating(newRating);
    setValue("rating", newRating);
  };

  const handleSubmitReview = (data) => {
    data.pro_mem_id = pro_mem_data?.mem_id;
    if (uploadedImages !== null ) data.proof_images = uploadedImages;
    dispatch(saveReview(data));
  };

  return (
    <>
      <Toaster position="top-center" />

      <Head>
        <title>{page_title ? page_title : "fetching..."}</title>
      </Head>
      <main>
        <section className="dashboard">
          <div className="contain">
            <div className="rate_review_dash_blk custom_blk">
              <div className="sec_heading">
                <h2>Rate and Review</h2>
              </div>
              {!isLoading && <div className="rating_person">
                <div className="icon_img">
                  {pro_mem_data?.mem_image ? (
                    <Image
                      src={cmsFileUrl(pro_mem_data?.mem_image, "members")}
                      width={70}
                      height={70}
                      alt={pro_mem_data?.mem_fname}
                    />
                  ) : (
                    <img
                      src="/images/no-user.svg"
                      alt={pro_mem_data?.mem_fname}
                    />
                  )}
                </div>
                <div className="cntnt">
                  <h5>{pro_mem_data?.mem_fname}</h5>
                  <p>{`${pro_mem_data?.service_title} ( ${pro_mem_data?.sub_services} )`}</p>
                </div>
              </div>}
              <div className="br"></div>
              <form method="POST" onSubmit={handleSubmit(handleSubmitReview)}>
                <div className="sec_heading">
                  <h4>How would you rate the experience?</h4>
                </div>
                <div className="rate_check">
                  <p>1 = Terrible, 10 = Excellent</p>
                  <ul>
                    <li>
                      <h6>Reliability & timekeeping</h6>
                      <div className="btn_blk">
                        {number.map((rating) => {
                          return (
                            <button
                              type="button"
                              key={rating.rate}
                              onClick={() =>
                                handleRatingReliabilityClick(rating.rate)
                              }
                              className={
                                rating.rate === selectedRating
                                  ? "site_btn blank active"
                                  : "site_btn blank"
                              }
                            >
                              {rating.rate}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="hidden"
                        name="reliability_timekeeping"
                        value={selectedRating}
                        {...register("reliability_timekeeping", {
                          required: " required.",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.reliability_timekeeping?.message}
                      </div>

                      {/* <div className="lbl_btn">
                                        <input type="checkbox" name="reliablitiy_timekeeping" id="reliablitiy_timekeeping_not_applicable" value/>
                                        <label htmlFor="reliablitiy_timekeeping_not_applicable">Not Applicable</label>
                                    </div> */}
                    </li>

                    <li>
                      <h6>Quality of workmanship</h6>
                      <div className="btn_blk">
                        {number.map((rating) => {
                          return (
                            <button
                              type="button"
                              key={rating.rate}
                              onClick={() =>
                                handleRatingQualityClick(rating.rate)
                              }
                              className={
                                rating.rate === selectedRatingQuality
                                  ? "site_btn blank active"
                                  : "site_btn blank"
                              }
                            >
                              {rating.rate}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="hidden"
                        name="quality_workmanship"
                        value={selectedRatingQuality}
                        {...register("quality_workmanship", {
                          required: " required.",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.quality_workmanship?.message}
                      </div>
                      {/* <div className="lbl_btn">
                                        <input type="checkbox" name="quality_workmanship" id="quality_workmanship_not_applicable"/>
                                        <label htmlFor="quality_workmanship_not_applicable">Not Applicable</label>
                                    </div> */}
                    </li>
                    <li>
                      <h6>Tidiness</h6>
                      <div className="btn_blk">
                        {number.map((rating) => {
                          return (
                            <button
                              type="button"
                              key={rating.rate}
                              onClick={() =>
                                handleRatingTidinessClick(rating.rate)
                              }
                              className={
                                rating.rate === selectedRatingTidiness
                                  ? "site_btn blank active"
                                  : "site_btn blank"
                              }
                            >
                              {rating.rate}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="hidden"
                        name="tidiness"
                        value={selectedRatingTidiness}
                        {...register("tidiness", {
                          required: " required.",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.tidiness?.message}
                      </div>
                      {/* <div className="lbl_btn">
                                        <input type="checkbox" name="Tidiness" id="Tidiness_not_applicable"/>
                                        <label htmlFor="Tidiness_not_applicable">Not Applicable</label>
                                    </div> */}
                    </li>
                    <li>
                      <h6>Courtesy</h6>
                      <div className="btn_blk">
                        {number.map((rating) => {
                          return (
                            <button
                              type="button"
                              key={rating.rate}
                              onClick={() =>
                                handleRatingCourtesyClick(rating.rate)
                              }
                              className={
                                rating.rate === selectedRatingCourtesy
                                  ? "site_btn blank active"
                                  : "site_btn blank"
                              }
                            >
                              {rating.rate}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="hidden"
                        name="courtesy"
                        value={selectedRatingCourtesy}
                        {...register("courtesy", {
                          required: " required.",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.courtesy?.message}
                      </div>
                      {/* <div className="lbl_btn">
                                        <input type="checkbox" name="Courtesy" id="Courtesy_not_applicable"/>
                                        <label htmlFor="Courtesy_not_applicable">Not Applicable</label>
                                    </div> */}
                    </li>
                  </ul>
                </div>
                <div className="br"></div>
                <div>
                  <div className="sec_heading">
                    <h4>Work Scope</h4>
                  </div>
                  <textarea
                    name="workscope"
                    className="input"
                    placeholder="Write your work scope"
                    {...register("workscope", {
                      required: " required.",
                    })}
                  ></textarea>

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.workscope?.message}
                  </div>
                </div>
                <div className="br"></div>
                <div>
                  <h4>Your Rating</h4>
                  <ReactStars
                    className="rates"
                    count={5}
                    value={0}
                    size={24}
                    color1={"#717171"}
                    color2={"#FF3D3D"}
                    onChange={ratingChanged}
                  />

                  <input
                    type="hidden"
                    name="rating"
                    value={starRating}
                    {...register("rating", {
                      required: " required.",
                    })}
                  />

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.rating?.message}
                  </div>
                </div>
                <div className="br"></div>
                <div>
                  <div className="sec_heading">
                    <h4>Your Review</h4>
                  </div>
                  <textarea
                    name="review"
                    className="input"
                    placeholder="Share details of your own experience"
                    {...register("review", {
                      required: " required.",
                    })}
                  ></textarea>
                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.review?.message}
                  </div>
                </div>
                <div className="br"></div>
                <div>
                  <div className="sec_heading">
                    <h4>Would you recommend this tradesperson?</h4>
                  </div>
                  <div className="button-container">
                    <button
                      type="button"
                      onClick={handleYesClick}
                      className={isYesSelected ? "active" : ""}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={handleNoClick}
                      className={!isYesSelected ? "active" : ""}
                    >
                      No
                    </button>
                  </div>

                  <input
                    type="hidden"
                    name="recomended"
                    value={isYesSelected ? "yes" : "no"}
                    {...register("recomended", {
                      required: " required.",
                    })}
                  />

                  <div className="validation-error" style={{ color: "red" }}>
                    {errors.recomended?.message}
                  </div>
                </div>
                <div className="br"></div>
                <div>
                  <div className="sec_heading">
                    <h4>Please share with us proof of work</h4>
                  </div>
                  <button
                    className="site_btn color upload_file_blk"
                    type="button"
                    onClick={handleClick}
                  >
                    <img src="/images/Camera.svg" alt="" />
                  </button>
                  <input
                    type="file"
                    ref={fileRef}
                    style={{ display: "none" }}
                    multiple
                    onChange={handleSelected}
                  />
                </div>
                <div className="br"></div>
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
                <div className="br"></div>
                <div className="btn_blk text-center">
                  <button type="submit" className="site_btn" disabled={isFormProcessing}>
                    Submit {isFormProcessing && (
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
LeaveReview.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
