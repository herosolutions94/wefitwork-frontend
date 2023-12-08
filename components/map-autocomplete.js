import React, { useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const AddressAutocomplete = ({ onPlaceSelect }) => {
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    const { lat, lng } = place.geometry.location;
      const location = {
        latitude: lat(),
        longitude: lng(),
      };

      console.log("loc", location);
    // console.log(place.geometry.location.lat);
    onPlaceSelect(location);
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAmqmsf3pVEVUoGAmwerePWzjUClvYUtwM"
      libraries={['places']}
    >
      <Autocomplete
        onLoad={(autocomplete) => {
          console.log(autocomplete);
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceSelect}
      >
        <input type="text" placeholder="Enter address" className='input' />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressAutocomplete;
