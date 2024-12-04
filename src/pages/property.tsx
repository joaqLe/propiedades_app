import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonItem, IonIcon, IonLabel, IonContent } from '@ionic/react';
import { searchOutline, pencilOutline } from 'ionicons/icons';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../pages/firebaseConfig';
import PropertyMap from '../components/PropertyMap';
import PropertyCarousel from '../components/PropertyCarousel';
import {
  IonTabBar,
  IonTabButton,
  IonIcon as IonFooterIcon,
} from '@ionic/react';
import { locationOutline, homeOutline, notificationsOutline, personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Contexto de autenticación

const PropertyPage: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const defaultLatLng: [number, number] = [-33.447487, -70.673676]; // Santiago, Chile
  const history = useHistory();
  const { currentUser } = useAuth();

  const navigateToDashboard = () => history.push('/dashboard');
  const goToPropertyPage = () => history.push('/property');
  const gotonotifaciones = () => history.push('/notificaciones');
  const gotologin = () => history.push('/login');
  const navigateToHome = () => history.push('/folder/Inbox');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'properties'), (snapshot) => {
      const fetchedProperties = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(fetchedProperties);
    });

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
        <PropertyMap properties={properties} defaultLatLng={defaultLatLng} />
        <PropertyCarousel properties={properties} />
      </IonContent>

      {/* Footer del Home integrado */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonFooterIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" href="/property">
          <IonFooterIcon icon={locationOutline} />
        </IonTabButton>
        <IonTabButton tab="notifications" onClick={gotonotifaciones}>
          <IonFooterIcon icon={notificationsOutline} />
        </IonTabButton>
        <IonTabButton
          tab="profile"
          onClick={() => {
            if (currentUser) {
              navigateToDashboard(); // Redirige al Dashboard si está autenticado
            } else {
              gotologin(); // Redirige al login si no está autenticado
            }
          }}
        >
          <IonFooterIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default PropertyPage;
