import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import { doObjToFormData } from "../helpers/helpers";


export default function PayStackPayment({handleCreateProfile, watcFields, mem_email, mem_customer_code}) {

  const publicKey = "pk_test_50768cfb2d5af2b1c5d2fdc5a123e5c95b85ec3e"
  const plan_code = "PLN_kvdu0w0qs4k3afd";
  
  const email = watcFields?.payment_email ? watcFields?.payment_email : '';
   let formData = watcFields;
  const componentProps = {
    email:mem_email,
    // amount,
    plan: plan_code,
    
    publicKey,
    text: "Pay Now",
    onSuccess: (response) =>{
      // console.log(response);
      handleCreateProfile({...formData, txn_reference: response.reference, plan_code: plan_code}, true),
      toast.success("Thanks for doing business with us! Come back soon!!");
    },
    
    onClose: () => {alert("Wait! Don't leave :(")},
    className: "site_btn",
    disabled:true
  }

  return (
    <>
      {/* <div className="site_btn color"> */}
        

      <PaystackButton {...componentProps} />

     
      {/* </div> */}
    </>
  );
}
