import React, { useState } from "react";
import Link from "next/link";
import Text from "../components/text";
import http from "../helpers/http";
import MetaGenerator from "../components/meta-generator";
import { cmsFileUrl, format_amount, doObjToFormData } from "../helpers/helpers";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createProfessionalProfile } from "../states/actions/professional/proProfile";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = async () => {
  const result = await http
    .get("professional-signup-page")
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function TradePersonSignup({ result }) {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.proProfile.isFormProcessing
  );
  let { page_title, meta_desc, content, site_settings, services } = result;

  const [payment, setPayment] = useState("credit_card");
  const [step, setStep] = useState(1);

  const handleNext = async () => {
    let fieldsToValidate;
    // Determine which fields to validate based on the current step
    switch (step) {
      case 1:
        fieldsToValidate = ["service_id"];
        break;
      case 2:
        fieldsToValidate = [
          "business_name",
          "business_address",
          "business_type",
          "no_of_employes",
        ];
        break;
      case 3:
        fieldsToValidate = ["looking_for"];
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
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  const handleFormSubmit = () => {
    onClose();
  };

  const [selectedValue, setSelectedValue] = useState(null);
  const [employeValue, setEmployeValue] = useState(null);
  const [lookingForValue, setLookingForValue] = useState(null);

  const handleLabelClick = (event, id) => {
    setSelectedValue(id);
  };
  const handleEmployeeLabelClick = (event, id) => {
    setEmployeValue(id);
  };

  const handleLookingForLabelClick = (event, id) => {
    setLookingForValue(id);
  };
  const business_type = [
    {
      id: "self",
      title: "Self Employed",
    },
    {
      id: "limited",
      title: "Limited company",
    },
    {
      id: "start",
      title: "Looking to start a business",
    },
  ];
  const employes = [
    {
      id: "1",
      title: "1",
    },
    {
      id: "2_5",
      title: "2-5",
    },
    {
      id: "6_9",
      title: "6-9",
    },
    {
      id: "10",
      title: "10+",
    },
  ];
  const question_add = [
    {
      id: "fill_gap",
      title: "I’m looking to fill the gaps in my diary",
    },
    {
      id: "flow_leads",
      title: "I need a steady flow of leads",
    },
    {
      id: "leads",
      title: "I need as many leads as possible",
    },
    {
      id: "profile",
      title: "I just want a Checkatrade profile",
    },
    {
      id: "not_sure",
      title: "I’m not sure",
    },
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    setValue,
  } = useForm();

  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const handleSubServiceChange = (subServiceId) => {
    setSelectedSubServices((prevSelectedSubServices) => {
       const isSubServiceSelected = prevSelectedSubServices.includes(subServiceId);
        const updatedSelectedSubServices = isSubServiceSelected
        ? prevSelectedSubServices.filter((id) => id !== subServiceId)
        : [...prevSelectedSubServices, subServiceId];

      const selectedSubServiceIdsAsIntegers = updatedSelectedSubServices.map((id) => parseInt(id, 10));
        setValue('sub_services', selectedSubServiceIdsAsIntegers);
  
      return updatedSelectedSubServices;
    });
  };

  const handleCreateProfile = (data, e) => {
    // alert('hi');
    e.preventDefault();
    // console.log(data);
    dispatch(createProfessionalProfile(data));
  };

  const [subServices, setSubServices] = useState(false);
  const [getingSubServices, setGetingSubServices] = useState(false);

  const handleGetSubService = (service_id, e) => {
    // e.preventDefault();
    setGetingSubServices(true);
    try {
      http
        .post("get-sub-services", doObjToFormData({ service_id: service_id }))
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

  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main className="logon_main">
        <section className="logon_sec">
          <div className="logon_left">
            <div className="inner">
              <div className={step === 4 ? "hide_text" : ""}>
                <div className="inner_text">
                  <h1>
                    <Text string={content?.sec1_heading} />
                  </h1>
                  <Text string={content?.sec1_detail} />
                </div>
                <div className="membership_card">
                  <div className="inner_membership">
                    <div className="mini_pro">
                      <img src="/images/pro_membership.svg" alt="" />
                      <span>
                        <Text string={content?.pkg_short_heading} />
                      </span>
                    </div>
                    <div className="price_head">
                      <h2>
                        {format_amount(content?.pkg_price)}{" "}
                        <span>{content?.pkg_duration}</span>
                      </h2>
                    </div>
                    <Text string={content?.pkg_detail} />
                  </div>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <Link href={content?.sec1_button1_link}>
                  <Text string={content?.sec1_button1_text} />
                </Link>
              </li>
              <li>
                <Link href={content?.sec1_button2_link}>
                  <Text string={content?.sec1_button2_text} />
                </Link>
              </li>
              <li>
                <Link href={content?.sec1_button3_link}>
                  <Text string={content?.sec1_button3_text} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="logon_right">
            <div className="login_header trade_person_header">
              <div className="logon_logo">
                <Link href="/">
                  <Image
                    src={cmsFileUrl(site_settings?.site_logo)}
                    width={220}
                    height={40}
                    alt={site_settings?.site_name}
                  />
                </Link>
              </div>
            </div>
            <div className="right_inner">
              <form method="POST" onSubmit={handleSubmit(handleCreateProfile)}>
                <div className="multi-step-form trade_register_form">
                  <div
                    className={`step ${
                      step === 1 ? "field_set active" : "field_set"
                    }`}
                  >
                    <h6>What Service You Offered</h6>
                    <div className="form_blk">
                      <select
                        name="service_id"
                        className="input"
                        {...register("service_id", {
                          required: "Required",
                        })}
                        onChange={(e) => handleGetSubService(e.target.value)}
                      >
                        <option value="">Choose offered service</option>
                        {services?.map((ser, i) => {
                          return (
                            <option value={ser?.id} key={i}>
                              {ser?.title}
                            </option>
                          );
                        })}
                      </select>

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.service_id?.message}
                      </div>
                      <div className="br"></div>

                      {getingSubServices && (
                        <div class="text-center">
                          <div
                            class="spinner-border text-primary"
                            role="status"
                          >
                            <span class="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}

                      {subServices && (
                        <>
                          <h6>Select Sub Services</h6>
                          <div>
                            {subServices?.map((val) => {
                              return (
                                <div className="lbl_btn" key={val.id}>
                                  <input
                                    type="checkbox"
                                    name="sub_service"
                                    value={val?.id}
                                    id={`sub_ser${val.id}`}
                                    checked={selectedSubServices.includes(val.id)}
                                    onChange={() => handleSubServiceChange(val.id)}
                                   
                                  />
                                  <label htmlFor={`sub_ser${val.id}`}>
                                    {val?.title}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={`step ${
                      step === 2 ? "field_set active" : "field_set"
                    }`}
                  >
                    <div className="form_blk">
                      <h6>What is your business called?</h6>
                      <input
                        type="text"
                        name="business_name"
                        className="input"
                        placeholder="Enter your business name"
                        {...register("business_name", {
                          required: "Required",
                        })}
                      />
                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.business_name?.message}
                      </div>
                    </div>
                    <div className="form_blk">
                      <h6>Address of your business</h6>
                      <input
                        type="text"
                        name="business_address"
                        className="input"
                        placeholder="Enter address of your business"
                        {...register("business_address", {
                          required: "Required",
                        })}
                      />

                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.business_address?.message}
                      </div>
                    </div>
                    <div className="form_blk">
                      <h6>Business type</h6>
                      <ul className="l_flex two_flex last_full">
                        {business_type.map((val) => {
                          return (
                            <li key={val.id}>
                              <div
                                className={`lbl_btn ${
                                  selectedValue === val.id ? "active" : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="business_type"
                                  value={val.title}
                                  id={`typ-${val.id}`}
                                  checked={selectedValue === val.id}
                                  onChange={() => setSelectedValue(val.id)}
                                  {...register("business_type", {
                                    required: "Required",
                                  })}
                                />

                                <label
                                  htmlFor={`typ-${val.id}`}
                                  onClick={(e) => handleLabelClick(e, val.id)}
                                >
                                  {val.title}
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.business_type?.message}
                      </div>
                    </div>
                    <div className="form_blk">
                      <h6>How many employes do you have?</h6>
                      <ul className="l_flex no_wrap_flex">
                        {employes.map((val) => {
                          return (
                            <li key={val.id}>
                              <div
                                className={`lbl_btn ${
                                  employeValue === val.id ? "active" : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="no_of_employes"
                                  value={val.title}
                                  id={`emp-${val.id}`}
                                  checked={employeValue === val.id}
                                  onChange={() => setEmployeValue(val.id)}
                                  {...register("no_of_employes", {
                                    required: "Required",
                                  })}
                                />
                                <label
                                  htmlFor={`emp-${val.id}`}
                                  onClick={(e) =>
                                    handleEmployeeLabelClick(e, val.id)
                                  }
                                >
                                  {val.title}
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.no_of_employes?.message}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`step ${
                      step === 3 ? "field_set active" : "field_set"
                    }`}
                  >
                    <div className="form_blk">
                      <h6>What are you looking for?</h6>
                      <ul className="l_flex all_full">
                        {question_add.map((val) => {
                          return (
                            <li key={val.id}>
                              <div
                                className={`lbl_btn ${
                                  lookingForValue === val.id ? "active" : ""
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="looking_for"
                                  value={val.title}
                                  id={`for-${val.id}`}
                                  checked={lookingForValue === val.id}
                                  onChange={() => setLookingForValue(val.id)}
                                  {...register("looking_for", {
                                    required: "Required",
                                  })}
                                />
                                <label
                                  htmlFor={`for-${val.id}`}
                                  onClick={(e) =>
                                    handleLookingForLabelClick(e, val.id)
                                  }
                                >
                                  {val.title}
                                </label>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div
                        className="validation-error"
                        style={{ color: "red" }}
                      >
                        {errors.looking_for?.message}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`step checkout_step ${
                      step === 4 ? "field_set active" : "field_set"
                    }`}
                  >
                    <div className="form_blk">
                      <h6>Checkout</h6>
                      <div className="btn_blk payment_btn">
                        <button
                          type="button"
                          className={`site_btn blank credit ${
                            payment === "credit_card" ? "active" : ""
                          }`}
                          onClick={() => setPayment("credit_card")}
                        >
                          <img src="/images/creditcard.svg" alt="credit card" />
                          <span>Credit Card</span>
                        </button>
                        <button
                          type="button"
                          className={`site_btn blank paypal ${
                            payment === "pay_pal" ? "active" : ""
                          }`}
                          onClick={() => setPayment("pay_pal")}
                        >
                          <img
                            src="/images/paypal-solid.svg"
                            alt="credit card"
                          />
                          <span>Pay Pal</span>
                        </button>
                      </div>
                      <div
                        className={`credit_fields ${
                          payment === "credit_card" ? "" : "hide"
                        }`}
                      >
                        {/* <div className="form_blk relative_field">
                          <input
                            type="text"
                            name=""
                            placeholder="Card number"
                            className="input"
                          />
                          <img src="/images/ri_visa-line.svg" alt="" />
                        </div> */}
                        <div className="form_blk">
                          <input
                            type="text"
                            name="card_holder_name"
                            placeholder="Card holder name"
                            className="input"
                            {...register("card_holder_name", {
                              required: "Required",
                            })}
                          />

                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.card_holder_name?.message}
                          </div>
                        </div>
                        {/* <div className="flex flex_blk">
                          <input
                            type="text"
                            name=""
                            placeholder="Exp. Date"
                            className="input"
                          />
                          <input
                            type="text"
                            name=""
                            placeholder="CVV"
                            className="input"
                          />
                        </div> */}
                      </div>
                      <div
                        className={`credit_fields ${
                          payment === "pay_pal" ? "" : "hide"
                        }`}
                      >
                        <p>
                          After clicking "Submit", you will be redirected to
                          PayPal to complete your purchase securely.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="btn_blk text-center">
                    {step > 1 && (
                      <button
                        onClick={handleBack}
                        className="site_btn color"
                        type="button"
                      >
                        Back
                      </button>
                    )}
                    {step < 4 ? (
                      <button
                        onClick={handleNext}
                        className="site_btn"
                        type="button"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        className="site_btn"
                        type="submit"
                        disabled={isFormProcessing}
                      >
                        Submit{" "}
                        {isFormProcessing && (
                          <i
                            className={
                              isFormProcessing ? "spinner" : "spinnerHidden"
                            }
                          ></i>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
