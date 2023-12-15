import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import http from '../helpers/http';
import { doObjToFormData } from '../helpers/helpers';
import Text from './text';
import { SUCCESSFUL_SIGNIN_MESSAGE } from '../constants/messages';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';

export default function LoginPopup({handleOpenPopupSend, proData, setAuthPopup}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isFormProcessing, setIsFormProcessing] = useState(false);

  const handleSignin = (formData) => {
    // console.log('handle sign in', data);
    setIsFormProcessing(true);
    try {
      http.post("auth/signin", doObjToFormData(formData)).then((data) => {
        if (data.data.status) {
        
          toast.success(SUCCESSFUL_SIGNIN_MESSAGE, { duration: 6000 });
          setCookie("authToken", data.data.authToken);
          setTimeout(() => {
            setCookie('mem_type', data.data.mem_type);
            setCookie('mem_professionl_profile', data.data.mem_professionl_profile);
            
            localStorage.removeItem("redirect_url");
            setIsFormProcessing(false);
          }, 2000);
          handleOpenPopupSend(proData, data.data.authToken);
          setAuthPopup(false);
        } else {
          if (data.data.validationErrors) {
            toast.error(<Text string={data.validationErrors} parse={true} />, {
              duration: 6000,
            });
          }
        }
      });
    } catch (errors) {
      console.log("Errors", errors);
    }
  }



  return (
    <>
     
              <h2>
                Login
              </h2>
              <p>
                Please Login First
              </p>
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
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
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
                
                <div className="br"></div>
                <div className="btn_blk text-center">
                  <button
                    className="site_btn"
                    type="submit"
                    disabled={isFormProcessing}
                  >
                    Submit
                    {isFormProcessing && (
                      <i
                        className={
                          isFormProcessing ? "spinner" : "spinnerHidden"
                        }
                      ></i>
                    )}
                  </button>
                </div>
                
              </form>
   
    </>
  )
}
