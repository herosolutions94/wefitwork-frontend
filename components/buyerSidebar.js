import React, { useState } from 'react';
import Link from 'next/link';
const BuyerSidebar = ({data}) => {
  
  return (
    <ul>
        <li className={data === "profile" ? "active" : ""}><Link href="profile-settings">Profile</Link></li>
        <li className={data === "account" ? "active" : ""}><Link href="my-account">My Account</Link></li>
        <li className={data === "notifications" ? "active" : ""}><Link href="notifications">Notifications</Link></li>
        <li className={data === "bookings" ? "active" : ""}><Link href="bookings">Bookings</Link></li>
    </ul>
  );
};

export default BuyerSidebar;
