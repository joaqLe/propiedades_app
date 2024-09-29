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
import { useLocation } from '../components/LocationContext'; // Importar el hook del contexto

// Crear un ícono personalizado para Leaflet
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
  const [inputAddress, setInputAddress] = useState<string>(''); // Dirección ingresada manualmente
  const [manualLocation, setManualLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [showUseAddressButton, setShowUseAddressButton] = useState<boolean>(false); // Mostrar botón "Usar esta dirección"
  const history = useHistory();

  // Obtener la función setAddress del contexto global
  const { setAddress: setGlobalAddress } = useLocation();

  // Función para obtener la ubicación del usuario
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Llamada a la API de geocodificación inversa para obtener la dirección
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (response.data && response.data.address) {
              const { road, house_number, suburb, city, country } = response.data.address;
              const formattedAddress = `${road} ${house_number || ''}, ${suburb}, ${city}, ${country}`;
              setAddress(formattedAddress);
              setInputAddress(formattedAddress); // Autorrellenar el campo de dirección
              setShowUseAddressButton(true); // Mostrar botón "Usar esta dirección"
            } else {
              setAddress('Dirección no encontrada');
            }
          } catch (error) {
            console.error('Error al obtener la dirección:', error);
            setAddress('Error al obtener la dirección');
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          alert('No se pudo obtener la ubicación. Por favor, habilita los permisos de geolocalización.');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert('La geolocalización no es compatible con este dispositivo.');
    }
  };

  // Función para buscar la ubicación de una dirección ingresada manualmente con parámetros mejorados
  const searchAddress = async () => {
    if (inputAddress.trim() !== '') {
      try {
        // Codificar la dirección para asegurar que se envía correctamente a la API
        const encodedAddress = encodeURIComponent(inputAddress);

        // Hacer la solicitud a Nominatim con el parámetro `street` que incluye la dirección completa (calle y número)
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?street=${encodedAddress}&format=json&addressdetails=1&limit=1`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon, display_name } = response.data[0];
          setManualLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
          setAddress(display_name); // Mostrar el nombre completo de la dirección encontrada
          setShowUseAddressButton(true); // Mostrar botón "Usar esta dirección"
        } else {
          alert('Dirección no encontrada. Por favor, verifica la dirección y asegúrate de que esté completa (calle y numeración).');
        }
      } catch (error) {
        console.error('Error al buscar la dirección:', error);
        alert('Error al buscar la dirección');
      }
    }
  };

  // Función para usar la dirección seleccionada y actualizar el contexto global
  const useSelectedAddress = () => {
    alert(`Usando la dirección: ${address}`);
    if (address) setGlobalAddress(address); // Actualizar la dirección en el contexto global
    setShowUseAddressButton(false); // Ocultar el botón después de seleccionar la dirección
  };

  // Funciones para navegación
  const navigateToHome = () => {
    history.push('/folder/Inbox');
  };

  const navigateToProperty = () => {
    history.push('/property');
  };

  const navigateToNotifications = () => {
    history.push('/notifications');
  };

  const navigateToProfile = () => {
    history.push('/profile');
  };

  return (
    <IonPage>
      <IonHeader>
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#3a3a3a' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold', color: '#fff' }}>Propiedapp - Geolocalización</h2>
          </IonText>
        </div>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#000' }}>
        {/* Contenedor con botón de geolocalización y campo de dirección manual */}
        <IonCard style={{ padding: '20px', borderRadius: '15px' }}>
          <IonCardHeader>
            <IonText style={{ fontSize: '18px', fontWeight: 'bold' }}>Buscar ubicación</IonText>
          </IonCardHeader>
          <IonCardContent>
            {/* Campo para ingresar dirección manualmente */}
            <IonItem lines="none" style={{ marginTop: '10px', backgroundColor: '#f1f1f1', borderRadius: '10px' }}>
              <IonLabel position="stacked" style={{ color: '' }}>
                {inputAddress ? '' : 'Ingresa una dirección...'}
              </IonLabel>
              <IonInput
                value={inputAddress}
                onIonChange={(e) => setInputAddress(e.detail.value!)}
                placeholder="Ej:Av. Miraflores 1234"
                style={{ color: '' }}
              />
            </IonItem>

            {/* Botón para obtener la ubicación actual */}
            <div style={{ textAlign: 'center', marginTop: '10px',  }}>
              <IonButton onClick={getCurrentLocation} expand="block" shape="round" style={{ backgroundColor: '' }}>
                <IonIcon icon={locateOutline} slot="start" />
                Obtener mi ubicación actual
              </IonButton>
            </div>

            {/* Botón para buscar dirección ingresada manualmente */}
            <IonButton onClick={searchAddress} expand="block" shape="round" style={{ marginTop: '10px', backgroundColor: '' }}>
              Buscar dirección
            </IonButton>

            {/* Botón para usar la dirección seleccionada */}
            {showUseAddressButton && (
              <IonButton onClick={useSelectedAddress} expand="block" shape="round" style={{ marginTop: '20px', backgroundColor: '' }}>
                Usar esta dirección
              </IonButton>
            )}
          </IonCardContent>
        </IonCard>

        {/* Mostrar mapa con la ubicación */}
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
              <Marker
                position={manualLocation ? [manualLocation.latitude, manualLocation.longitude] : [location!.latitude, location!.longitude]}
                icon={customIcon} // Aplicar el ícono personalizado
              >
                <Popup>{address || 'Ubicación seleccionada'}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p style={{ textAlign: 'center', color: '#fff' }}>Mapa no disponible</p>
          )}
        </div>
      </IonContent>

      {/* Barra de navegación inferior */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>

        <IonTabButton tab="property" onClick={navigateToProperty}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>

        <IonTabButton tab="notifications" onClick={navigateToNotifications}>
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>

        <IonTabButton tab="profile" onClick={navigateToProfile}>
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default GeolocationPage;
