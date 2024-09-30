import React from 'react';
// Importa React para definir el componente funcional.

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
// Importa componentes de Ionic como `IonPage`, `IonHeader`, `IonContent`, `IonButton` y otros para construir la UI de la página.

import { homeOutline, locationOutline } from 'ionicons/icons';
// Importa íconos específicos de Ionicons para representar funciones como la navegación a la página principal y de propiedades.

import { useHistory } from 'react-router-dom';
// Importa el hook `useHistory` de React Router para manejar la navegación a diferentes páginas.

const LoginPage: React.FC = () => {
  // Define el componente `LoginPage` como un Functional Component usando TypeScript.

  const history = useHistory();
  // Usa el hook `useHistory` para manejar la navegación.

  // Función para navegar a la página principal
  const navigateToHome = () => {
    history.push('/folder/Inbox');
    // Navega a la ruta `/folder/Inbox` al hacer clic en el botón correspondiente.
  };

  // Función para navegar a la página de propiedades
  const navigateToProperty = () => {
    history.push('/property');
    // Navega a la ruta `/property` al hacer clic en el botón correspondiente.
  };

  return (
    <IonPage>
      {/* Contenedor principal de la página de inicio de sesión */}

      <IonHeader>
        {/* Header opcional si quieres añadir un título o encabezado adicional */}
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Contenedor principal del contenido de la página con padding aplicado */}
        
        {/* Título de la aplicación */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <IonText>
            <h1 style={{ fontWeight: 'bold', fontSize: '24px' }}>Propiedapp</h1>
            {/* Título principal centrado y con estilo de fuente grande */}
          </IonText>
        </div>

        {/* Formulario de creación de cuenta */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IonText>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Crea una cuenta</h2>
            <p>ingresa tu email para registrarte o iniciar sesión</p>
            {/* Subtítulo y descripción del formulario */}
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
                '--placeholder-color': '#aaa', // Estilo personalizado para el color del placeholder.
              }}
            />
          </IonItem>
        </div>

        {/* Botón de continuar */}
        <IonButton expand="block" shape="round" style={{ marginTop: '20px', marginBottom: '20px' }}>
          Continuar
          {/* Botón para continuar el registro o inicio de sesión */}
        </IonButton>

        {/* Separador visual con texto "o" */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
          <IonText style={{ margin: '0 10px' }}>o</IonText>
          <hr style={{ flex: '1', borderTop: '1px solid #ccc' }} />
        </div>

        {/* Botones de inicio de sesión con Google y Apple */}
        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '20px' }}>
          <IonIcon slot="start" icon="/assets/google-icon.png" /> {/* Ruta al icono de Google */}
          Continuar con Google
        </IonButton>

        <IonButton expand="block" fill="outline" shape="round" style={{ marginTop: '10px' }}>
          <IonIcon slot="start" icon="/assets/apple-icon.png" /> {/* Ruta al icono de Apple */}
          Continuar con Apple
        </IonButton>

        {/* Texto de términos y privacidad */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
          <IonText>
            Al hacer clic en Continuar, acepta nuestras <a href="#">Condiciones de servicio</a> y nuestra <a href="#">Política de privacidad</a>.
            {/* Texto de términos y políticas con enlaces. */}
          </IonText>
        </div>
      </IonContent>

      {/* Barra de navegación inferior */}
      <IonTabBar slot="bottom">
        {/* Botón de navegación a la página principal */}
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>

        {/* Botón de navegación a la página de propiedades */}
        <IonTabButton tab="property" onClick={navigateToProperty}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default LoginPage;
// Exporta el componente `LoginPage` para su uso en otras partes de la aplicación.
  