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
import 'swiper/css';

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
    },
  ];

  const mapPrices = [
    { id: 1, price: 'UF 4500', position: { top: '40%', left: '45%' } },
    { id: 2, price: 'UF 2300', position: { top: '30%', left: '20%' } },
    { id: 3, price: 'UF 2500', position: { top: '60%', left: '70%' } },
    { id: 4, price: 'UF 3800', position: { top: '50%', left: '15%' } },
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
