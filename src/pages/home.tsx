import React from 'react';
// Importa React para definir el componente funcional.

import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonItem,
  IonIcon,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
// Importa varios componentes de Ionic para construir la estructura y estilo de la página.

import { locationOutline, homeOutline, notificationsOutline, personOutline, briefcaseOutline, businessOutline } from 'ionicons/icons';
// Importa íconos específicos de Ionicons para usar en botones y etiquetas dentro de la aplicación.

import { Swiper, SwiperSlide } from 'swiper/react';
// Importa componentes de `Swiper` para crear un carrusel de propiedades.

import 'swiper/css';  
// Importa el CSS de Swiper para los estilos del carrusel.

import { useHistory } from 'react-router-dom'; 
// Importa `useHistory` para manejar la navegación a diferentes páginas dentro de la aplicación.

import { useLocation } from '../components/LocationContext'; 
// Importa el contexto de `LocationContext` para manejar la dirección globalmente en la aplicación.

const Home: React.FC = () => {
  // Define el componente `Home` como un Functional Component con TypeScript.

  const { address } = useLocation(); 
  // Usa el hook `useLocation` para acceder a la dirección actual desde el contexto global.

  const history = useHistory();  
  // Define el hook `useHistory` para manejar la navegación entre rutas.

  // Función para navegar a la página de geolocalización
  const navigateToGeolocation = () => {
    history.push('/geolocation');
    // Redirige a la página de geolocalización cuando se llama.
  };

  // Función que navega a la página de propiedades
  const goToPropertyPage = () => {
    history.push('/property');
    // Redirige a la página de propiedades cuando se llama.
  }; 

  // Función que navega a la página de login
  const gotologin = () => {
    history.push('/login');
    // Redirige a la página de inicio de sesión cuando se llama.
  };

  // Función que navega a la página de notificaciones
  const gotonotifaciones = () => {
    history.push('/notificaciones');
    // Redirige a la página de notificaciones cuando se llama.
  };

  return (
    <IonPage>
      {/* Contenedor principal de la página */}

      <IonHeader>
        <IonSearchbar placeholder="Buscar " />
        {/* Barra de búsqueda en la parte superior */}
      </IonHeader>

      <IonContent fullscreen>
        {/* Contenido principal con la opción de pantalla completa */}

        {/* Modificar el IonItem para que muestre la dirección cuando esté disponible */}
        <IonItem button onClick={navigateToGeolocation}>
          <IonIcon icon={locationOutline} slot="start" />
          {/* Muestra el ícono de ubicación al inicio del ítem */}
          <IonLabel>{address && address !== 'Ingresa tu ubicación...' ? address : 'Ingresa tu ubicación...'}</IonLabel>
          {/* Muestra la dirección obtenida del contexto o el texto predeterminado */}
        </IonItem>

        {/* Tarjeta con una imagen de propiedad */}
        <IonCard>
          <IonImg src="/assets/foto1.webp" alt="Imagen de propiedad"/>
          <IonCardHeader>
            <IonCardTitle>Encuentra tu propiedad</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        {/* Grid con iconos de categorías de propiedades */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonIcon icon={briefcaseOutline} style={{ fontSize: '40px' }} />
              <IonLabel>Oficina</IonLabel>
            </IonCol>
            <IonCol>
              <IonIcon icon={businessOutline} style={{ fontSize: '40px' }} />
              <IonLabel>Departamento</IonLabel>
            </IonCol>
            <IonCol>
              <IonIcon icon={homeOutline} style={{ fontSize: '40px' }} />
              <IonLabel>Casa</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Tarjeta para Propiedades Destacadas */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Propiedades Destacadas</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        {/* Carrusel de propiedades utilizando Swiper */}
        <Swiper spaceBetween={10} slidesPerView={1}>
          <SwiperSlide>
            <IonCard>
              <IonImg src="/assets/foto2.webp" />
              <IonCardHeader>
                <IonLabel>Casa Sebastian Elcano / Townhouse</IonLabel>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <IonImg src="/assets/foto1.webp" />
              <IonCardHeader>
                <IonLabel>Casa San Carlos de Apoquindo / Condominio cerrado</IonLabel>
              </IonCardHeader>
            </IonCard>
          </SwiperSlide>
        </Swiper>
      </IonContent>

      {/* Barra de navegación inferior con enlaces a distintas secciones */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/folder/Inbox">
          <IonIcon icon={homeOutline} />
        </IonTabButton>

        {/* Este ícono de ubicación ahora navega a la página de propiedades */}
        <IonTabButton tab="property" onClick={goToPropertyPage}>
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

export default Home;
// Exporta el componente `Home` para su uso en otras partes de la aplicación.
