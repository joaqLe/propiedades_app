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

  // Función para navegar a la página principal
  const navigateToHome = () => {
    history.push('/folder/Inbox');
  };

  // Función para navegar a la página de propiedades
  const navigateToProperty = () => {
    history.push('/property');
  };

  return (
    <IonPage>
      <IonHeader>
        {/* Header opcional si quieres añadirlo */}
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Título de la app */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <IonText>
            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>App name</h1>
          </IonText>
        </div>

        {/* Formulario de creación de cuenta */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Create an account</h2>
            <p>Enter your email to sign up for this app</p>
          </IonText>
        </div>

        {/* Campo de entrada de email */}
        <IonItem lines="none">
          <IonInput
            placeholder="email@domain.com"
            type="email"
            clearInput
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '10px',
            }}
          />
        </IonItem>

        {/* Botón de continuar */}
        <IonButton expand="block" shape="round" style={{ marginTop: '20px', marginBottom: '20px' }}>
          Continue
        </IonButton>

        {/* Separador */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
          <IonText style={{ margin: '0 10px' }}>or</IonText>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
        </div>

        {/* Botones de iniciar sesión con Google y Apple */}
        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '20px' }}>
          <IonIcon slot="start" icon="/assets/google-icon.png" /> {/* Ruta al icono de Google */}
          Continue with Google
        </IonButton>

        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '10px' }}>
          <IonIcon slot="start" icon="/assets/apple-icon.png" /> {/* Ruta al icono de Apple */}
          Continue with Apple
        </IonButton>

        {/* Texto de términos y privacidad */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
          <IonText>
            By clicking continue, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </IonText>
        </div>
      </IonContent>

      {/* Barra de navegación inferior */}
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
