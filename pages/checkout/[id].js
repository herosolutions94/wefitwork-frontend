import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import http from "@/components/helpers/http";
import Text from "@/components/components/text";
import MetaGenerator from "@/components/components/meta-generator";
import Testimonials from "@/components/components/testimonials";
import {
  cmsFileUrl,
  doObjToFormData,
  format_amount_comma,
} from "@/components/helpers/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import { authToken } from "@/components/helpers/authToken";
import toast, { Toaster } from "react-hot-toast";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";
import { parse } from "cookie";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import McoverPaystack from "@/components/components/mcoverPaystack";
import { saveMaintenanceCoverPayment } from "@/components/states/actions/buyer/maintenanceCover";
import { useDispatch, useSelector } from "react-redux";
import PopupSmall from "@/components/components/popupSmall";
import LoginPopup from "@/components/components/authPopup";
import FileIconsByExtensyionReceipt from "@/components/components/fileIconsByExtReceipt";

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const m_id = encrypt_decrypt("decrypt", id);

  const { req } = context;
  const cookieHeader = req.headers.cookie || "";
  // Parse the cookie header to extract the specific cookie value
  const cookieValue = parse(cookieHeader);
  const authToken =
    cookieValue["authToken"] !== undefined &&
      cookieValue["authToken"] !== null &&
      cookieValue["authToken"] !== ""
      ? cookieValue["authToken"]
      : null;

  const result = await http
    .post(`checkout-page/${m_id}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Checkout({ result }) {
  const router = useRouter();

  // Access URL parameters
  const { id } = router.query;
  let { page_title, meta_desc, content, maintenance_cover, included, memData, type_prices, sales_managers, site_settings } =
    result;
  const token = authToken();
  const [step, setStep] = useState(0);
  const [cardMethod, setCardMethod] = useState(false);
  const [paymentMethod, setpaymentMethod] = useState('paystack');

  const toggleCard = (payment_method) => {
    setCardMethod(!cardMethod);
    setPaypalMethod(false);
    setpaymentMethod(payment_method)
  };
  const [paypalMethod, setPaypalMethod] = useState(false);
  const togglePaypal = () => {
    setPaypalMethod(!paypalMethod);
    setCardMethod(false);
  };
  const NextToggle = async () => {
    let fieldsToValidate = [];
    // Determine which fields to validate based on the current step
    switch (step) {
      case 0:
        fieldsToValidate.push("fullname", "email", "phone", "house_type", "address", "refferd_by");
        break;
      case 1:
        fieldsToValidate.push("agree");
        break;
      default:
      // Handle other steps if needed
      // fieldsToValidate = [];
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
  const BackToggle = () => {
    setStep(step - 1);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue,
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenanceCover.content);
  const member = useSelector((state) => state.maintenanceCover.mem);
  const isLoading = useSelector((state) => state.maintenanceCover.isLoading);
  const isFormProcessing = useSelector(
    (state) => state.maintenanceCover.isFormProcessing
  );

  const [payInProcess, setPayInProcess] = useState(false);

  const [receipt, setReceipt] = useState(null);
  const [previewReceipt, setPreviewReceipt] = useState(null);
  const [receiptError, setReceiptError] = useState(false);

  const receiptRef = useRef(null);

  const handleReceiptClick = (e) => {
    e.preventDefault();
    receiptRef.current.click();
  };
  const handleReceiptSelected = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setReceipt(e);
      setPreviewReceipt(URL.createObjectURL(e.target.files[0]));
      setReceiptError(false)
    }
  };

  const handleSavePayment = (data, saveFormData = false) => {
    setReceiptError(false);
    if(paymentMethod == 'paystack'){
      if (saveFormData === true) {
            data = { ...data, maintenance_cover_id: parseInt(maintenance_cover?.id), payment_method : 'paystack' }
            dispatch(saveMaintenanceCoverPayment(data));
          }
    }else if(paymentMethod == 'bank'){
      if (receipt !== null){
        data.bank_receipt = receipt.target.files;
        console.log(data);

      data = { ...data, maintenance_cover_id: parseInt(maintenance_cover?.id), payment_method : 'bank' }
      dispatch(saveMaintenanceCoverPayment(data));

      }else{
        setReceiptError('Please upload your bank receipt')
        toast.error('Please upload your bank receipt');
      }

     
    }
    
  }


  const [authPopup, setAuthPopup] = useState(false);
  const [simpleLogin, setSimpleLogin] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const selectedHouseType = watch("house_type");

  const handleSetPrice = (typeOfHouse) => {
    const selectedType = type_prices.find((typ) => typ.type_of_house === typeOfHouse);
    if (selectedType) {
      setTotalPrice(selectedType.price);
    }
  };

  // Watch for changes in the "house_type" field and update the price
  useEffect(() => {
    handleSetPrice(selectedHouseType);
  }, [selectedHouseType]);


  return (
    <>
      <Toaster position="top-center" />
      <MetaGenerator page_title={page_title} meta_desc={meta_desc} />
      <main>
        <section className="checkout_bdy">
          <div className="contain">
            <div className="sec_heading">
              <h1>
                <Text string={content?.sec1_heading} />
              </h1>
            </div>
            <div className="flex">
              <div className="colL">
                <div className="steps_bullets">
                  <span
                    className={
                      step == 0 || step == 1 || step == 2 ? "active" : ""
                    }
                  >
                    Personal Details
                  </span>
                  <span className={step == 1 || step == 2 ? "active" : ""}>
                    Terms and conditions
                  </span>
                  <span className={step == 2 ? "active" : ""}>Payment</span>
                </div>
                <div className="checkout_blk">
                  <form method="POST" onSubmit={handleSubmit(handleSavePayment)}>
                    <fieldset className={step == 0 ? "active" : ""}>
                      <h4 className="heading">Please fill these fields</h4>
                      <div className="row form_row">
                      <div className="col-xs-6">
                          <h6>Sales By</h6>
                          <select className="input" name="" {...register("refferd_by", {
                            required: " Required",

                          })}>
                            <option value="">Select Refferd</option>
                            {sales_managers?.map((sale) => {
                              return (
                                <option key={sale?.id} value={sale?.id} selected={sale?.id == 0 ? true : false}>{sale?.name}</option>
                              )
                            })}


                          </select>
                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.refferd_by?.message}
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <h6>Full name</h6>
                          <input
                            type="text"
                            name="fullname"
                            className="input"
                            defaultValue={memData?.mem_fname}
                            {...register("fullname", {
                              pattern: {
                                value: /^[a-zA-Z][a-zA-Z ]*$/,
                                message: "Invalid Value",
                              },
                              required: "Full Name is Rquired",
                            })}
                          />
                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.fullname?.message}
                          </div>
                        </div>

                        <div className="col-xs-6">
                          <h6>Email</h6>
                          <input
                            id="frm-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Email address"
                            defaultValue={memData?.mem_email}
                            className="input"
                            {...register("email", {
                              required: "Email is Required",
                              pattern: {
                                value:
                                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                                message: "Email format is not valid!",
                              },
                            })}
                          />

                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.email?.message}
                          </div>
                        </div>
                        <div className="col-xs-6">
                          <h6>Phone</h6>
                          <InputMask
                            id="phone"
                            mask="+234 999 999 9999"
                            name="phone"
                            autoComplete="phone"
                            defaultValue={memData?.mem_phone}
                            placeholder="Phone Number"
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
                        <div className="col-xs-6">
                          <h6>Type of house</h6>
                          <select className="input" name="" {...register("house_type", {
                            required: "Type of House is Required",

                          })}>
                            <option value="">Choose type of house</option>
                            {type_prices?.map((typ) => {
                              return (
                                <option key={typ?.id} value={typ?.type_of_house}>{typ?.type_of_house}</option>
                              )
                            })}


                          </select>
                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.house_type?.message}
                          </div>
                        </div>
                        <div className="col-xs-12">
                          <h6>Address</h6>
                          <input type="text" name="address" className="input" defaultValue={memData?.mem_address} {...register("address", {
                            required: "Address is Required",
                          })} />
                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.address?.message}
                          </div>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-center">
                        <Link
                          href={"/maintenance-cover/" + id}
                          className="site_btn color"
                          onClick={BackToggle}
                        >
                          Back
                        </Link>
                        <button
                          type="button"
                          className="site_btn"
                          onClick={NextToggle}
                        >
                          Next
                        </button>
                      </div>
                    </fieldset>

                    <fieldset className={step == 1 ? "active" : ""}>
                      <h4 className="heading">Terms and conditions</h4>
                      <div className="row form_row">
                        <div className="col-xs-12">
                          <div className="block_terms">
                            <Text string={content?.sec1_detail} />
                          </div>
                          <div className="br"></div>
                          <div className="lbl_btn">
                            <input type="checkbox" name="same" id="agree" {...register("agree", {
                              required: " Required",
                            })} />
                            <label for="agree">
                              <Text string={content?.sec1_checkbox_text} />
                              <a href="/terms-conditions"> terms of use</a> and
                              our <a href="/privacy-policy">privacy notice</a>.
                            </label>
                          </div>
                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {errors.agree?.message}
                          </div>
                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-center">
                        <button
                          type="button"
                          className="site_btn color"
                          onClick={BackToggle}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          className="site_btn"
                          onClick={NextToggle}
                        >
                          Next
                        </button>
                      </div>
                    </fieldset>
                    <fieldset className={step == 2 ? "active" : ""}>
                      <h4 className="heading">Payment Methods</h4>
                      <div className="outer_method">
                        <div className="main_method">
                          {/* <div className="blk_method">
                            <div className="lbl_btn">
                              <input
                                type="radio"
                                name="method"
                                value="card"
                                id="credit_card"
                              />
                              <label htmlFor="credit_card" onClick={toggleCard}>
                                <div className="img_icon">
                                  <img src="/images/credit-card.png" alt="" />
                                </div>
                                <span>Credit Card</span>
                              </label>
                            </div>
                            <div
                              className={
                                cardMethod
                                  ? "row form_row show_sec active"
                                  : "row form_row show_sec"
                              }
                            >
                              <div className="col-xs-6">
                                <h6>Card number</h6>
                                <input type="text" name="" className="input" />
                              </div>
                              <div className="col-xs-6">
                                <h6>Card holder</h6>
                                <input type="text" name="" className="input" />
                              </div>
                              <div className="col-xs-6">
                                <h6>Expiry(mm/dd/yy)</h6>
                                <input type="text" name="" className="input" />
                              </div>
                              <div className="col-xs-6">
                                <h6>CVC</h6>
                                <input type="text" name="" className="input" />
                              </div>
                            </div>
                          </div> */}

                          {/* <div className="blk_method">
                            <div className="lbl_btn">
                              <input
                                type="radio"
                                name="method"
                                value="paypal"
                                id="paypal"
                              />
                              <label htmlFor="paypal" onClick={togglePaypal}>
                                <div className="img_icon">
                                  <img src="/images/paypal.png" alt="" />
                                </div>
                                <span>Paypal</span>
                              </label>
                            </div>
                            <div
                              className={
                                paypalMethod ? "show_sec active" : "show_sec"
                              }
                            >
                              <div className="image_paypal">
                                <img src="/images/card-out.svg" alt="" />
                              </div>
                              <p className="text-center">
                                After clicking "Submit", you will be redirected
                                to PayPal to complete your purchase securely.
                              </p>
                            </div>
                          </div> */}

                          <div className="blk_method">
                            <div className="lbl_btn">
                              <input
                                type="radio"
                                name="method"
                                value="paystack"
                                id="paystack"
                                checked={true}
                                onChange={() => setpaymentMethod('paystack')}
                              />
                              <label htmlFor="paystack" onClick={() => toggleCard('paystack')}>
                                <div className="img_icon">
                                  <img src="/images/paystack.png" alt="" />
                                </div>
                                <span>Paystack</span>
                              </label>
                            </div>
                            <div className={
                                paymentMethod == 'paystack'
                                  ? "row form_row show_sec active"
                                  : "row form_row show_sec"
                              }>
                              <div className="image_paypal">
                                <img src="/images/card-out.svg" alt="" />
                              </div>
                              <p className="text-center">
                                After clicking "Submit", Paystack payment
                                popup will appear to complete your purchase securely.
                              </p>
                            </div>
                          </div>

<div className="blk_method">
                            <div className="lbl_btn">
                              <input
                                type="radio"
                                name="method"
                                value="bank_pay"
                                id="bank_pay"
                                onChange={() => setpaymentMethod('bank')}
                              />
                              <label htmlFor="bank_pay" onClick={() => toggleCard('bank')}>
                                <div className="img_icon">
                                  <img src="/images/bank.png" alt="" />
                                </div>
                                <span>Bank Deposit</span>
                              </label>
                            </div>
                            <div
                              className={
                                paymentMethod == 'bank'
                                  ? "row form_row show_sec active"
                                  : "row form_row show_sec"
                              }
                            >
                              <div className="col-xs-12 text-center">
                               <Text string={site_settings?.site_bank_detail} />
                              </div>
                              
                              <div className="col-xs-6">
                                <h6>Upload Receipt Copy</h6>
                                <div className="dp_flex">
                                {previewReceipt !== null &&
                                  <FileIconsByExtensyionReceipt file={previewReceipt} display_name={receipt.target.files[0].name} />
                                
                                }
<br />
                        </div>
                                <input type="file" name="receipt" className="input" ref={receiptRef} style={{display: 'none'}} onChange={handleReceiptSelected} />
                                <div className="btn_blk">
                          <button
                            className="site_btn color blank"
                            type="button"
                            onClick={handleReceiptClick}
                          >
                            Upload Bank Receipt
                          </button>

                          <div
                            className="validation-error"
                            style={{ color: "red" }}
                          >
                            {receiptError ? receiptError : ''}
                          </div>
                        </div>
                              
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                      <div className="br"></div>
                      <div className="btn_blk text-center">
                        <button
                          type="button"
                          className="site_btn color"
                          onClick={BackToggle}
                        >
                          Back
                        </button>
                        {!token && (memData?.mem_email == "" || memData?.mem_email == null || !memData || memData == null || memData == undefined) ?
                          <button type="button" className="site_btn" disabled={isFormProcessing}
                            onClick={() => {
                              toast.error(
                                "please login first to make payment"
                              );
                              setAuthPopup(true)
                              setSimpleLogin(true)
                            }

                            }>
                            Submit
                          </button>
                          :
                          <>
                          {paymentMethod == 'paystack' && (
                            isFormProcessing ? (
                            <button type="button" className="site_btn" disabled={isFormProcessing}
                            >
                              Submit{isFormProcessing && (
                                <i
                                  className={
                                    isFormProcessing ? "spinner" : "spinnerHidden"
                                  }
                                ></i>
                              )}
                            </button>
                          ) : (
                            <McoverPaystack
                              memData={memData}
                              handleSavePayment={handleSavePayment}
                              watcFields={watch()}
                              mem_email={watch().email}
                              price={totalPrice}

                            />
                          )
                          )}
                          {paymentMethod == 'bank' && (
                            
                            <button type="submit" className="site_btn" disabled={isFormProcessing}
                            >
                              Submit Bank{isFormProcessing && (
                                <i
                                  className={
                                    isFormProcessing ? "spinner" : "spinnerHidden"
                                  }
                                ></i>
                              )}
                            </button>
                           
                          )}
                          </>
                          
                          

                        }



                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
              <div className="colR">
                <div className="inner">
                  {/* <div className="img_icon">
                            <img src="/images/icon2.svg" alt="" />
                        </div> */}
                  <h3>
                    <Text string={maintenance_cover?.service_title} />
                  </h3>


                  <h1>
                    {totalPrice > 0 ? format_amount_comma(parseFloat(totalPrice)) : format_amount_comma(parseFloat(maintenance_cover?.price))}
                    <sub>
                      {maintenance_cover?.interval == "monthly" && "Per Month"}
                      {maintenance_cover?.interval == "yearly" && "Per Year"}
                    </sub>
                  </h1>
                  <div className="bdy_in">
                    <p>
                      <Text string={maintenance_cover?.short_desc} />
                    </p>
                    <ul>
                      {included?.map((inc) => {
                        return (
                          <li key={inc?.id}>
                            <Text string={inc?.title} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {authPopup && (
        <PopupSmall isOpen={authPopup} onClose={() => setAuthPopup(false)}>
          <LoginPopup
            handleOpenPopupSend={false}
            proData={false}
            setAuthPopup={setAuthPopup}
            isChatLogin={false}
            startChat={false}
            simpleLogin={simpleLogin}

          />
        </PopupSmall>
      )}
    </>
  );
}
