import React from 'react';
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
import { locationOutline, homeOutline, notificationsOutline, personOutline, briefcaseOutline, businessOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useHistory } from 'react-router-dom';
import { useLocation } from '../components/LocationContext';

const Home: React.FC = () => {
  const { address } = useLocation();
  const history = useHistory();

  const navigateToGeolocation = () => history.push('/geolocation');
  const goToPropertyPage = () => history.push('/property');
  const gotologin = () => history.push('/login');
  const gotonotifaciones = () => history.push('/notificaciones');

  return (
    <IonPage>
      <IonHeader>
        <IonSearchbar placeholder="Buscar" />
      </IonHeader>

      <IonContent fullscreen>
        <IonItem button onClick={navigateToGeolocation}>
          <IonIcon icon={locationOutline} slot="start" />
          <IonLabel>{address && address !== 'Ingresa tu ubicación...' ? address : 'Ingresa tu ubicación...'}</IonLabel>
        </IonItem>

        <IonCard>
          <IonImg src="/assets/foto1.webp" alt="Imagen de propiedad" />
          <IonCardHeader>
            <IonCardTitle>Encuentra tu propiedad</IonCardTitle>
          </IonCardHeader>
        </IonCard>

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

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Propiedades Destacadas</IonCardTitle>
          </IonCardHeader>
        </IonCard>

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

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/folder/Inbox">
          <IonIcon icon={homeOutline} />
        </IonTabButton>
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
