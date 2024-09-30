import React from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { homeOutline, locationOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const history = useHistory();

  const navigateToHome = () => history.push('/folder/Inbox');
  const navigateToProperty = () => history.push('/property');

  return (
    <IonPage>
      <IonHeader />

      <IonContent fullscreen className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <IonText>
            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Propiedapp</h1>
          </IonText>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Crea una cuenta</h2>
            <p>Ingresa tu email para registrarte o iniciar sesión</p>
          </IonText>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IonItem lines="none" style={{ backgroundColor: 'transparent', border: '1px solid #3a3a3a', borderRadius: '10px', width: '100%', padding: '5px' }}>
            <IonInput placeholder="email@domain.com" type="email" clearInput style={{ color: '#fff', '--placeholder-color': '#aaa' }} />
          </IonItem>
        </div>

        <IonButton expand="block" shape="round" style={{ marginTop: '20px', marginBottom: '20px' }}>
          Continuar
        </IonButton>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
          <IonText style={{ margin: '0 10px' }}>o</IonText>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
        </div>

        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '20px' }}>
          <IonIcon slot="start" icon="/assets/google-icon.png" />
          Continuar con Google
        </IonButton>

        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '10px' }}>
          <IonIcon slot="start" icon="/assets/apple-icon.png" />
          Continuar con Apple
        </IonButton>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
          <IonText>
            Al hacer clic en Continuar, acepta nuestras <a href="#">Condiciones de servicio</a> y nuestra <a href="#">Política de privacidad</a>.
          </IonText>
        </div>
      </IonContent>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" onClick={navigateToProperty}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default LoginPage;
