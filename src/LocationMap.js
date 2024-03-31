import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the red icon
const redIcon = new L.Icon({
  iconUrl: 'red-icon.png', // Replace with your own red marker icon path
  iconSize: [40, 40], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

const LocationMap = ({ location }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (location) {
      const [lat, lng] = location.split(',');
      setPosition([parseFloat(lat), parseFloat(lng)]);
    }
  }, [location]);

  if (!position) return null;

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={redIcon}></Marker>
    </MapContainer>
  );
};

export default LocationMap;
