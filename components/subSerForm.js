import React, { useState, useEffect } from "react";
import FileInputButton from "./fileInputButton";
import { useForm } from "react-hook-form";
import http from "../helpers/http";
import { doObjToFormData } from "../helpers/helpers";
import toast from "react-hot-toast";
import { useRouter } from "next/router";



const SubSerForm = ({ onClose, service_id, serviceTitle, getingSubServices, setGetingSubServices}) => {
  const router = useRouter();
   const [isFormProcessing, setIsFormProcessing] = useState(false)
  const [subServices, setSubServices] = useState(false);

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


  const [selectedSubServiceValue, setSelectedSubServiceValue] = useState(null);

  const handleSubServiceLabelClick = (event, id) => {
    setSelectedSubServiceValue(id);
  };

 

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();

  const handleSearchProfession = async (data) => {
    try {
      // Set the form processing state to true
      setIsFormProcessing(true);
  
      // Perform the search or any other asynchronous operations here
  
      // Wait for the state to update and the component to re-render
      await new Promise((resolve) => setTimeout(resolve, 0));
  
      // Now, you can safely execute router.push
      router.push(`/search-result?service_id=${service_id}&sub_service_id=${data?.sub_service_id}`);
    } catch (error) {
      console.error("An error occurred:", error);
    } 
  };

  return (
    <form method="POST" onSubmit={handleSubmit(handleSearchProfession)}>
      <div className="multi-step-form">
        
        <div
          className={`step field_set active`}
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
        
        
        <div className="br"></div>
        <div className="btn_blk text-center">
          
            <button type="submit" className="site_btn" disabled={isFormProcessing}>
              Search{isFormProcessing && 
                          <i
                          className={
                            isFormProcessing ? "spinner" : "spinnerHidden"
                          }
                        ></i>
                    }
            </button>
        
        </div>
      </div>
    </form>
  );
};

export default SubSerForm;
