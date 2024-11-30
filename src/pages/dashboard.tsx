import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import { homeOutline, locationOutline, notificationsOutline, personOutline, addCircleOutline, logOutOutline } from 'ionicons/icons';
import PublishPropertyModal from '../components/PublishPropertyModal';
import PropertyList from '../components/PropertyList';
import { useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Importar función de Firebase
import { auth } from './firebaseConfig'; // Importar configuración de Firebase

const Dashboard: React.FC = () => {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const history = useHistory();

  const goToPropertyPage = () => history.push('/property');
  const gotologin = () => history.push('/login');
  const gotonotifaciones = () => history.push('/notificaciones');
  const navigateToHome = () => history.push('/folder/Inbox');

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario en Firebase
      history.push('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButton
            slot="end"
            onClick={handleLogout}
            style={{ marginRight: '10px', fontSize: '14px' }}
          >
            <IonIcon icon={logOutOutline} slot="start" />
            Cerrar Sesión
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton
          expand="block"
          shape="round"
          color="primary"
          onClick={() => setShowPublishModal(true)}
        >
          <IonIcon icon={addCircleOutline} slot="start" />
          Publicar Propiedad
        </IonButton>

        <PropertyList/>

        <PublishPropertyModal
          isOpen={showPublishModal}
          onClose={() => setShowPublishModal(false)}
        />
      </IonContent>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" onClick={goToPropertyPage}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>
        <IonTabButton tab="notifications" onClick={gotonotifaciones}>
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>
        <IonTabButton tab="profile" href= '/dashboard' >
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default Dashboard;
