import React from "react";
import OTPInput from "react-otp-input";
import { useForm, Controller } from "react-hook-form";

export default function VerifyPhone() {
  const { handleSubmit, control, formState } = useForm();
  return (
    <>
      <div className="container">
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
      </div>
    </>
  );
}
