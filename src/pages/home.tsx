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
  IonChip,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { locationOutline, homeOutline, notificationsOutline, personOutline, briefcaseOutline, businessOutline, handRight } from 'ionicons/icons';
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
          <IonImg src="/assets/banner.webp" alt="Imagen de propiedad" />
          <IonCardHeader>
            <IonCardTitle>Encuentra tu propiedad</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonGrid>
          <IonRow>
            
            <IonCol>
              <IonIcon icon={briefcaseOutline} style={{ display :'flex',fontSize: '50px' }} />
              <IonLabel style={{ marginTop: '10px', display: 'flex' }} >Oficina</IonLabel>
            </IonCol>

            <IonCol>
              <IonIcon icon={businessOutline} style={{ display:'flex',fontSize: '50px' }} />
              <IonLabel style={{ marginTop: '10px', display: 'flex'  }} >Departamento</IonLabel>
            </IonCol>

            <IonCol style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
              <IonIcon icon={homeOutline} style={{ fontSize: '50px' }} />
              <IonLabel style={{ marginTop: '10px' }}>Casa</IonLabel>
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
              <IonImg src="/assets/casa1.pano.webp" />
              <IonCardHeader>
                <IonLabel>Departamento Sebastian Elcano </IonLabel>

                <div style={{ marginTop: '10px', display: 'maxpadding', gap: '5px' }}>
                  <IonChip color="primary">
                    <IonLabel>Departamento</IonLabel>
                  </IonChip>
                  <IonChip color="secondary">
                    <IonLabel>140m2</IonLabel>
                  </IonChip>
                  <IonChip color="tertiary">
                    <IonLabel>Arriendo</IonLabel>
                  </IonChip>

                  <IonButton slot="end">Contactar</IonButton>
              

                </div>
                
                
                

              </IonCardHeader>
            </IonCard>

          </SwiperSlide>
          <SwiperSlide>

            <IonCard>
              <IonImg src="/assets/pano.v.webp" />
              <IonCardHeader>
                <IonLabel>Departamento San Carlos de Apoquindo / Condominio cerrado</IonLabel>
              
                <div style={{ marginTop: '10px', display: '', gap: '5px' }}>
                  <IonChip color="primary">
                    <IonLabel>Departamento</IonLabel>
                  </IonChip>
                  <IonChip color="secondary">
                    <IonLabel>140m2</IonLabel>
                  </IonChip>
                  <IonChip color="tertiary">
                    <IonLabel>Arriendo</IonLabel>
                  </IonChip>
                  <IonButton slot="end">Contactar</IonButton>
                </div>

              </IonCardHeader>
            </IonCard>

          </SwiperSlide>
          <SwiperSlide>
            
            <IonCard>
              <IonImg src="/assets/pano.r.webp"/>
              <IonCardHeader>
                <IonLabel>Casa alvaro casanova / Condominio cerrado</IonLabel>

              <div style={{ marginTop: '10px', display: '', gap: '5px' }}>
              <IonChip color="primary">
              < IonLabel>Casa</IonLabel>
              </IonChip>
              <IonChip color="secondary">
              <IonLabel>144m2</IonLabel>
              </IonChip>
              <IonChip color="tertiary">
              <IonLabel>Venta</IonLabel>
              </IonChip>
              <IonButton slot="end">Contactar</IonButton>
              </div>

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
