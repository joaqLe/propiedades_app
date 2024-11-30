import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from '@ionic/react';
import {
  searchOutline,
  pencilOutline,
  locationOutline,
  homeOutline,
  notificationsOutline,
  personOutline,
} from 'ionicons/icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../pages/firebaseConfig';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PropertyPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);

  const defaultLatLng = [-33.447487, -70.673676]; // Santiago, Chile como ubicación por defecto

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'properties'),
      (snapshot) => {
        const fetchedProperties = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(fetchedProperties);
      },
      (error) => {
        console.error('Error al cargar propiedades:', error);
        alert('Hubo un problema al cargar las propiedades.');
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonItem lines="none">
          <IonIcon icon={searchOutline} slot="start" />
          <IonLabel>
            <h2>Propiedades</h2>
          </IonLabel>
          <IonIcon icon={pencilOutline} slot="end" />
        </IonItem>
      </IonHeader>

      <IonContent>
        {/* Mapa interactivo */}
        <IonCard>
          <MapContainer

            zoom={13}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {properties.map((property) => {
              const { latitude, longitude } = property;
              if (latitude && longitude) {
                return (
                  <Marker
                    key={property.id}
                    position={[latitude, longitude]}
                    icon={customIcon}
                  >
                    <Popup>
                      <IonImg
                        src={property.img}
                        style={{ width: '100px', height: '100px' }}
                        alt={`Imagen de ${property.name}`}
                      />
                      <b>{property.name}</b>
                      <br />
                      {property.price || 'Precio no disponible'}
                    </Popup>
                  </Marker>
                );
              }
              return null;
            })}
          </MapContainer>
        </IonCard>

        {/* Carrusel de propiedades */}
        <Swiper spaceBetween={10} slidesPerView={1}>
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <IonCard>
                <IonImg
                  src={property.img}
                  alt={`Imagen de ${property.name}`}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <IonCardHeader>
                  <IonLabel>{property.name}</IonLabel>
                  <IonLabel>
                    ⭐ {property.rating || 'N/A'} ({property.reviews || 0} reviews) •{' '}
                    {property.location || 'Ubicación no disponible'}
                  </IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    {property.price || 'Precio no disponible'}
                  </IonLabel>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>

      {/* Menú inferior */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/folder/Inbox">
          <IonIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" href="/property">
          <IonIcon icon={locationOutline} />
        </IonTabButton>
        <IonTabButton tab="notifications" href="/notifications">
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default PropertyPage;
