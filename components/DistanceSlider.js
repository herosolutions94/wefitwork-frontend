import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the default styles for the slider

const DistanceSlider = () => {
  const [distance, setDistance] = useState([0, 50]); // Initial distance range (0 to 50 miles)

  const handleSliderChange = (value) => {
    setDistance(value);
  };
 
  return (
    <div>
      
      <Slider
        range
        min={0}
        max={100} // Adjust the maximum distance as needed
        step={1} // You can change the step value
        value={distance}
        onChange={handleSliderChange}
      />
      <div className='mini_mile_lbl'>{distance[1]} Miles</div>
    </div>
  );
};

export default DistanceSlider;