import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const LeafletMapComponent = ({setLocationCords,locationCords}) => {
  // console.log('loc', locationCords);

    const [position, setPosition] = useState([locationCords.lat, locationCords.long])
    useEffect(() => {
      // Update position when locationCords changes
      setPosition([locationCords.lat, locationCords.long]);
    }, [locationCords]);

    const handleMarkerDragend = (event) => {
        setPosition([event.target.getLatLng()?.lat,event.target.getLatLng()?.lng]);
        setLocationCords({lat: event.target.getLatLng()?.lat, long: event.target.getLatLng()?.lng});
      };
    const customIcon = new L.Icon({
        iconUrl: '/images/marker.png', // Replace with the path to your custom marker icon
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
      });
// console.log(position)
  return <>
   <MapContainer center={position} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon} draggable={true} eventHandlers={{ moveend: handleMarkerDragend }}>
        <Popup>
          <p style={{fontSize:'12px'}}>Latitude: {locationCords.lat}</p>
          <p style={{fontSize:'12px'}}>Longitude: {locationCords.long}</p>
        </Popup>
      </Marker>
    </MapContainer>
  </>;
};

export default LeafletMapComponent;
