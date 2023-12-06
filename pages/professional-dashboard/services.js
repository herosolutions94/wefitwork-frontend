import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import ServicesFaq from "@/components/components/serviceFaq";
import { fetchServicesData,updateSubServices, saveBusinessData } from "@/components/states/actions/professional/services";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { isArrayEmpty, isEmpty } from "@/components/helpers/helpers";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { business_type, employes, question_add } from "@/components/constants/formFieldsData";
import { Toaster } from "react-hot-toast";
import { cmsFileUrl } from "@/components/helpers/helpers";


export default function Services() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.services.content);
  const member = useSelector((state) => state.services.mem);
  const pro_profile = useSelector((state) => state.services.pro_profile);
  const isLoading = useSelector((state) => state.services.isLoading);
  const isFormProcessing = useSelector((state) => state.services.isFormProcessing);

  const { page_title, mem_Services } = data;
  const [editPopup, setEditPopup] = useState({ show: false, item: null });

const updateMemberService=(frmData)=>{
  dispatch(updateSubServices(frmData))
}

  useEffect(() => {
    dispatch(fetchServicesData());
  }, []);

  const fileInputRef = useRef(null);
  const portfolioImages = data?.portfolioImages ? data?.portfolioImages : '';

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSaveBusinessData = (data) => {
    if (uploadedImages !== null ) data.portfolio_images = uploadedImages;
    // console.log(data);
    dispatch(saveBusinessData(data));
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
            <div className="layout_sidebar flex">
              <div className="colL">
                <ProfessionalSidebar data={"my-business"} />
              </div>
              <div className="colR">
              <div className="sec_heading service_sec_heading">
                  <h2>Services Offered</h2>
                  {(member?.mem_professionl_profile !== "1" || member?.mem_professionl_profile !== 1) && isEmpty(Object(mem_Services)) ?
                    <div className="btn_blk">
                      <Link href="add-service" className="site_btn color">Add More</Link>
                    </div>
                    : (
                      <div className="btn_blk">
                        <div className="site_btn color disabled" disabled={true}>Add More</div>
                      </div>
                    )}
                </div>
                <div className="profile_blk custom_blk">
                  {!isEmpty(Object(mem_Services)) ?
                    <ServicesFaq data={mem_Services} setEditPopup={setEditPopup} editPopup={editPopup} isFormProcessing={isFormProcessing} updateMemberService={updateMemberService} />
                    :
                    <div className="alert alert-danger">You havn't added any service</div>
                  }
                </div>
                <div className="br"></div>
              <div className="sec_heading ">
                  <h2>Business Profile</h2>
                </div>
                <div className="profile_blk custom_blk">
                  {!isLoading && (
                    <form
                      method="POST"
                      onSubmit={handleSubmit(handleSaveBusinessData)}
                    >
    
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
                                defaultValue={pro_profile?.display_name}
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
                              Business Name <span> (Your given name)</span>
                            </h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="name"
                                defaultValue={pro_profile?.business_name}
                                className="input"
                                placeholder="Entre Business Name Here"
                                {...register("business_name", {
                                  required: "Business Name is required.",
                                })}
                              />
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.business_name?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>Business Phone Number</h6>
                            <div className="form_blk">
                              <InputMask
                                id="phone"
                                mask="0999 999 9999"
                                name="phone"
                                autoComplete="phone"
                                placeholder="Phone Number"
                                value={pro_profile?.business_phone}
                                className="input"
                                {...register("business_phone", {
                                  required: "Business Phone Number is Required",
                                })}
                              />
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.business_phone?.message}
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
                                defaultValue={pro_profile?.specialization}
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

                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>Business type</h6>
                            <div className="form_blk">
                            {business_type.map((val) => {
                          return (
                    
                              <div className="lbl_btn" key={val?.id}>
                                <input
                                  type="radio"
                                  name="business_type"
                                  value={val.title}
                                  id={`typ-${val.id}`}
                                  checked={pro_profile?.business_type === val.title}
                                  {...register("business_type", {
                                    required: "Required",
                                  })}
                                />

                                <label  htmlFor={`typ-${val.id}`}> {val.title} </label>
                              </div>
                            
                          );
                        })}

                        <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.business_type?.message}
                      </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>How many employes do you have?</h6>
                            <div className="form_blk">
                            {employes.map((val) => {
                          return (
                              <div className="lbl_btn" key={val?.id}>
                                <input
                                  type="radio"
                                  name="no_of_employes"
                                  value={val.title}
                                  id={`emp-${val.id}`}
                                  checked={pro_profile?.no_of_employes === val.title}
                                  {...register("no_of_employes", {
                                    required: "Required",
                                  })}
                                />
                                <label htmlFor={`emp-${val.id}`} > {val.title} </label>
                              </div>
                        
                          );
                        })}
                        <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.no_of_employes?.message}
                      </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-sm-6">
                          <div className="blk_form">
                            <h6>What are you looking for?</h6>
                            <div className="form_blk">
                            {question_add.map((val) => {
                          return (
                           
                              <div className="lbl_btn" key={val?.id}>
                                <input
                                  type="radio"
                                  name="looking_for"
                                  value={val.title}
                                  id={`for-${val.id}`}
                                  // checked={lookingForValue === val.id}
                                  // onChange={() => setLookingForValue(val.id)}
                                  {...register("looking_for", {
                                    required: "Required",
                                  })}
                                />
                                <label htmlFor={`for-${val.id}`}>{val.title}</label>
                              </div>
                            
                          );
                        })}
                            </div>
                          </div>
                        </div> */}


                        <div className="col-sm-12">
                          <div className="blk_form">
                            <h6>Business Address</h6>
                            <div className="form_blk">
                              <input
                                type="text"
                                name="address"
                                defaultValue={pro_profile?.business_address}
                                className="input"
                                placeholder="Entre Business Address Here"
                                {...register("business_address", {
                                  required: "Business Address is required.",
                                })}
                              />
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.business_address?.message}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-sm-12">
                          <div className="blk_form">
                            <h6>Business Bio</h6>
                            <div className="form_blk">
                              <textarea
                                name="mem_bio"
                                className="input"
                                placeholder="Write about yourself"
                                {...register("bio", {
                                  required: "Required.",
                                })}
                              >
                                {pro_profile?.bio}
                              </textarea>
                              <div
                                className="validation-error"
                                style={{ color: "red" }}
                              >
                                {errors.bio?.message}
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
                      
                    </form>
                  )}
                </div>
                <div className="br"></div>

               
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
Services.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
