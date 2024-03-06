import React, { useState } from "react";
import { useForm } from "react-hook-form";
import http from "../helpers/http";
import { doObjToFormData } from "../helpers/helpers";
import Text from "./text";
import { SUCCESSFUL_SIGNIN_MESSAGE } from "../constants/messages";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import { authToken } from "../helpers/authToken";

export default function EmialPopup({memData, setEmailPopup}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const [isFormProcessing, setIsFormProcessing] = useState(false);

  const handleSaveEmail = (formData) => {
    formData = {...formData, token: authToken()}
    // console.log('handle sign in', data);
    setIsFormProcessing(true);
    try {
      http.post("user/save-mem-email", doObjToFormData(formData)).then((data) => {
        // console.log(data);
        if (data.data.status) {
          toast.success("Email saved", { duration: 6000 });
          setTimeout(() => {

            setIsFormProcessing(false);

            router.reload();
          }, 2000);
          
          setEmailPopup(false);
        } else {
          if (data.data.validationErrors) {
            toast.error(
              <Text string={data.data.validationErrors} parse={true} />,
              {
                duration: 6000,
              }
            );
          } else {
            toast.error(<Text string={"Technical Fault"} parse={true} />, {
              duration: 6000,
            });
          }
          setIsFormProcessing(false);
        }
      });
    } catch (errors) {
      console.log("Errors", errors);
    }
  };

  return (
    <>
      {/* <h2>Login</h2> */}
      <h6 style={{color: '#dc3545'}}>You haven't added email. Please Entre your Email Here to make professional profile.</h6>
      <form method="POST" onSubmit={handleSubmit(handleSaveEmail)} >
        <div className="form_blk">
          <input
            id="frm-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="input"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                message: "Email format is not valid!",
              },
            })}
          />

          <div className="validation-error" style={{ color: "red" }}>
            {errors.email?.message}
          </div>
        </div>
   

        <div className="btn_blk text-center">
          <button
            className="site_btn"
            type="submit"
            disabled={isFormProcessing}
          >
            Submit
            {isFormProcessing && (
              <i className={isFormProcessing ? "spinner" : "spinnerHidden"}></i>
            )}
          </button>
        </div>
       
      </form>
    </>
  );
}
