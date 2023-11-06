import React, { useState} from "react";
import Link from 'next/link'
export default function Login() {
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
                    <h2>Sign in to your account</h2>
                    <p>Enter your login details below</p>
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
                        <div className="form_blk">
                            <input
                            id="frm-password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="input"
                            required
                            />
                        </div>
                        <div className="have_check">
                            <div className="lbl_btn">
                                <input type="checkbox" name="remember" id="remember"/>
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <Link href="/forgot-password">Forgot your password ?</Link>
                        </div>
                        <div className="btn_blk">
                            <button className="site_btn block">Sign In</button>
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
