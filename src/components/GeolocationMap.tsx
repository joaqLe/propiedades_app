import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface GeolocationMapProps {
  coordinates: { lat: number; lng: number } | null;
}

const GeolocationMap: React.FC<GeolocationMapProps> = ({ coordinates }) => {
  if (!coordinates) {
    return <p style={{ textAlign: 'center' }}>Mapa no disponible.</p>;
  }

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={15}
      style={{ height: '300px', width: '100%', borderRadius: '15px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
    </MapContainer>
  );
};

export default GeolocationMap;
