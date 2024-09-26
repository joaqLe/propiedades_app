import React from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonIcon,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { homeOutline, locationOutline, notificationsOutline, personOutline, informationCircleOutline, pricetagOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const NotificationsPage: React.FC = () => {
  const history = useHistory();

  // Funciones para navegación
  const navigateToHome = () => {
    history.push('/folder/Inbox');
  };

  const navigateToProperty = () => {
    history.push('/property');
  };

  const navigateToProfile = () => {
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold' }}>
              Notificaciones <IonIcon icon={notificationsOutline} />
            </h2>
          </IonText>
        </div>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Lista de notificaciones con íconos */}
        <IonList>
          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>
              <h2>Nueva propiedad disponible</h2>
              <p>Revisa las últimas propiedades añadidas en tu área.</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={pricetagOutline} slot="start" />
            <IonLabel>
              <h2>Descuento especial</h2>
              <p>Accede a descuentos exclusivos en propiedades seleccionadas.</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>
              <h2>Actualización de la app</h2>
              <p>Nuevas funciones disponibles en la última actualización.</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" />
            <IonLabel>
              <h2>Propiedad vendida</h2>
              <p>Una propiedad en tu lista de seguimiento ha sido vendida.</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      {/* Barra de navegación inferior */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>

        <IonTabButton tab="property" onClick={navigateToProperty}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>

        <IonTabButton tab="notifications" href="/notificaciones">
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>

        <IonTabButton tab="profile" onClick={navigateToProfile}>
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default NotificationsPage;
