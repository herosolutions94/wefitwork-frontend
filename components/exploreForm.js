import React, { useState, useEffect } from "react";
import FileInputButton from "./fileInputButton";
import { useForm } from "react-hook-form";
import http from "../helpers/http";
import { doObjToFormData } from "../helpers/helpers";
import toast from "react-hot-toast";
import { saveSearch } from "../states/actions/saveSearch";
import { useDispatch, useSelector } from "react-redux";


const ExploreFrom = ({ onClose, services }) => {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.contactUs.isFormProcessing
  );
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = async () => {
    let fieldsToValidate;
    // Determine which fields to validate based on the current step
    switch (step) {
      case 1:
        fieldsToValidate = ["service_id"];
        break;
      case 2:
        fieldsToValidate = ["sub_service_id"];
        break;
      case 3:
        fieldsToValidate = ["latitude", "longitude", "state"];
        break;
      case 4:
        fieldsToValidate = ["card_holder_name"];
        break;
      default:
        // Handle other steps if needed
        fieldsToValidate = [];
    }

    const isValid = await trigger(fieldsToValidate);

    if (!isValid) {
      console.log("Validation Errors:", errors);
    }

    if (isValid) {
      // setStep(step + 1);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // const handleSubmits = (data) => {
  //   // onClose();
  //   console.log(data);
  // };

  const [selectedServiceValue, setSelectedServiceValue] = useState(null);

  const [subServices, setSubServices] = useState(false);
  const [getingSubServices, setGetingSubServices] = useState(false);
  const [serviceTitle, setServiceTitle] = useState(false);

  const handleServiceLabelClick = (event, id, selected_title) => {
    setSelectedServiceValue(id);
    setServiceTitle(selected_title);

    try {
      http
        .post("get-sub-services", doObjToFormData({ service_id: id }))
        .then((data) => {
          if (data?.data?.status == true) {
            setSubServices(data?.data?.sub_services);
          } else {
            setSubServices(false);
          }
        });
      setGetingSubServices(false);
    } catch (errors) {
      console.log("Errors", errors);
    }
  };

  const [selectedSubServiceValue, setSelectedSubServiceValue] = useState(null);

  const handleSubServiceLabelClick = (event, id) => {
    setSelectedSubServiceValue(id);
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleLabelClick = (event, id) => {
    setSelectedValue(id);
  };

  const time_job = [
    {
      id: "question1",
      title: "Immediately",
    },
    {
      id: "question2",
      title: "I'm flexible on start date",
    },
    {
      id: "question3",
      title: "Im budgeting",
    },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
  } = useForm();

  const [locationCords, setLocationCords] = useState({ lat: null, long: null });
  const [getingLoction, setGetingLocation] = useState(false);
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
    if (locationCords.lat !== null && locationCords.long !== null) {
      document.getElementById("latlong").innerHTML = "";

      document.getElementById("latlong").innerHTML =
        "<p><strong>Latitude: </strong>" +
        locationCords.lat +
        "</p><p><strong>Latitude: </strong>" +
        locationCords.long;
    }

    setValue("latitude", locationCords.lat);
    setValue("longitude", locationCords.long);
  }, [locationCords]);

  const [file, setFile] = useState(null) ;

  const handleFormSubmit = (data) => {

    if (file !== null) data.doc_file = file.target.files;

    console.log(data);

    dispatch(saveSearch(data));

  }
  
  return (
    <form method="POST" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="multi-step-form">
        <div
          className={`step ${step === 1 ? "field_set active" : "field_set"}`}
        >
          <h3>Choose Service</h3>
          <ul className="l_flex">
            {services?.map((val) => {
              return (
                <li key={val.id}>
                  <div
                    className={`lbl_btn ${
                      selectedServiceValue === val?.id ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="service_id"
                      value={val?.id}
                      id={`ser_id${val?.id}`}
                      checked={selectedServiceValue === val?.id}
                      onChange={() => setSelectedServiceValue(val?.id)}
                      {...register("service_id", {
                        required: "Please choose the service you wants",
                      })}
                    />
                    <label
                      htmlFor={`ser_id${val?.id}`}
                      onClick={(e) =>
                        handleServiceLabelClick(e, val?.id, val?.title)
                      }
                    >
                      {val?.title}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
          <br />
          <div className="validation-error" style={{ color: "red" }}>
            {errors.service_id?.message}
          </div>
        </div>
        <div
          className={`step ${step === 2 ? "field_set active" : "field_set"}`}
        >
          <h3>What do you need a {serviceTitle} to help with?</h3>
          <ul className="l_flex two_flex">
            {getingSubServices && (
              <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {subServices ? (
              subServices?.map((sub_ser) => {
                return (
                  <li key={sub_ser?.id}>
                    <div
                      className={`lbl_btn ${
                        selectedSubServiceValue === sub_ser?.id ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="sub_service"
                        value={sub_ser?.id}
                        id={`sub_ser${sub_ser?.id}`}
                        checked={selectedSubServiceValue === sub_ser?.id}
                        onChange={() => setSelectedSubServiceValue(sub_ser?.id)}
                        {...register("sub_service_id", {
                          required: "Please choose the sub service you wants",
                        })}
                      />
                      <label
                        htmlFor={`sub_ser${sub_ser?.id}`}
                        onClick={(e) =>
                          handleSubServiceLabelClick(e, sub_ser?.id)
                        }
                      >
                        {sub_ser?.title}
                      </label>
                    </div>
                  </li>
                );
              })
            ) : (
              <div className="text-senter m-auto">
                <div className="alert alert-danger">
                  No Sub Services Fond for {serviceTitle} Profession
                </div>
              </div>
            )}
          </ul>
          <br />
          <div className="validation-error" style={{ color: "red" }}>
            {errors.sub_service_id?.message}
          </div>
        </div>
        <div
          className={`step ${step === 3 ? "field_set active" : "field_set"}`}
        >
          <h3>Location</h3>
          <div className="flex_address">
            <div className="colL">
              <div className="form_blk">
                <select
                  name="state"
                  className="input"
                  {...register("state", {
                    required: "Required",
                  })}
                >
                  <option value="">Select State</option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa_Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross_River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select>
                <div className="validation-error" style={{ color: "red" }}>
                  {errors.state?.message}
                </div>
              </div>

              <div className="form_blk">
                <div className="map_indication">
                  <input
                    type="text"
                    name="location"
                    className="input"
                    readOnly
                    placeholder={"Please Click on Pick my location"}
                  />
                  <button className="map_marker" type="button">
                    <img src="/images/map_marker.svg" alt="" />
                  </button>
                </div>
              </div>
              <div className="form_blk" id="latlong">
                {/* <p>
                  <strong>Address:</strong> 1711 O Street Sanger,CA 93657 Suite
                  102
                </p> */}
              </div>

              <div className="form_blk">
                <input
                  type="hidden"
                  name="latitude"
                  id="latitude"
                  {...register("latitude", {
                    required: "Longitude Required. Please click on Pick My Location",
                  })}
                />

                <div className="validation-error" style={{ color: "red" }}>
                  {errors.latitude?.message}
                </div>

                <input
                  type="hidden"
                  name="longitude"
                  id="longitude"
                  {...register("longitude", {
                    required: "Longitude Required. Please click on Pick My Location",
                  })}
                />

                <div className="validation-error" style={{ color: "red" }}>
                  {errors.longitude?.message}
                </div>
              </div>

              <div className="btn_blk">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="site_btn black"
                >
                  CHECK ADDRESS AVAILABILITY
                </button>
              </div>
            </div>
            <div className="colR">
              <div className="map_sec">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13363.859400788691!2d-117.158019!3d33.136288!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db8ab3b9f18c1b%3A0x22de000cd55202d6!2s160%20Industrial%20St%20%23200%2C%20San%20Marcos%2C%20CA%2092078!5e0!3m2!1sen!2sus!4v1672885602751!5m2!1sen!2sus"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`step ${step === 4 ? "field_set active" : "field_set"}`}
        >
          <h3>Work Scope</h3>
          <div className="form_blk">
            <textarea
              name="work_scope"
              className="input"
              placeholder={"Write your work scope"}
              {...register("work_scope", {
                required: "Required.",
              })}
            ></textarea>
            <div className="validation-error" style={{ color: "red" }}>
              {errors.work_scope?.message}
            </div>
          </div>
          <div className="form_blk">
            <FileInputButton setFile={setFile} />
           
          </div>

          <div className="br"></div>
          <h3>More Information</h3>
          <div className="form_blk w_6">
            <h6>Estimated Price</h6>
            <select
              className="input"
              name="budget"
              {...register("budget", {
                required: "Required.",
              })}
            >
              <option value="">Your Budget</option>
              <option value="1k-2k">1k-2k</option>
              <option value="3k-4k">3k-4k</option>
              <option value="5k-6k">5k-6k</option>
              <option value="7k-8k">7k-8k</option>
            </select>
            <div className="validation-error" style={{ color: "red" }}>
              {errors.budget?.message}
            </div>
          </div>
          <div className="form_blk">
            <h6>When would you like the job to start?</h6>
            <ul className="l_flex">
              {time_job.map((val) => {
                return (
                  <li key={val.id}>
                    <div
                      className={`lbl_btn ${
                        selectedValue === val.id ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="service_choose"
                        value={val.title}
                        id={val.id}
                        checked={selectedValue === val.id}
                        onChange={() => setSelectedValue(val.id)}
                        {...register("job_start", {
                required: "Required.",
              })}
                      />
                      <label
                        htmlFor={val.id}
                        onClick={(e) => handleLabelClick(e, val.id)}
                      >
                        {val.title}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
            <br />
            <div className="validation-error" style={{ color: "red" }}>
              {errors.job_start?.message}
            </div>
          </div>
        </div>
        <div className="br"></div>
        <div className="btn_blk text-center">
          {step > 1 && (
            <button
              onClick={handleBack}
              type="button"
              className="site_btn color"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button onClick={handleNext} type="button" className="site_btn">
              Next
            </button>
          ) : (
            <button type="submit" className="site_btn">
              Search
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ExploreFrom;
