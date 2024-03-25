import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default styles for the slider

const DistanceSlider = ({handleRadiusCahnge}) => {
  // const [distance, setDistance] = useState([0, 50]); // Initial distance range (0 to 50 miles)
  const [distance, setDistance] = useState(10); // Initial distance range (10)

  const handleSliderChange = (value) => {
    setDistance(value);
    handleRadiusCahnge(value)
  };
 
  return (
    <div>
      
      <Slider
        range={false}
        min={0}
        max={100} // Adjust the maximum distance as needed
        step={1} // You can change the step value
        value={distance}
        onChange={handleSliderChange}
      />
      {/* <div className='mini_mile_lbl'>{distance[1]} Miles</div> */}
      <div className='mini_mile_lbl'>{distance} Kilometers</div>

    </div>
  );
};

export default DistanceSlider;