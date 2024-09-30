import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from '@ionic/react';
import { homeOutline, locationOutline, notificationsOutline, personOutline, locateOutline } from 'ionicons/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useLocation } from '../components/LocationContext';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const GeolocationPage: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [inputAddress, setInputAddress] = useState<string>('');
  const [manualLocation, setManualLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showUseAddressButton, setShowUseAddressButton] = useState<boolean>(false);
  const history = useHistory();

  const { setAddress: setGlobalAddress } = useLocation();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (response.data && response.data.address) {
              const { road, house_number, suburb, city, country } = response.data.address;
              const formattedAddress = `${road} ${house_number || ''}, ${suburb}, ${city}, ${country}`;
              setAddress(formattedAddress);
              setInputAddress(formattedAddress);
              setShowUseAddressButton(true);
            } else {
              setAddress('Dirección no encontrada');
            }
          } catch (error) {
            setAddress('Error al obtener la dirección');
          }
        },
        (error) => {
          alert('No se pudo obtener la ubicación. Habilita los permisos de geolocalización.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('La geolocalización no es compatible con este dispositivo.');
    }
  };

  const searchAddress = async () => {
    if (inputAddress.trim() !== '') {
      try {
        const encodedAddress = encodeURIComponent(inputAddress);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?street=${encodedAddress}&format=json&addressdetails=1&limit=1`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon, display_name } = response.data[0];
          setManualLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
          setAddress(display_name);
          setShowUseAddressButton(true);
        } else {
          alert('Dirección no encontrada. Verifica la dirección.');
        }
      } catch (error) {
        alert('Error al buscar la dirección');
      }
    }
  };

  const useSelectedAddress = () => {
    if (address) setGlobalAddress(address);
    setShowUseAddressButton(false);
  };

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold', color: '#fff' }}>Propiedapp</h2>
          </IonText>
        </div>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#000' }}>
        <IonCard style={{ padding: '20px', borderRadius: '15px' }}>
          <IonCardHeader>
            <IonText style={{ fontSize: '18px', fontWeight: 'bold' }}>Buscar ubicación</IonText>
          </IonCardHeader>
          <IonCardContent>
            <IonItem lines="none" style={{ marginTop: '10px', backgroundColor: '#f1f1f1', borderRadius: '10px' }}>
              <IonLabel position="stacked">{inputAddress ? '' : 'Ingresa una dirección...'}</IonLabel>
              <IonInput
                value={inputAddress}
                onIonChange={(e) => setInputAddress(e.detail.value!)}
                placeholder="Ej: Av. Miraflores 1234"
              />
            </IonItem>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <IonButton onClick={getCurrentLocation} expand="block" shape="round">
                <IonIcon icon={locateOutline} slot="start" />
                Obtener mi ubicación actual
              </IonButton>
            </div>

            <IonButton onClick={searchAddress} expand="block" shape="round" style={{ marginTop: '10px' }}>
              Buscar dirección
            </IonButton>

            {showUseAddressButton && (
              <IonButton onClick={useSelectedAddress} expand="block" shape="round" style={{ marginTop: '20px' }}>
                Usar esta dirección
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>

        <div style={{ marginTop: '20px', width: '100%', height: '300px' }}>
          {location || manualLocation ? (
            <MapContainer
              center={manualLocation ? [manualLocation.latitude, manualLocation.longitude] : [location!.latitude, location!.longitude]}
              zoom={15}
              style={{ height: '100%', width: '100%', borderRadius: '15px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={manualLocation ? [manualLocation.latitude, manualLocation.longitude] : [location!.latitude, location!.longitude]} icon={customIcon}>
                <Popup>{address || 'Ubicación seleccionada'}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p style={{ textAlign: 'center', color: '#fff' }}>Mapa no disponible</p>
          )}
        </div>
      </IonContent>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={() => navigateTo('/folder/Inbox')}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" onClick={() => navigateTo('/property')}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>
        <IonTabButton tab="notifications" onClick={() => navigateTo('/notifications')}>
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>
        <IonTabButton tab="profile" onClick={() => navigateTo('/profile')}>
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default GeolocationPage;
  