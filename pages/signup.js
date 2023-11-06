import React, { useState} from "react";
import Link from 'next/link'
export default function Signup() {
  return (
    <>
      <main className="logon_main">
        <section className="logon_sec">
            <div className="logon_left">
                <div className="inner">
                    <h1>Hello Friend</h1>
                    <p>Enjoy the convenience of finding, booking, and communicating with service providers in one place.</p>
                </div>
                <ul>
                    <li><Link href="/contact">Contact  Us</Link></li>
                    <li><Link href="/contact">Terms of use</Link></li>
                    <li><Link href="/contact">Privacy Policy</Link></li>
                </ul>
            </div>
            <div className="logon_right">
                <div className="login_header">
                    <div className="logon_logo">
                        <Link href="/">
                            <img src="images/logo_log.svg" alt="" />
                        </Link>
                    </div>
                    <div className="btn_blk">
                        <Link href="" className="site_btn">Become a Professional</Link>
                    </div>
                </div>
                <div className="right_inner">
                    <h2>Create an account</h2>
                    <p>Enter your details below</p>
                    <form>
                        <div className="form_blk">
                            <input
                            id="full-name"
                            type="text"
                            name="fullname"
                            autoComplete="fullname"
                            placeholder="Full name"
                            className="input"
                            required
                            />
                        </div>
                        <div className="form_blk">
                            <input
                            id="frm-email"
                            type="email"
                            name="email"
                            autoComplete="name"
                            placeholder="Email address"
                            className="input"
                            required
                            />
                        </div>
                        <div className="form_blk">
                            <input
                            id="phone"
                            type="text"
                            name="phone"
                            autoComplete="phone"
                            placeholder="Phone number"
                            className="input"
                            required
                            />
                        </div>
                        <div className="form_blk">
                            <input
                            id="frm-password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input"
                            required
                            />
                        </div>
                        <div className="have_check">
                            <div className="lbl_btn">
                                <input type="checkbox" name="remember" id="remember"/>
                                <label htmlFor="remember">By creating an account you confirm that you agree to our website <Link href="">terms of use</Link> and our <Link href="">privacy notice</Link>.</label>
                            </div>
                        </div>
                        <div className="btn_blk">
                            <button className="site_btn block">Create an Account</button>
                        </div>
                        <div className="question">
                            <p>Already have an account? <Link href="/login">Sign in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
