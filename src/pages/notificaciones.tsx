import React from 'react';
// Importa React para definir el componente funcional.

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
// Importa varios componentes de Ionic para construir la estructura de la página (como `IonPage`, `IonHeader`, `IonContent`, `IonList` y más).

import { homeOutline, locationOutline, notificationsOutline, personOutline, informationCircleOutline, pricetagOutline, checkmarkCircleOutline } from 'ionicons/icons';
// Importa íconos de Ionicons para representar funciones de la aplicación como la navegación, notificaciones, perfil, y otros.

import { useHistory } from 'react-router-dom';
// Importa el hook `useHistory` de React Router para manejar la navegación entre páginas.

const NotificationsPage: React.FC = () => {
  // Define el componente `NotificationsPage` como un Functional Component usando TypeScript.

  const history = useHistory();
  // Define el hook `useHistory` para manejar la navegación a diferentes rutas.

  // Función para navegar a la página principal
  const navigateToHome = () => {
    history.push('/folder/Inbox');
    // Redirige a la ruta `/folder/Inbox` cuando se llama.
  };

  // Función para navegar a la página de propiedades
  const navigateToProperty = () => {
    history.push('/property');
    // Redirige a la ruta `/property` cuando se llama.
  };

  // Función para navegar a la página de perfil (login)
  const navigateToProfile = () => {
    history.push('/login');
    // Redirige a la ruta `/login` cuando se llama.
  };

  return (
    <IonPage>
      {/* Contenedor principal de la página */}

      <IonHeader>
        {/* Encabezado de la página */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          {/* Título centrado con padding adicional */}
          <IonText>
            <h2 style={{ fontWeight: 'bold' }}>
              Notificaciones <IonIcon icon={notificationsOutline} />
              {/* Título "Notificaciones" con ícono de campana */}
            </h2>
          </IonText>
        </div>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Contenedor de contenido principal con padding aplicado */}

        {/* Lista de notificaciones con íconos */}
        <IonList>
          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            {/* Ícono de información al inicio del ítem */}
            <IonLabel>
              <h2>Nueva propiedad disponible</h2>
              <p>Revisa las últimas propiedades añadidas en tu área.</p>
              {/* Descripción de la notificación */}
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={pricetagOutline} slot="start" />
            {/* Ícono de etiqueta de precio al inicio del ítem */}
            <IonLabel>
              <h2>Descuento especial</h2>
              <p>Accede a descuentos exclusivos en propiedades seleccionadas.</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            {/* Ícono de información al inicio del ítem */}
            <IonLabel>
              <h2>Actualización de la app</h2>
              <p>Nuevas funciones disponibles en la última actualización.</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={checkmarkCircleOutline} slot="start" />
            {/* Ícono de check al inicio del ítem */}
            <IonLabel>
              <h2>Propiedad vendida</h2>
              <p>Una propiedad en tu lista de seguimiento ha sido vendida.</p>
            </IonLabel>
          </IonItem>
        </IonList>
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

        {/* Botón de navegación a la página de notificaciones */}
        <IonTabButton tab="notifications" href="/notificaciones">
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>

        {/* Botón de navegación a la página de perfil (login) */}
        <IonTabButton tab="profile" onClick={navigateToProfile}>
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default NotificationsPage;
// Exporta el componente `NotificationsPage` para su uso en otras partes de la aplicación.
