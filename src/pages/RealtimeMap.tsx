import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RealtimeMap = () => {
  const [positions, setPositions] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io('http://localhost:3000'); // Replace with your WebSocket server URL

    // Listen for real-time location updates
    socket.on('locationUpdate', (newPosition: { lat: number; lng: number }) => {
      setPositions((prev) => [...prev, newPosition]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]} // Default center (London)
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((pos, index) => (
        <Marker key={index} position={pos} icon={defaultIcon}>
          <Popup>Location {index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RealtimeMap;