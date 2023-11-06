import React, { useState,useRef } from "react";
import Link from 'next/link'
import { gsap } from "gsap";
export default function ServicesFaq({data}) {
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
    
    
    return (
      <>
        <div className="faq_blk">
            {data.faq_list?.map((val, i) => {
                return(
                    <div className={`outer_faq  ${openAccordion === i ? "open" : ""}`} key={i} ref={(el) => (accordionRefs.current[i] = el)} >
                        <div className="accordion__header" onClick={() => handleAccordionClick(i)}>
                            <h4>{val.title}</h4>
                            <div className="action_btns">
                                <button type="button"><img src="/images/edit.svg" alt="edit"/></button>
                                <button type="button"><img src="/images/trash.svg" alt="edit"/></button>
                            </div>
                        </div>
                        <div className="accordion__details">
                            <div dangerouslySetInnerHTML={{__html: val.content}} />
                        </div>
                    </div>
                )
            })}
        </div>
      </>
    );
}