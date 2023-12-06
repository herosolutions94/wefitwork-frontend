import React, { useState } from 'react';
import Link from 'next/link';
const ProfessionalSidebar = ({data}) => {
  
  return (
    <ul>
        <li className={data === "profile" ? "active" : ""}><Link href="profile-settings">Profile</Link></li>
        <li className={data === "my-business" ? "active" : ""}><Link href="services">My Business</Link></li>
        <li className={data === "notifications" ? "active" : ""}><Link href="notifications">Notifications</Link></li>
        <li className={data === "subscription" ? "active" : ""}><Link href="subscription">Subscriptions</Link></li>
        {/* <li className={data === "services" ? "active" : ""}><Link href="services">Services</Link></li> */}
        <li className={data === "account" ? "active" : ""}><Link href="my-account">My Account</Link></li>

    </ul>
  );
};

export default ProfessionalSidebar;
