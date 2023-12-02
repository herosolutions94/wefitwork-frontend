import React, { useState, useRef, useEffect } from "react";
import Link from 'next/link'
import { gsap } from "gsap";
import toast from "react-hot-toast";
export default function ServicesFaq({ data, editPopup, setEditPopup, updateMemberService, isFormProcessing }) {
  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedSubServices?.length > 0) {
      const frmData = { sub_services: selectedSubServices, service_id: editPopup?.item?.service_id }
      updateMemberService(frmData)
    }
    else {
      toast.error("Please select sub services"); return;
    }
  }
  // console.log("service_data", data);
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const handleAccordionClick = (index) => {
    console.log(index);
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector(".accordion__details"),
        {
          height: 0,
          duration: .5,
          ease: "power1.inOut",
          onComplete: () => setOpenAccordion(null),
        }
      );
      console.log(openAccordion);
    } else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            ".accordion__details"
          ),
          {
            height: 0,
            duration: .5,
            ease: "power1.inOut",
          }
        );
      }
      setOpenAccordion(index);
      gsap.fromTo(
        accordionRefs.current[index].querySelector(".accordion__details"),
        { height: 0 },
        {
          height: "auto",
          duration: .5,
          ease: "power1.inOut",
        }
      );
    }
  };
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const handleSubServiceChange = (subServiceId) => {
    setSelectedSubServices((prevSelectedSubServices) => {
      const isSubServiceSelected =
        prevSelectedSubServices.includes(subServiceId);
      const updatedSelectedSubServices = isSubServiceSelected
        ? prevSelectedSubServices.filter((id) => id !== subServiceId)
        : [...prevSelectedSubServices, subServiceId];

      const selectedSubServiceIdsAsIntegers = updatedSelectedSubServices.map(
        (id) => parseInt(id, 10)
      );
      // setValue("sub_services", selectedSubServiceIdsAsIntegers);

      return updatedSelectedSubServices;
    });
  };
  useEffect(() => {
    if (editPopup?.show !== false && editPopup?.item !== null && editPopup?.item?.sub_services?.length > 0) {
      editPopup?.item?.sub_services?.forEach(item => {
        // Check if the item's ID already exists in selectedSubServices
        if (!selectedSubServices.includes(item?.id)) {
          // If not, add it to the state
          setSelectedSubServices(prevState => [...prevState, item?.id]);
        }
      });
    }
  }, [editPopup?.item?.sub_services, selectedSubServices]);

  return (
    <>
      <div className="faq_blk">
        {
          editPopup?.show === false && editPopup?.item === null ?
            data?.map((val, i) => {
              return (
                <div className={`outer_faq  ${openAccordion === i ? "open" : ""}`} key={i} ref={(el) => (accordionRefs.current[i] = el)} >
                  <div className="accordion__header" onClick={() => handleAccordionClick(i)}>
                    <h4>{val.service_title}</h4>
                    <div className="action_btns">
                      <button type="button" onClick={() => setEditPopup({ show: true, item: val })}><img src="/images/edit.svg" alt="edit" /></button>
                      {/* <button type="button"><img src="/images/trash.svg" alt="edit" /></button> */}
                    </div>
                  </div>
                  <div className="accordion__details">
                    {/* <div dangerouslySetInnerHTML={{__html: val.content}} /> */}
                    <div>
                      <ul>
                        {val?.sub_services?.map((sub_ser, i) => {
                          return (

                            <li>{sub_ser?.title}</li>


                          )
                        })}

                      </ul>
                    </div>
                  </div>
                </div>
              )
            })
            :
            <div className="add_service_blk">
              <div className="sec_heading">
                <h2>Update Service {editPopup?.item?.service_title} Service</h2>
              </div>
              <form className="custom_blk" onSubmit={onSubmit}>
                <h6>Select Sub Services</h6>
                <div className="flex">
                  {editPopup?.item?.all_sub_services.map((val) => {
                    return (
                      <div className="lbl_btn" key={val.id}>
                        <input type="checkbox" name="sub_service" value={val?.id} id={val.id} checked={selectedSubServices?.includes(val?.id)} onChange={() => handleSubServiceChange(val.id)} />
                        <label htmlFor={val.id}>{val.title}</label>
                      </div>
                    );
                  })}

                </div>
                <div className="br"></div>
                <div className="br"></div>
                <div className="btn_blk text-right">
                  <button type="submit" className="site_btn" disabled={isFormProcessing}>Submit {isFormProcessing ? <i className="spinner"></i> : ""}</button>
                </div>
              </form>
            </div>
        }
      </div>
    </>
  );
}