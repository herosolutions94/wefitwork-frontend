import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function AddServices() {
  const sub_services = [
    {
      id: "1",
      title: "Pipe Installation and Repair",
    },
    {
      id: "2",
      title: "Sump Pump Installation and Repair",
    },
    {
      id: "3",
      title: "Emergency Plumbing Services",
    },
    {
      id: "4",
      title: "Remodeling and Renovation",
    },
    {
      id: "5",
      title: "Water Filtration and Treatment",
    },
    {
      id: "6",
      title: "Fixing Low Water Pressure",
    },
    {
      id: "7",
      title: "Gas Line Services",
    },
    {
      id: "8",
      title: "Fixture Upgrades",
    },
  ];
  return (
    <>
      <main>
        <section className="dashboard">
          <div className="contain">
            <div className="add_service_blk">
              <div className="sec_heading">
                <h2>Add New Service</h2>
              </div>
              <form className="custom_blk">
                <h6>Service You Offered</h6>
                <div className="form_blk">
                  <select name="" className="input">
                    <option>Choose offered service</option>
                    <option value="electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Handyman">Handyman</option>
                  </select>
                </div>
                <h6>Select Sub Services</h6>
                <div className="flex">
                  {sub_services.map((val) => {
                    return (
                      <div className="lbl_btn" key={val.id}>
                        <input
                          type="checkbox"
                          name="sub_service"
                          value=""
                          id={val.id}
                        />
                        <label htmlFor={val.id}>{val.title}</label>
                      </div>
                    );
                  })}
                </div>
                <div className="br"></div>
                <div className="br"></div>
                <div className="btn_blk text-right">
                  <button type="submit" className="site_btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
AddServices.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
