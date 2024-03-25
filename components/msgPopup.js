import React, { useState } from "react";
import Link from "next/link";

export default function MsgPopup({heading, msg}) {


  return (
    <>
    <div className="text-center">
    <h2 className="text-danger">{heading}</h2>
      <h4>{msg}</h4>
    </div>
      
      
    </>
  );
}
