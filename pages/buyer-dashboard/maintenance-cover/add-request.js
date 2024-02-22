import React, { useState, useRef } from "react";
import Link from "next/link";
import LayoutBuyerDashboard from "@/components/components/layoutBuyerDashbord";
import NextNProgress from "nextjs-progressbar";
import { fetchBuyerDashboardData } from "@/components/states/actions/buyer/account";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Text from "@/components/components/text";
import { Toaster } from "react-hot-toast";
import { cmsFileUrl, isEmpty } from "@/components/helpers/helpers";
import Image from "next/image";
import { encrypt_decrypt } from "@/components/helpers/rsa-helper";

export default function AddRequest() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.account.content);
  const member = useSelector((state) => state.account.mem);
  const isLoading = useSelector((state) => state.account.isLoading);
  const sent_sms = useSelector((state) => state.account.sent_sms);
  // console.log("dashboard",data);
  const {
    site_settings,
    page_title,
    wishlist_count,
    contract_converged_count,
    message_count,
  } = data;

  useEffect(() => {
    dispatch(fetchBuyerDashboardData());
  }, []);
  const fileInputRef = useRef(null);
  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  return (
    <>
      {/* <NextNProgress color="#004AAD" /> */}
      <main>
        <Toaster position="top-center" />
        
        {isLoading && (
          <>
          <Head>
          <title>{"fetching..."}</title>
        </Head>
            <div className="br"></div>
            <div className="text-center">
              <div
                className="spinner-border text-danger"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
        {!isLoading && (
          <>
          <Head>
          <title>{page_title ? page_title : "fetching..."}</title>
        </Head>
        <section className="dashboard professional_details">
            <div className="contain">
                <div className="sec_heading">
                    <h3>Add New Maintenance Request</h3>
                </div>
                <div className="custom_blk_main">
                    <form>
                        <div className="from_row row">
                            <div className="col-sm-12">
                                <div className="blk_form">
                                    <h6>
                                    Title
                                    </h6>
                                    <div className="form_blk">
                                        <input type="text" name="title" className="input"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="blk_form">
                                    <h6>
                                    Choose Category
                                    </h6>
                                    <div className="form_blk">
                                        <select className="input">
                                            <option>Electrician Services</option>
                                            <option>Plumber Services</option>
                                            <option>Painter Services</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="blk_form">
                                    <h6>
                                    Choose Sub Category
                                    </h6>
                                    <div className="form_blk">
                                        <select className="input">
                                            <option>Electrical Installation and Wiring</option>
                                            <option>Electrical Repairs</option>
                                            <option>Safety Inspections</option>
                                            <option>Panel Upgrades</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="blk_form">
                                    <h6>
                                    Details
                                    </h6>
                                    <div className="form_blk">
                                        <textarea className="input"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <h6>Upload Images</h6>
                                <div className="add_portfolio_blk">
                                    <div className="profile_grid_edit scrollbar">
                                        <div className="flex">
                                            <div className="img_col">
                                                <div className="inner_img">
                                                <img
                                                    src="/images/989.png"
                                                    alt=""
                                                />
                                                <button
                                                    className="x_btn"
                                                    type="button">
                                                </button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img
                                                    src="/images/portfolio1.png"
                                                    alt=""
                                                    />
                                                    <button
                                                        className="x_btn"
                                                        type="button">
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img
                                                    src="/images/portfolio2.png"
                                                    alt=""
                                                    />
                                                    <button
                                                        className="x_btn"
                                                        type="button">
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img
                                                    src="/images/portfolio3.png"
                                                    alt=""
                                                    />
                                                    <button
                                                        className="x_btn"
                                                        type="button">
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="br"></div>
                                    <div className="btn_blk">
                                    <button
                                        type="button"
                                        className="site_btn color filter_btn"
                                        onClick={handleButtonClick}
                                    >
                                        <img src="/images/clip.svg" alt="" />
                                        <span>Upload</span>
                                    </button>
                                    <input
                                            type="file"
                                            ref={fileInputRef}
                                            multiple
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="br"></div>
                          <div className="btn_blk text-right cell_wide_full">
                            <button
                              type="submit"
                              className="site_btn"
                            >
                                Submit
                            </button>
                          </div>
                    </form>
                </div>
            </div>
          </section>
          </>
          
        )}
      </main>
    </>
  );
}
AddRequest.getLayout = function (page) {
  return <LayoutBuyerDashboard>{page}</LayoutBuyerDashboard>;
};
