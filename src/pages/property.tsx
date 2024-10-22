import React from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonChip,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { searchOutline, pencilOutline, locationOutline, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'swiper/css';
import L from 'leaflet';

// Configuración de un ícono personalizado para Leaflet
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
  const history = useHistory();

  const gotologin = () => history.push('/login');

  const properties = [
    {
      id: 1,
      img: '/assets/foto2.webp',
      name: 'Jose Arrieta',
      reviews: 500,
      rating: 4.8,
      location: 'Peñalolen',
      ufPrice: 'UF 4500',
      clpPrice: '$170.290.530 CLP',
      latitude: -33.4675, // Coordenadas de ejemplo
      longitude: -70.6475,
    },
    {
      id: 2,
      img: '/assets/foto1.webp',
      name: 'San Carlos',
      reviews: 320,
      rating: 4.6,
      location: 'Las Condes',
      ufPrice: 'UF 5200',
      clpPrice: '$196.840.000 CLP',
      latitude: -33.425, // Coordenadas de ejemplo
      longitude: -70.561,
    },
  ];

  const navigateToHome = () => history.push('/folder/Inbox');
  const gotonotifaciones = () => history.push('/notificaciones');

  return (
    <IonPage>
      <IonHeader>
        <IonItem lines="none">
          <IonIcon icon={searchOutline} slot="start" />
          <IonLabel>
            <h2>Jose Arrieta</h2>
            
            <p>Peñalolen • Region Metropolitana • departamento</p>
          </IonLabel>
          <IonIcon icon={pencilOutline} slot="end" />
        </IonItem>

        <IonItem lines="none" className="filter-bar">
          <IonSelect placeholder="venta" slot="start">
            <IonSelectOption value="venta">Venta</IonSelectOption>
            <IonSelectOption value="arriendo">Arriendo</IonSelectOption>
          </IonSelect>

          <IonSelect placeholder="UF" slot="start">
            <IonSelectOption value="UF">UF</IonSelectOption>
            <IonSelectOption value="CLP">CLP</IonSelectOption>
          </IonSelect>

          <IonSelect placeholder="Departamento" slot="start">
            <IonSelectOption value="departamento">Departamento</IonSelectOption>
            <IonSelectOption value="casa">Casa</IonSelectOption>
          </IonSelect>

          <IonLabel slot="end">99 results</IonLabel>
        </IonItem>
      </IonHeader>

      <IonContent>
        {/* Contenedor del mapa con Leaflet */}
        <IonCard>
          <MapContainer center={[-33.4675, -70.6475]} zoom={13} style={{ height: '300px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={[property.latitude, property.longitude]}
                icon={customIcon}
              >
                <Popup>
                  <IonImg src={property.img} style={{ width: '100px', height: '100px' }} alt={`Imagen de ${property.name}`} />
                  <b>{property.name}</b><br />
                  
                  {property.ufPrice} / {property.clpPrice}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </IonCard>

        {/* Carrusel de propiedades utilizando Swiper */}
        <Swiper spaceBetween={10} slidesPerView={1}>
          {properties.map((property) => (
            <SwiperSlide key={property.id}>
              <IonCard>
                <IonImg src={property.img} alt={`Imagen de ${property.name}`} />
                <IonCardHeader>
                  <IonLabel>{property.name}</IonLabel>
                  <IonLabel>⭐ {property.rating} ({property.reviews} reviews) • {property.location}</IonLabel>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>{property.ufPrice} / {property.clpPrice}</IonLabel>
                  <IonButton color="dark" slot="end">Contactar</IonButton>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>

      {/* Menú inferior */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>

        <IonTabButton tab="property" href="/property">
          <IonIcon icon={locationOutline} />
        </IonTabButton>

        <IonTabButton tab="notifications" onClick={gotonotifaciones}>
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>

        <IonTabButton tab="profile" onClick={gotologin}>
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default PropertyPage;
