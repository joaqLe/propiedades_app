import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
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

import { useHistory } from 'react-router-dom'; // Importamos useHistory para navegación
import { searchOutline, pencilOutline, locationOutline, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const PropertyPage: React.FC = () => {
  const history = useHistory(); // Inicializamos el hook useHistory
  
  const gotologin = () => {
    history.push('/login');  // Navega a la ruta de la página de login
  };   


  // Datos ficticios de propiedades para mostrar en el carrusel
  const properties = [
    {
      id: 1,
      img: '/assets/foto2.webp',
      name: 'Jose Arrieta',
      reviews: 500,
      rating: 4.8,
      location: 'peñalolen',
      ufPrice: 'UF 4500',
      clpPrice: '$170.290.530 CLP',
    },
    {
      id: 2,
      img: '/assets/foto1.webp',
      name: 'San Carlos',
      reviews: 320,
      rating: 4.6,
      location: 'las condes',
      ufPrice: 'UF 5200',
      clpPrice: '$196.840.000 CLP',
    },
    // Puedes agregar más propiedades aquí
  ];

  // Datos ficticios de precios en el mapa
  const mapPrices = [
    { id: 1, price: 'UF 4500', position: { top: '40%', left: '45%' } },
    { id: 2, price: 'UF 2300', position: { top: '30%', left: '20%' } },
    { id: 3, price: 'UF 2500', position: { top: '60%', left: '70%' } },
    { id: 4, price: 'UF 3800', position: { top: '50%', left: '15%' } },
  ];

  // Función para manejar la navegación al hacer clic en el botón de Home
  const navigateToHome = () => {
    history.push('/folder/Inbox'); // Redirige a la página principal
  };
  const gotonotifaciones = () => {
    history.push('/notificaciones');  // Navega a la ruta de la página de propiedades
  };

  return (
    <IonPage>
      <IonHeader>
        {/* Barra superior con búsqueda y ubicación */}
        <IonItem lines="none">
          <IonIcon icon={searchOutline} slot="start" />
          <IonLabel>
            <h2>Jose Arrieta</h2>
            <p>Peñalolen • Region Metropolitana • departamento</p>
          </IonLabel>
          <IonIcon icon={pencilOutline} slot="end" />
        </IonItem>

        {/* Filtros de búsqueda */}
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
        {/* Mapa con etiquetas de precios */}
        <IonCard>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <IonImg src="/assets/s.jpg" style={{ height: '100%', width: '100%' }} alt="Mapa de propiedades" />
            {mapPrices.map((price) => (
              <IonChip
                key={price.id}
                style={{
                  position: 'absolute',
                  top: price.position.top,
                  left: price.position.left,
                  backgroundColor: price.price === 'UF 4500' ? 'black' : 'white',
                  color: price.price === 'UF 4500' ? 'white' : 'black',
                }}
              >
                {price.price}
              </IonChip>
            ))}
          </div>
        </IonCard>

        {/* Carrusel de propiedades */}
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
        {/* Aquí cambiamos para usar la función navigateToHome en lugar de href */}
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
