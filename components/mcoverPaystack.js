import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";


export default function McoverPaystack({memData, handleSavePayment, watcFields, mem_email, planCode}) {
    const publicKey = "pk_test_50768cfb2d5af2b1c5d2fdc5a123e5c95b85ec3e"
    const plan_code = planCode;
    
    const email = watcFields?.email ? watcFields?.email : '';
     let formData = watcFields;
    const componentProps = {
      email:mem_email,
      plan: plan_code,
      
      publicKey,
      text: "Submit",
      onSuccess: (response) =>{
        console.log(response);
        handleSavePayment({...formData, txn_reference: response.reference, plan_code: plan_code}, true),
        toast.success("Thanks for doing business with us! Come back soon!!");
      },
      
      onClose: () => {alert("Wait! Don't leave :(")},
      className: "site_btn",
      
    }
  
    return (
      <>
        {/* <div className="site_btn color"> */}
          
  
        <PaystackButton {...componentProps}  />
  
       
        {/* </div> */}
      </>
    );
}
