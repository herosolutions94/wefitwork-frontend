import React from "react";
import OTPInput from "react-otp-input";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { requestPhoneVerify, VerifyPhoneNumber } from "../states/actions/professional/phoneVerification";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

export default function VerifyPhone({ phoneNumber, phoneType }) {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.phoneVerification.isFormProcessing
  );
  const pro_profile = useSelector(
    (state) => state.phoneVerification.pro_profile
  );
  const verify_popup = useSelector(
    (state) => state.phoneVerification.verify_popup
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const handleRequestVerifyPhone = () => {
    let p = watch().phone;
    let phone = p.slice(1);
    let phone_no = "+234"+phone
    let formData = { phone: phone_no, type: phoneType };
    dispatch(requestPhoneVerify(formData));
  };

  const handlePhoneVerification = (data) => {
    const verify_phone = getCookie("verify_phone");
    const formattedPhoneNumber = data?.phone.replace(/\s/g, '');
    const formattedCookiePhoneNumber = verify_phone.replace(/\s/g, '');
    console.log(phoneType)
    if (formattedPhoneNumber === formattedCookiePhoneNumber) {
      data = { ...data, type: phoneType }
      dispatch(VerifyPhoneNumber(data));
    } else {
      toast.error("Something Wrong Try Again or Try refreshing Page");
      // dispatch(VerifyPhoneNumber(data));
    }
  }



  return (
    <>
      <div className="sec_heading">
        <h2>Verify Your Phone Number</h2>
      </div>
      {!verify_popup && (
        <>
          <h6>{phoneType == "pro" ? "Entre Your Business Phone Number" : "Entre Your Personal Phone Number"}</h6>
          <div className="form_blk">
            <InputMask
              id="phone"

              mask="99999999999"
              name="phone"
              defaultValue={phoneNumber?.replace("+234", "0")}
              className="input"
              {...register("phone", {
                required: "Phone number required",
              })}
            />

            <div className="validation-error" style={{ color: "red" }}>
              {errors.phone?.message}
            </div>
          </div>

          <div className="btn_blk text-right">
            <button type="button" onClick={handleRequestVerifyPhone} className="site_btn" disabled={isFormProcessing}>
              Submit {isFormProcessing && (<i className={isFormProcessing ? "spinner" : "spinnerHidden"}></i>)}
            </button>
          </div>
        </>
      )}

      {verify_popup && (
        <>
          <p>
            Enter the 6-digit verification code you received on your given phone
            number
          </p>
          <form method="POST" onSubmit={handleSubmit(handlePhoneVerification)}>
            <div className="form_blk d-flex justify-content-center align-items-center">
              <Controller
                name="code"
                control={control}
                defaultValue=""
                rules={{ required: "Verify Code is required" }}
                render={({ field, fieldState }) => (
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={6}
                    isInputNum
                    inputStyle={{ width: "50px", height: "50px" }}
                    renderSeparator={<span> &nbsp;-&nbsp; </span>}
                    renderInput={(props) => (
                      <input {...props} className="input" />
                    )}
                  />
                )}
              />

              <div className="validation-error" style={{ color: "red" }}>
                {errors.phone?.message}
              </div>
            </div>

            <div className="col text-center">

              <p>
                Don't received the code? <a type="button" onClick={handleRequestVerifyPhone} className="verfiy_btn" style={{ color: '#004AAD' }} disabled={isFormProcessing}>
                  <b>Resend Code</b>
                </a>
              </p>
            </div>

            <div className="btn_blk text-right">
              <button type="submit" className="site_btn" disabled={isFormProcessing}>
                Verify {isFormProcessing && (<i className={isFormProcessing ? "spinner" : "spinnerHidden"}></i>)}
              </button>
            </div>
          </form>
          {/* <h6>Entre Verification Code</h6> */}

        </>
      )}

      {/* <div className="container">
        <div className="col text-center">
          <h3 style={{ color: "#004AAD" }}>Verify Phone Number</h3>
          <p>
            Enter the 6-digit verification code you received on your given phone
            number
          </p>
          <h6>Enter Verification Code</h6>
        </div>

        <div className="col">
          <form method="POST">
            
            <div className="form_blk d-flex justify-content-center align-items-center">
            
              <Controller
                name="code"
                control={control}
                defaultValue=""
                rules={{ required: "Verify Code is required" }}
                render={({ field, fieldState }) => (
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={6}
                    isInputNum
                    inputStyle={{ width: "50px", height: "50px" }}
                    renderSeparator={<span> &nbsp;-&nbsp; </span>}
                    renderInput={(props) => (
                      <input {...props} className="input" />
                    )}
                  />
                )}
              />
            </div>

            <div className="col text-center">
          
          <p>
        Don't received the code? <a href="">Resend</a>
          </p>
        </div>

            <div className="br"></div>
            <div className="btn_blk text-center">
              <button type="submit" className="site_btn">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
}
