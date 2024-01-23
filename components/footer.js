import Link from "next/link";
import React from "react";
import Text from "./text";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { saveNewsletter } from "../states/actions/newsletter";
import { useDispatch, useSelector } from "react-redux";

export default function Footer({ siteSettings }) {
  const dispatch = useDispatch();
  const isFormProcessing = useSelector(
    (state) => state.contactUs.isFormProcessing
  );

  const data = {
    list_02: [
      {
        id: 1,
        text: "Help",
        link: "/help",
      },
      {
        id: 2,
        text: "Become a Professional",
        link: "/become-professional",
      },
      {
        id: 3,
        text: "Contact Us",
        link: "/contact",
      },
      {
        id: 4,
        text: "Privacy policies",
        link: "/privacy-policy",
      },
      {
        id: 5,
        text: "Terms & Conditions",
        link: "/terms-conditions",
      },
    ],
    list_03: [
      {
        id: 1,
        text: "About Us",
        link: "/about",
      },
      {
        id: 3,
        text: "Our Team",
        link: "/about",
      },
      {
        id: 4,
        text: "Blog",
        link: "/blog",
      },
      {
        id: 5,
        text: "Careers",
        link: "/",
      },
      {
        id: 6,
        text: "Our Impact",
        link: "/",
      },
    ],
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleSubscribe = (data, e) => {
    e.preventDefault();
    dispatch(saveNewsletter(data));
  };

  const date = new Date();
  let year = date.getFullYear();

  return (
    
    <footer>
    <Toaster position="top-center" />
      <div className="contain">
        <div className="flex_row main_row row">
          <div className="col-lg">
            <div className="in_col">
              <h4>
                <Text string={siteSettings?.site_first_section_heading} />
              </h4>
              <ul className="lst contact_lst">
                <li>
                  <Link href={`tel:${siteSettings?.site_phone}`}>
                    <img src="/images/phone.svg" alt="" />
                    <span>{siteSettings?.site_phone}</span>
                  </Link>
                </li>
                <li>
                  <Link href={`mailto:${siteSettings?.site_general_email}`}>
                    <img src="/images/email.svg" alt="" />
                    <span>{siteSettings?.site_general_email}</span>
                  </Link>
                </li>
              </ul>
              <div className="social_logon">
                {siteSettings?.site_facebook && (
                  <Link
                    href={siteSettings?.site_facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/facebook.svg" alt="" />
                  </Link>
                )}

                {siteSettings?.site_twitter && (
                  <Link
                    href={siteSettings?.site_twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/twitter.svg" alt="" />
                  </Link>
                )}

                {siteSettings?.site_instagram && (
                  <Link
                    href={siteSettings?.site_instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/instagram.svg" alt="" />
                  </Link>
                )}

                {siteSettings?.site_linkedin && (
                  <Link
                    href={siteSettings?.site_linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src="/images/linkedin.svg" alt="" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg mid_col">
            <div className="in_col">
              <h4>
                <Text string={siteSettings?.site_second_section_heading} />
              </h4>
              <ul className="list">
                {data.list_02.map((val) => {
                  return (
                    <li key={val.id}>
                      <Link href={val.link}>{val.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-lg mid_col">
            <div className="in_col">
              <h4>
                <Text string={siteSettings?.site_third_section_heading} />
              </h4>
              <ul className="list">
                {data.list_03.map((val) => {
                  return (
                    <li key={val.id}>
                      <Link href={val.link}>{val.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="in_col">
              <h4>
                <Text string={siteSettings?.site_fourth_section_heading} />
              </h4>
              <div className="subscribe">
                <p>
                  <Text string={siteSettings?.site_fourth_section_sub_1} />
                </p>
                <form method="POST" onSubmit={handleSubmit(handleSubscribe)}>
                  <input
                    type="text"
                    className="input"
                    name=""
                    placeholder={"Enter your email address"}
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />

                    <div
                          className="validation-error"
                          style={{ color: "red" }}
                        >
                          {errors.email?.message}
                        </div>

                  <button type="submit" disabled={isFormProcessing}>
                    <img src="/images/send.svg" /> {isFormProcessing && <i className={ isFormProcessing ? "spinner" : "spinnerHidden"}></i>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p className="text-center">
            © Copyright {year}, <Text string={siteSettings?.site_copyright} />
          </p>
        </div>
      </div>
    </footer>
  );
}
