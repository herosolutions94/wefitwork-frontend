import dynamic from 'next/dynamic';
import { useState } from 'react';

const LeafletMapComponent = dynamic(() => import('../components/leaflet-map'), {
  ssr: false, // Disable server-side rendering
});

const MapPage = () => {
    const [position, setPosition] = useState([51.505, -0.09]);
  return (
    <div>
      <h1>Map Page</h1>
      <div style={{height:"400px", width:"100%"}}>
      <LeafletMapComponent position={position} setPosition={setPosition} />
      </div>
    </div>
  );
};

export default MapPage;
