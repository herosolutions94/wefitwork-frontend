import React, { useState } from "react";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";


export default function PayStackPayment({handleCreateProfile, watcFields}) {

  const publicKey = "pk_test_50768cfb2d5af2b1c5d2fdc5a123e5c95b85ec3e"
//   const amount = 1 * 100;
  const plan_code = "PLN_kvdu0w0qs4k3afd";
  
  const email = watcFields?.payment_email ? watcFields?.payment_email : '';
 
  let formData = watcFields;

  const componentProps = {
    email,
    // amount,
    plan: plan_code,
    
    publicKey,
    text: "Pay Now",
    onSuccess: (response) =>{     
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
