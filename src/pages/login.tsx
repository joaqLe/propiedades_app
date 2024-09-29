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
            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Propiedapp</h1>
          </IonText>
        </div>

        {/* Formulario de creación de cuenta */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Crea una cuenta</h2>
            <p>ingresa tu email para registrarte o iniciar sesión</p>
          </IonText>
        </div>

{/* Campo de entrada de email con estilo personalizado */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <IonItem
            lines="none"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #3a3a3a',
              borderRadius: '10px',
              width: '100%',
              padding: '5px',
            }}
          >
            <IonInput
              placeholder="email@domain.com"
              type="email"
              clearInput
              style={{
                color: '#fff',
                '--placeholder-color': '#aaa', // Color del placeholder
              }}
          />
        </IonItem>
        </div>

        {/* Botón de continuar */}
        <IonButton expand="block" shape="round" style={{ marginTop: '20px', marginBottom: '20px' }}>
          Continuar
        </IonButton>

        {/* Separador */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
          <IonText style={{ margin: '0 10px' }}>o</IonText>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
        </div>

        {/* Botones de iniciar sesión con Google y Apple */}
        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '20px' }}>
          <IonIcon slot="start" icon="/assets/google-icon.png" /> {/* Ruta al icono de Google */}
          Continuar con Google
        </IonButton>

        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '10px' }}>
          <IonIcon slot="start" icon="/assets/apple-icon.png" /> {/* Ruta al icono de Apple */}
          Continuar con  Apple
        </IonButton>

        {/* Texto de términos y privacidad */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
          <IonText>

          Al hacer clic en Continuar, acepta nuestras <a href="#">Condiciones de servicio</a> y nuestra <a href="#">Política de privacidad</a>..
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
