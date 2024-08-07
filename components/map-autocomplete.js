import React, { useEffect, useRef } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const AddressAutocomplete = ({ onPlaceSelect, setAddress, address }) => {
  const autocompleteRef = useRef(null);


  const handlePlaceSelect = () => {

    // console.log("ref",autocompleteRef.current.getPlace());

    const place = autocompleteRef.current.getPlace();
    // console.log('ad,' , place.formatted_address);
    const { lat, lng } = place.geometry.location;
    const location = {
      latitude: lat(),
      longitude: lng(),
    };

    // console.log("loc", location);
    // console.log(place.geometry.location.lat);
    onPlaceSelect(location);
    setAddress(place.formatted_address)
  };

  useEffect(() => {
    console.log(address)
  }, [address]);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAmqmsf3pVEVUoGAmwerePWzjUClvYUtwM"
      libraries={['places']}
    >
      <Autocomplete
        onLoad={(autocomplete) => {
          // console.log(autocomplete);
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceSelect}
        options={{
          componentRestrictions: { country: 'ng' },
        }}
      >
        <input type="text" placeholder="Enter address" defaultValue={address} className='input' />
      </Autocomplete>
    </LoadScript>
  );
};

export default AddressAutocomplete;
