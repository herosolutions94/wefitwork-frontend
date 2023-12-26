import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

export default function PayStackPayment({memData}) {

    const publicKey = "pk_test_50768cfb2d5af2b1c5d2fdc5a123e5c95b85ec3e"
//   const amount = 1 * 100;
const plan_id = "PLN_kvdu0w0qs4k3afd";
  
  const email = memData ? memData?.mem_email : '';
  const name =  memData ? memData?.mem_fname : '';

  const componentProps = {
    email,
    // amount,
    plan: plan_id,
    metadata: {
      name,
    //   phone,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (response) =>{
console.log("response", response);
      alert("Thanks for doing business with us! Come back soon!!")
    },
    
    onClose: () => {alert("Wait! Don't leave :(")},
    className: "site_btn",
  }

  return (
    <>
      {/* <div className="site_btn color"> */}
        

      <PaystackButton {...componentProps} />
      {/* </div> */}
    </>
  );
}
