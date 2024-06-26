import React, { useState, useEffect, useRef } from "react";
import FileInputButton from "./fileInputButton";
import { useForm } from "react-hook-form";
import http from "../helpers/http";
import { doObjToFormData } from "../helpers/helpers";
import toast from "react-hot-toast";
import { saveSearch } from "../states/actions/saveSearch";
import { useDispatch, useSelector } from "react-redux";
// import MapComponent from "./map-container";
import AddressAutocomplete from "./map-autocomplete";
import dynamic from "next/dynamic";
const LeafletMapComponent = dynamic(() => import("../components/leaflet-map"), {
  ssr: false, // Disable server-side rendering
});

const ExploreFrom = ({ onClose, services, serId, selectedTitle, states }) => {
  const searchRef = useRef(null)
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.saveSearch.isFormProcessing
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
  const handleChangeService = (service_id) => {
    setSelectedServiceValue(service_id)
  }
  const handleServiceLabelClick = (event, id, selected_title) => {
    setSelectedServiceValue(id);
    setServiceTitle(selected_title);
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    try {
      setGetingSubServices(true);
      http
        .post("get-sub-services", doObjToFormData({ service_id: id }))
        .then((data) => {
          if (data?.data?.status == true) {
            setGetingSubServices(false);
            setSubServices(data?.data?.sub_services);
          } else {
            setGetingSubServices(false);
            setSubServices(false);
          }
        });
    } catch (errors) {
      setGetingSubServices(false);
      console.log("Errors", errors);
    }
  };

  useEffect(() => {
    if (serId > 0) {
      handleServiceLabelClick('', serId, selectedTitle)
      setValue('service_id', serId)
      handleNext()
    }
  }, [serId])

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
    watch,
  } = useForm();
  const watchAllFields = watch();

  const [locationCords, setLocationCords] = useState({ lat: null, long: null });
  const [getingLoction, setGetingLocation] = useState(false);

  const [businessAddress, setBusinessAddress] = useState("");

  const [reloadMap, setReloadMap] = useState(false);

  const handlePlaceSelect = (place) => {
    setReloadMap(false);
    setGetingLocation(true);
    setLocationCords({ lat: place.latitude, long: place.longitude });
    // Use reverse geocoding to get the address from coordinates
    setValue("business_address", businessAddress);

    if (place.latitude && place.longitude) {
      toast.success("Location picked. Continue to next Step");
    } else {
      toast.error("Location Not picked");
    }

    setGetingLocation(false);
  };

  const getCurrentLocation = () => {
    setReloadMap(false);
    setGetingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocationCords({ lat: latitude, long: longitude });
        // console.log(locationCords);

        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        if (latitude && longitude) {
          toast.success("Location picked. Continue to next Step");
        } else {
          toast.error("Location Not picked");
        }
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
      // console.log("Geolocation is not supported by this browser.");
    }
    setGetingLocation(false);
  };

  useEffect(() => {
    setReloadMap(true);
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
    setValue("business_address", businessAddress);
  }, [locationCords]);

  const [file, setFile] = useState(null);

  const handleFormSubmit = (data) => {
    if (file !== null) data.doc_file = file.target.files;
    if (data?.service_id === null || data?.service_id === undefined || data?.service_id === '') {
      data = { ...data, service_id: selectedServiceValue }
    }
    if (data?.sub_service_id === null || data?.sub_service_id === undefined || data?.sub_service_id === '') {
      data = { ...data, sub_service_id: selectedSubServiceValue }
    }

    // console.log(data); return;
    dispatch(saveSearch(data));
  };
  const [isSearching, setIsSearching] = useState(false);
  const [searchedServices, setSearchedServices] = useState({
    res: services,
    searched: false,
  });

  const handleSearchService = (e) => {
    // console.log("hi", e.target.value);
    setIsSearching(true);
    let search = e.target.value;

    try {
      http
        .post("search-services", doObjToFormData({ search: search }))
        .then((data) => {
          if (data?.data?.status == true) {
            setSearchedServices({ res: data.data.services, searched: true });
            setIsSearching(false);
          } else {
            setIsSearching(false);
            setSearchedServices({ res: services, searched: false });

            setTimeout(() => {
              setSearchedServices({ res: services, searched: false });
            }, 6000);
          }
        });
    } catch (errors) {
      console.log("Errors", errors);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="multi-step-form">
        <div
          className={`step ${step === 1 ? "field_set active" : "field_set"}`}
        >
          <h6>Search Service</h6>
          <div className="form_blk">
            <input
              type="text"
              name="search-service"
              className="input"
              placeholder={"Search service You are looking for"}
              onChange={handleSearchService}
            />
          </div>
          <h3>Choose Service</h3>
          {isSearching && (
            <div className="text-center">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!isSearching && (
            <ul className="l_flex">
              {searchedServices?.res.length > 0 ? (
                searchedServices?.res?.map((val) => {
                  return (
                    <li key={val.id}>
                      <div
                        className={`lbl_btn ${selectedServiceValue === val?.id ? "active" : ""
                          }`}
                      >
                        <input
                          type="radio"
                          name="service_id"
                          value={val?.id}
                          id={`ser_id${val?.id}`}
                          checked={selectedServiceValue === val?.id}
                          onChange={() => handleChangeService(val?.id)}
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
                })
              ) : (
                <div className="alert alert-danger">
                  No Service Found With this Name
                </div>
              )}
            </ul>
          )}

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
            {/* {getingSubServices && (
              <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )} */}
            {getingSubServices ? (
              <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : subServices ? (
              subServices?.map((sub_ser) => {
                return (
                  <li key={sub_ser?.id}>
                    <div
                      className={`lbl_btn ${selectedSubServiceValue === sub_ser?.id ? "active" : ""
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
                  {states?.map((st) => {
                    return (
                      <option key={st?.id} value={st?.title}>{st?.title}</option>
                    )
                  })}

                  {/* <option value="Adamawa">Adamawa</option>
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
                  <option value="Zamfara">Zamfara</option> */}
                </select>
                <div className="validation-error" style={{ color: "red" }}>
                  {errors.state?.message}
                </div>
              </div>

              <div className="form_blk">
                <div className="map_indication">
                  <AddressAutocomplete
                    onPlaceSelect={handlePlaceSelect}
                    setAddress={setBusinessAddress}

                  />
                  {/* <input
                    type="text"
                    name="location"
                    className="input"
                    readOnly
                    placeholder={"Please Click on Pick my location"}
                  /> */}
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
                    required:
                      "Latitude Required. Please click on Pick My Location",
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
                    required:
                      "Longitude Required. Please click on Pick My Location",
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
                  Pick my current location
                </button>
              </div>
            </div>
            <div className="colR">
              <div className="map_sec">
                {reloadMap &&
                  watchAllFields?.latitude !== null &&
                  watchAllFields?.latitude !== undefined &&
                  watchAllFields?.longitude !== null &&
                  watchAllFields?.longitude !== undefined ? (
                  <LeafletMapComponent
                    locationCords={locationCords}
                    setLocationCords={setLocationCords}
                  />
                ) : (
                  ""
                )}
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
            <h6>Estimated Budget (₦)</h6>
            <input
              type="number"
              name="budget"
              className="input"
              {...register("budget", {
                required: "Required.",
              })}
            />
            {/* <select
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
            </select> */}
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
                      className={`lbl_btn ${selectedValue === val.id ? "active" : ""
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
            <button onClick={handleNext} type="button" className="site_btn" ref={searchRef}>
              Next
            </button>
          ) : (
            <button type="submit" className="site_btn" id="search-button">
              Search
              {isFormProcessing && (
                <i
                  className={isFormProcessing ? "spinner" : "spinnerHidden"}
                ></i>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ExploreFrom;
