import React, { useState} from "react";
import Link from 'next/link'
export default function ForgotPassword() {
  return (
    <>
      <main className="logon_main">
        <section className="logon_sec">
            <div className="logon_left">
                <div className="inner">
                    <h1>Welcome Back!</h1>
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
                    <h2>Forgot password?</h2>
                    <p>Enter your email address associated  with your account</p>
                    <form>
                        <div className="form_blk">
                            <input
                            id="frm-email"
                            type="email"
                            name="email"
                            autoComplete="name"
                            placeholder="Enter your email"
                            className="input"
                            required
                            />
                        </div>
                        
                        <div className="btn_blk">
                            <button className="site_btn block">Submit</button>
                        </div>
                        <div className="question">
                            <p>Don't have an account? <Link href="/signup">Sign up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
