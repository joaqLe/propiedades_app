import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IonImg } from '@ionic/react';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  properties: any[];
  defaultLatLng: [number, number];
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, defaultLatLng }) => {
  return (
    <MapContainer
      center={defaultLatLng}
      zoom={13}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {properties.map((property) => {
        const { coordinates, name, price, imageUrl } = property;
        if (coordinates?.lat && coordinates?.lng) {
          return (
            <Marker
              key={property.id}
              position={[coordinates.lat, coordinates.lng] as [number, number]}
              icon={customIcon}
            >
              <Popup>
                <IonImg src={imageUrl} style={{ width: '100px', height: '100px' }} alt={`Imagen de ${name}`} />
                <b>{name}</b>
                <br />
                {price || 'Precio no disponible'}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default PropertyMap;
