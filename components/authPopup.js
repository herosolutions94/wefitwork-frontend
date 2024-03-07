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

export default function LoginPopup({
  handleOpenPopupSend,
  proData,
  setAuthPopup,
  isChatLogin,
  startChat,
  simpleLogin = false,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const [isFormProcessing, setIsFormProcessing] = useState(false);

  const handleSignin = (formData) => {
    // console.log('handle sign in', data);
    setIsFormProcessing(true);

    const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+234\d{10}$/;
    // const phoneRegex = /^\+1[2-9]\d{2}[2-9](?!11)\d{6}$/;

    const isEmail = emailRegex.test(formData.email);
    const isPhone = phoneRegex.test(formData.email);

    if (isEmail) {
      formData = { ...formData, contact_type: "email" };
    } else if (isPhone) {
      formData = { ...formData, contact_type: "phone" };
    } else {
      toast.error("Invalid email or phone format");
      return false;
    }


    try {
      http.post("auth/signin", doObjToFormData(formData)).then((data) => {
        // console.log(data);
        if (data.data.status) {
          toast.success(SUCCESSFUL_SIGNIN_MESSAGE, { duration: 6000 });
          setCookie("authToken", data.data.authToken);
          setTimeout(() => {
            setCookie("mem_type", data.data.mem_type);
            setCookie(
              "mem_professionl_profile",
              data.data.mem_professionl_profile
            );
            setCookie('contact_type', data.contact_type);

            localStorage.removeItem("redirect_url");
            setIsFormProcessing(false);
          }, 2000);
          if (simpleLogin) {
            router.reload();
          } else {
            if (!isChatLogin) {
              handleOpenPopupSend(proData, data.data.authToken);
            } else {
              startChat(proData);
            }
          }

          setAuthPopup(false);
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
      <h2>Login</h2>
      <p>Please Login First</p>
      <form method="POST" onSubmit={handleSubmit(handleSignin)}>
        <div className="form_blk">
          <input
            id="frm-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="input"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^\+234\d{10}$|^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email format is not valid!",
              },
            })}
          />

          <div className="validation-error" style={{ color: "red" }}>
            {errors.email?.message}
          </div>
        </div>
        <div className="form_blk">
          <input
            id="frm-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input"
            {...register("password", {
              required: "Required",
            })}
          />
          <div className="validation-error" style={{ color: "red" }}>
            {errors.password?.message}
          </div>
        </div>

        <div className="have_check">
          <Link
            href="/forgot-password"
            target="_blank"
            style={{
              color: "#FF3D3D",
              textDecoration: "none", // Optional: Remove underline on hover
              transition: "color 0.3s ease", // Optional: Smooth transition effect
            }}
            onMouseOver={(e) => (e.target.style.color = "#004AAD")}
            onMouseOut={(e) => (e.target.style.color = "#FF3D3D")}
          >
            <Text string={"Forgot Password?"} />
          </Link>
        </div>

        {/* <div className="br"></div> */}

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
        <div className="question text-center">
          <p>
            <Text string={`Don't have an account? `} />
            <Link
              href="/signup"
              target="_blank"
              style={{
              color: "#FF3D3D",
              textDecoration: "none", // Optional: Remove underline on hover
              transition: "color 0.3s ease", // Optional: Smooth transition effect
            }}
              onMouseOver={(e) => (e.target.style.color = "#004AAD")}
              onMouseOut={(e) => (e.target.style.color = "#FF3D3D")}
            >
              <Text string={"Sign Up Now"} />
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
