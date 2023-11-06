import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from '@/components/components/layoutDashbord';
import ProfessionalSidebar from "@/components/components/professionalSidebar";


export default function ProfileSettings() {
    const fileInputRef = useRef(null);
    const fileDpRef = useRef(null);

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
    const handleDpClick = () => {
        fileDpRef.current.click();
      };
  
    const handleFileSelected = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        console.log('Selected file:', selectedFile.name);
      }
    };
    const handleDpSelected = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          console.log('Selected file:', selectedFile.name);
        }
      };
    
  return (
    <>
      <main>
         <section className="dashboard">
            <div className="contain">
                <div className="layout_sidebar flex">
                    <div className="colL">
                        <ProfessionalSidebar data={"profile"}/>
                    </div>
                    <div className="colR">
                        <div className="sec_heading">
                            <h2>Profile</h2>
                        </div>
                        <div className="profile_blk custom_blk">
                            <form>
                                <p><strong>Profile Dp</strong></p>
                                <div className="dp_flex">
                                    <div className="dp_icon">
                                        <img src="/images/user_icon.svg" alt="" />
                                    </div>
                                    <div className="btn_blk">
                                        <button className="site_btn color" type="button" onClick={handleDpClick}>Upload</button>
                                        <button className="site_btn blank blue_blank" type="button">Remove</button>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="from_row row">
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Display Name <span>(Visible to others)</span></h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="display_name"
                                                defaultValue="Francis"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Name <span> (Your given name)</span></h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="name"
                                                defaultValue="Francis Heather"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Phone Number</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="phone"
                                                defaultValue="+1 414-266-9847"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="blk_form">
                                            <h6>Specialization</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="specialization"
                                                defaultValue="Commercial & Residential"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="blk_form">
                                            <h6>Address</h6>
                                            <div className="form_blk">
                                                <input
                                                type="text"
                                                name="address"
                                                defaultValue="42 Lagos Street, Abuja, Nigeria, 12345"
                                                className="input"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="blk_form">
                                            <h6>Personal Bio</h6>
                                            <div className="form_blk">
                                                <textarea name="bio" className="input" placeholder="Write about yourself"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add_portfolio_blk">
                                    <div className="sec_heading">
                                        <h4>Add Your Portfolio</h4>
                                    </div>
                                    <div className="profile_grid_edit scrollbar">
                                        <div className="flex">
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img src="/images/portfolio1.png" alt=""/>
                                                    <button className="x_btn" type="button"></button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img src="/images/portfolio2.png" alt=""/>
                                                    <button className="x_btn" type="button"></button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img src="/images/portfolio3.png" alt=""/>
                                                    <button className="x_btn" type="button"></button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img src="/images/portfolio4.png" alt=""/>
                                                    <button className="x_btn" type="button"></button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img src="/images/portfolio3.png" alt=""/>
                                                    <button className="x_btn" type="button"></button>
                                                </div>
                                            </div>
                                            <div className="img_col">
                                                <div className="inner_img">
                                                    <img src="/images/portfolio4.png" alt=""/>
                                                    <button className="x_btn" type="button"></button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="br"></div>
                                    <div className="btn_blk">
                                        <button type="button" className="site_btn color filter_btn" onClick={handleButtonClick}>
                                            <img src="/images/clip.svg" alt=""/>
                                            <span>Upload</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="br"></div>
                                <div className="btn_blk text-right cell_wide_full">
                                    <button type="submit" className="site_btn">Save changes</button>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelected}
                                />
                                <input
                                    type="file"
                                    ref={fileDpRef}
                                    style={{ display: 'none' }}
                                    onChange={handleDpSelected}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         </section>
      </main>
      
    </>
  );
}
ProfileSettings.getLayout = function(page) {
    return <LayoutDashboard>{page}</LayoutDashboard>;
};
