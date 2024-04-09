import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";


export default function McoverPaystack({memData, handleSavePayment, watcFields, mem_email, price}) {
    const publicKey = "pk_live_9f5bf982ab47337262cc18f14e51de826eb664f7"
    const priceToCharge = price * 100;
    
    const email = watcFields?.email ? watcFields?.email : '';
     let formData = watcFields;
    const componentProps = {
      email:mem_email,
      amount: priceToCharge,
      
      publicKey,
      text: "Submit",
      onSuccess: (response) =>{
        // console.log(response);
        handleSavePayment({...formData, txn_reference: response.reference}, true);
        toast.success("Payment ongoing Please wait a while....", {duration: 6000})
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
