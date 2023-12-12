import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";
import ServicesFaq from "@/components/components/serviceFaq";
import { fetchServicesData,updateSubServices, saveBusinessData, requestPhoneVerify } from "@/components/states/actions/professional/services";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { isArrayEmpty, isEmpty } from "@/components/helpers/helpers";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { business_type, employes, question_add } from "@/components/constants/formFieldsData";
import { Toaster, toast } from "react-hot-toast";
import { cmsFileUrl } from "@/components/helpers/helpers";
import MapComponent from "@/components/components/map-container";
import PopupSmall from "@/components/components/popupSmall";
import VerifyPhone from "@/components/components/verifyPhone";

export default function Services() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.services.content);
  const member = useSelector((state) => state.services.mem);
  const pro_profile = useSelector((state) => state.services.pro_profile);
  const isLoading = useSelector((state) => state.services.isLoading);
  const isFormProcessing = useSelector((state) => state.services.isFormProcessing);
  const verify_popup = useSelector((state) => state.services.verify_popup);

  const { page_title, mem_Services } = data;
  const [editPopup, setEditPopup] = useState({ show: false, item: null });

const updateMemberService=(frmData)=>{
  dispatch(updateSubServices(frmData))
}

  useEffect(() => {
    dispatch(fetchServicesData());
  }, []);

  const fileInputRef = useRef(null);
  // console.log(data);
  const portfolioImages = data?.portfolioImages ? data?.portfolioImages : [];

  const [uploadedImages, setUploadedImages] = useState([]);
  const [previewUploadedImages, setPreviewUploadedImages] = useState([]);

  useEffect(() => {
    setPreviewUploadedImages(portfolioImages);
    setUploadedImages(portfolioImages);
  }, [portfolioImages]);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const selectedFiles = e.target.files;
      setUploadedImages(portfolioImages);
      console.log("uploaded", uploadedImages);

    if (selectedFiles) {
      const newUploadedImages = [...uploadedImages, ...selectedFiles];
      setUploadedImages(newUploadedImages);

      console.log("new0",  uploadedImages);

      const newPreviewImages = [...previewUploadedImages];
      for (let i = 0; i < selectedFiles.length; i++) {
        newPreviewImages.push(URL.createObjectURL(selectedFiles[i]));
      }
      setPreviewUploadedImages(newPreviewImages);
      console.log(previewUploadedImages);
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
    watch
  } = useForm();

  const handleSaveBusinessData = (data) => {
    if (uploadedImages !== null ) data.portfolio_images = uploadedImages;
    // console.log(data);
    dispatch(saveBusinessData(data));
  };

  const [locationCords, setLocationCords] = useState({ lat: null, long: null });
  const [getingLoction, setGetingLocation] = useState(false);

  useEffect(() => {
    setLocationCords({lat: pro_profile?.latitude, long: pro_profile?.longitude})
  },[pro_profile])

  const getCurrentLocation = () => {
    setGetingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocationCords({ lat: latitude, long: longitude });
        console.log(locationCords);

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        if (latitude && longitude) {
          toast.success("Location picked. Continue to next Step");
        } else {
          toast.error("Location Not picked");
        }
      });

    } else {
      toast.error("Geolocation is not supported by this browser.");
      console.log("Geolocation is not supported by this browser.");
    }
    setGetingLocation(false);
  };

  useEffect(() => {
    // This will log the updated state whenever locationCords changes
    setValue("latitude", locationCords.lat);
    setValue("longitude", locationCords.long);
  }, [locationCords]);

  const handleRequestVerify = () => {
    let watchAllFields = watch();
    let verifyData = {phone : watchAllFields?.business_phone}
    dispatch(requestPhoneVerify(verifyData));
  }

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
                                // mask="+234 999 999 9999"
                                mask="+1 999 9999999"
                                name="phone"
                                autoComplete="phone"
                                placeholder="Phone Number"
                                defaultValue={pro_profile?.business_phone}
                                className="input"
                                {...register("business_phone", {
                                  required: "Business Phone Number is Required",
                                })}
                              />
                              {pro_profile?.phone_verified !== "1" && pro_profile?.phone_verified !== 1 ? (
                                <button type="button" onClick={handleRequestVerify} className="verfiy_btn" >Verfiy <i class="fa-solid fa-house"></i> </button>

                              ):(
                                <button type="button" onClick={(e) => toast.success("This phone nnumber is already verified")} className="verfiy_btn" style={{color: "#02932A"}}><b> ✓ </b>Verfied <i class="fa-solid fa-house"></i> </button>
                              ) 
                              }

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
                                  defaultChecked={pro_profile?.business_type == val.title}
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
                                  defaultValue={val.title}
                                  id={`emp-${val.id}`}
                                  defaultChecked={pro_profile?.no_of_employes === val.title}
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
                                  defaultValue={val.title}
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


                        <div className="col-sm-8">
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

                        <div className="col-sm-4">
                          <div className="blk_form">
                          <h6>Pick Location</h6>

                          <div className="form_blk">
                      <div className="btn_blk">
                        <button type="button" onClick={getCurrentLocation} className="site_btn">
                          Pick My Location <i className={getingLoction ? "spinner" : "spinnerHidden"}></i>
                        </button>
                      </div>
                      
                    </div>                 

                    <div className="form_blk">
                      <input
                        type="hidden"
                        name="latitude"
                        id="latitude"
                        defaultValue={pro_profile?.latitude}

                        {...register("latitude", {
                          required:
                            "Longitude Required. Please click on Pick My Location",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.latitude?.message}
                      </div>

                      <input
                        type="hidden"
                        name="longitude"
                        id="longitude"
                        defaultValue={pro_profile?.longitude}

                        {...register("longitude", {
                          required:
                            "Longitude Required. Please click on Pick My Location",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.longitude?.message}
                      </div>
                    </div>


                          </div>
                        </div>
                        {locationCords?.lat !== null && locationCords?.lat !== undefined && locationCords?.long !== null && locationCords?.long !== undefined ? 
                        <div className="col-sm-8">
                          <div className="blk_form">
                            <h6>Map</h6>
                            <div className="form_blk">
                            <MapComponent latitude={locationCords?.lat} longitude={locationCords?.long} />
                              
                            </div>
                          </div>
                        </div>
                        : "" }
                        
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
                                {/* {portfolioImages && portfolioImages?.map((img, i) => {
                                return (
                                  <div className="img_col" key={i}>
                                    <div className="inner_img">
                                      <img
                                        src={img}
                                        alt={`Uploaded ${i}`}
                                      />
                                      <button
                                        className="x_btn"
                                        type="button"
                                        
                                      ></button>
                                    </div>
                                  </div>
                                );
                              })} */}
                              {console.log(previewUploadedImages)}
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

      <PopupSmall isOpen={verify_popup} onClose={(e) => toast.error("e")} >
        <VerifyPhone />
      </PopupSmall>

    </>
  );
}
Services.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
