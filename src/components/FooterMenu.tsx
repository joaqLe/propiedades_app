import React from 'react';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import { homeOutline, locationOutline, notificationsOutline, personOutline } from 'ionicons/icons';

const FooterMenu: React.FC = () => {
  const goToPropertyPage = () => window.location.href = '/property';
  const gotonotifaciones = () => window.location.href = '/notifications';
  const gotologin = () => window.location.href = '/login';

  return (
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
  );
};

export default FooterMenu;
