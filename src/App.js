import React, { useState, useEffect } from 'react';
import './App.css';
import { getIpAddress } from './IpService';
import LocationMap from './LocationMap';
import { isMobile, osName, osVersion, browserName, browserVersion } from 'react-device-detect';

function App() {
  const [ipInfo, setIpInfo] = useState({ ip: '', country: '', city: '' });
  const [location, setLocation] = useState(null);
  const deviceType = isMobile ? 'Mobile' : 'Desktop';
  const osDetails = `${osName} ${osVersion}`;
  const browserDetails = `${browserName} ${browserVersion}`;

  useEffect(() => {
    // Get IP address information
    const fetchIpInfo = async () => {
      try {
        const data = await getIpAddress();
        setIpInfo({
          ip: data.ip,
          country: data.country,
          city: data.city
        });
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    };

    fetchIpInfo();

    // Get geolocation information
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-info">
          <p className="info-item">Device: {deviceType}</p>
          <p className="info-item">OS: {osDetails}</p>
          <p className="info-item">Browser: {browserDetails}</p>
          <p className="info-item">IPv4: {ipInfo.ip}</p>
          <p className="info-item">City: {ipInfo.city}</p>
          <p className="info-item">Country: {ipInfo.country}</p>
        </div>
        {ipInfo.ip && <LocationMap location={ipInfo.loc || (location && `${location.lat},${location.lon}`)} />}
      </header>
    </div>
  );
}

export default App;
