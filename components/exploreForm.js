import React, { useState } from 'react';
import FileInputButton from './fileInputButton';
const ExploreFrom = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    onClose();
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleLabelClick = (event, id) => {
    setSelectedValue(id);
  };

  const services = [
    {
      id:"Plumber",
      title:"Plumber",
    },
    {
      id:"Electrician",
      title:"Electrician",
    },
    {
      id:"Roofer",
      title:"Roofer",
    },
    {
      id:"Builder",
      title:"Builder",
    },
    {
      id:"Gardener",
      title:"Gardener",
    },
    {
      id:"Painter",
      title:"Painter",
    },
    {
      id:"Landscaper",
      title:"Landscaper",
    },
    {
      id:"Carpenter",
      title:"Carpenter",
    },
    {
      id:"Plasterer",
      title:"Plasterer",
    },
    {
      id:"Driveways",
      title:"Driveways / Patios",
    },
    {
      id:"Fencing",
      title:"Fencing",
    },
    {
      id:"Tree_Surgeon",
      title:"Tree Surgeon",
    },
    {
      id:"Handyman",
      title:"Handyman",
    },
    {
      id:"Locksmith",
      title:"Locksmith",
    },
    {
      id:"Bathrooms",
      title:"Bathrooms",
    },
    {
      id:"Tiler",
      title:"Tiler",
    },
    {
      id:"Central_Heating",
      title:"Central Heating",
    },
    {
      id:"Boiler_Repair",
      title:"Boiler Repair",
    },
  ]
  const sub_services = [
    {
      id:"Windows_doors",
      sub_title:"Windows & doors",
    },
    {
      id:"Furniture_cupboards_shelves",
      sub_title:"Furniture, cupboards & shelves",
    },
    {
      id:"Kitchens",
      sub_title:"Kitchens",
    },
    {
      id:"Flooring_skirting",
      sub_title:"Flooring & skirting",
    },
    {
      id:"Staircases",
      sub_title:"Staircases",
    },
    {
      id:"Fencing_gates",
      sub_title:"Fencing & gates",
    },
    {
      id:"Outdoor_structures_roofing",
      sub_title:"Outdoor structures & roofing",
    },
    {
      id:"Other",
      sub_title:"Other/I'm not sure",
    },
  ]
  const time_job = [
    {
      id:"question1",
      title:"Immediately",
    },
    {
      id:"question2",
      title:"I'm flexible on start date",
    },
    {
      id:"question3",
      title:"Im budgeting",
    }
  ]

  return (
    <div className="multi-step-form">
      <div className={`step ${step === 1 ? 'field_set active' : 'field_set'}`}>
        <h3>Choose Service</h3>
        <ul className='l_flex'>
          {services.map((val)=>{
            return(
              <li key={val.id}>
                <div className={`lbl_btn ${selectedValue === val.id ? 'active' : ''}`}>
                  <input type='radio' name='service_choose' value={val.title} id={val.id} checked={selectedValue === val.id} onChange={() => setSelectedValue(val.id)}/>
                  <label htmlFor={val.id} onClick={(e) => handleLabelClick(e, val.id)}>{val.title}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`step ${step === 2 ? 'field_set active' : 'field_set'}`}>
        <h3>What do you need a carpenter to help with?</h3>
        <ul className='l_flex two_flex'>
          {sub_services.map((val)=>{
            return(
              <li key={val.id}>
                <div className={`lbl_btn ${selectedValue === val.id ? 'active' : ''}`}>
                  <input type='radio' name='service_choose' value={val.sub_title} id={val.id} checked={selectedValue === val.id} onChange={() => setSelectedValue(val.id)}/>
                  <label htmlFor={val.id} onClick={(e) => handleLabelClick(e, val.id)}>{val.sub_title}</label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`step ${step === 3 ? 'field_set active' : 'field_set'}`}>
          <h3>Location</h3>
          <div className='flex_address'>
              <div className='colL'>
                <div className="form_blk">
                  <select name="" className='input'>
                    <option>Select State</option>
                    <option value="Abia">Abia</option>
                    <option value="Adamawa">Adamawa</option>
                    <option value="Akwa_Ibom">Akwa Ibom</option>
                    <option value="Anambra">Anambra</option>
                    <option value="Bauchi">Bauchi</option>
                    <option value="Bayelsa">Bayelsa</option>
                    <option value="Benue">Benue</option>
                    <option value="Borno">Borno</option>
                    <option value="Cross_River">Cross River</option>
                    <option value="Delta">Delta</option>
                    <option value="Ebonyi">Ebonyi</option>
                    <option value="Edo">Edo</option>
                    <option value="Ekiti">Ekiti</option>
                    <option value="Enugu">Enugu</option>
                    <option value="Gombe">Gombe</option>
                    <option value="Imo">Imo</option>
                    <option value="Jigawa">Jigawa</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Kano">Kano</option>
                    <option value="Katsina">Katsina</option>
                    <option value="Kebbi">Kebbi</option>
                    <option value="Kogi">Kogi</option>
                    <option value="Kwara">Kwara</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Nasarawa">Nasarawa</option>
                    <option value="Niger">Niger</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Ondo">Ondo</option>
                    <option value="Osun">Osun</option>
                    <option value="Oyo">Oyo</option>
                    <option value="Plateau">Plateau</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Sokoto">Sokoto</option>
                    <option value="Taraba">Taraba</option>
                    <option value="Yobe">Yobe</option>
                    <option value="Zamfara">Zamfara</option>
                  </select>
                </div>
                <div className="form_blk">
                  <div className='map_indication'>
                    <input type='text' name='location' className='input' placeholder={"Enter your address"}/>
                    <button className='map_marker' type='button'><img src='/images/map_marker.svg' alt=''/></button>
                  </div>
                </div>
                <div className='form_blk'>
                  <p><strong>Address:</strong> 1711 O Street Sanger,CA 93657 Suite 102</p>
                </div>
                <div className='btn_blk'>
                  <button type='button' className='site_btn black'>CHECK ADDRESS AVAILABILITY</button>
                </div>
              </div>
              <div className='colR'>
                <div className="map_sec">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13363.859400788691!2d-117.158019!3d33.136288!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db8ab3b9f18c1b%3A0x22de000cd55202d6!2s160%20Industrial%20St%20%23200%2C%20San%20Marcos%2C%20CA%2092078!5e0!3m2!1sen!2sus!4v1672885602751!5m2!1sen!2sus" width="100%" height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
              </div>
          </div>
          
      </div>
      <div className={`step ${step === 4 ? 'field_set active' : 'field_set'}`}>
        <h3>Work Scope</h3>
        <div className="form_blk">
          <textarea name='' className='input' placeholder={"Write your work scope"}></textarea>
        </div>
        <div className="form_blk">
          <FileInputButton/>
        </div>

        <div className='br'></div>
        <h3>More Information</h3>
        <div className="form_blk w_6">
          <h6>Estimated Price</h6>
          <select className='input' name=''>
            <option>Your Budget</option>
            <option value="1k-2k">1k-2k</option>
            <option value="3k-4k">3k-4k</option>
            <option value="5k-6k">5k-6k</option>
            <option value="7k-8k">7k-8k</option>
          </select>
        </div>
        <div className="form_blk">
          <h6>When would you like the job to start?</h6>
          <ul className='l_flex'>
              {time_job.map((val)=>{
                return(
                  <li key={val.id}>
                    <div className={`lbl_btn ${selectedValue === val.id ? 'active' : ''}`}>
                      <input type='radio' name='service_choose' value={val.title} id={val.id} checked={selectedValue === val.id} onChange={() => setSelectedValue(val.id)}/>
                      <label htmlFor={val.id} onClick={(e) => handleLabelClick(e, val.id)}>{val.title}</label>
                    </div>
                  </li>
                );
              })}
            </ul>
        </div>
      </div>
      <div className='br'></div>
      <div className="btn_blk text-center">
        {step > 1 && <button onClick={handleBack} className='site_btn color'>Back</button>}
        {step < 4 ? (
          <button onClick={handleNext} className='site_btn'>Next</button>
        ) : (
          <button onClick={handleSubmit} className='site_btn'>Search</button>
        )}
        
      </div>
    </div>
  );
};

export default ExploreFrom;
