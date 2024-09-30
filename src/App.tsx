import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
// Importa componentes principales de Ionic necesarios para configurar la aplicación.

import { IonReactRouter } from '@ionic/react-router';
// Importa el enrutador de React para manejar la navegación de la aplicación.

import { Redirect, Route } from 'react-router-dom';
// Importa componentes de React Router como `Redirect` y `Route` para definir rutas de navegación.

import Page from './pages/home';
// Importa el componente `Page` que corresponde a la página principal (Home).

import PropertyPage from './pages/property'; 
// Importa el componente `PropertyPage` que corresponde a la página de propiedades.

import LoginPage from './pages/login';
// Importa el componente `LoginPage` que corresponde a la página de inicio de sesión.

import NotificationsPage from './pages/notificaciones';
// Importa el componente `NotificationsPage` que corresponde a la página de notificaciones.

import GeolocationPage from './pages/geolocation';
// Importa el componente `GeolocationPage` que corresponde a la página de geolocalización.

import DashboardPage from './pages/dashboard';
// Importa el componente `DashboardPage` que corresponde a la página del dashboard de usuario.

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
// Importa el CSS principal requerido para que los componentes de Ionic funcionen correctamente.

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
// Importa estilos CSS básicos para la estructura, normalización y tipografía.

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
// Importa estilos CSS opcionales para el padding, elementos flotantes, alineación de texto, transformación de texto, utilidades flex y display.

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
// Importa el CSS para el modo oscuro de la aplicación, pero está comentado en algunas opciones, dejando habilitado el modo oscuro según la configuración del sistema.

/* Theme variables */
import './theme/variables.css';
// Importa variables de tema para definir estilos y colores personalizados.

import { LocationProvider } from './components/LocationContext';
// Importa `LocationProvider` desde el contexto global de `LocationContext` para manejar la dirección de forma global en la aplicación.

setupIonicReact();
// Inicializa Ionic React para configurar el entorno de Ionic en React.

const App: React.FC = () => {
  // Define el componente `App` como un Functional Component usando TypeScript.

  return (
    <IonApp>
      {/* Contenedor principal de la aplicación Ionic */}
      
      <LocationProvider>
        {/* Proveedor de contexto global para manejar direcciones a nivel de la aplicación */}

        <IonReactRouter>
          {/* Envoltorio principal para manejar rutas dentro de la aplicación */}

          <IonSplitPane contentId="main">
            {/* `IonSplitPane` permite dividir la aplicación en un panel principal y un panel adicional (como un menú) */}

            <IonRouterOutlet id="main">
              {/* Contenedor para las diferentes rutas de la aplicación */}

              <Route path="/" exact={true}>
                <Redirect to="/login" />
                {/* Redirige la ruta raíz ("/") a la página de inicio de sesión ("/login") */}
              </Route>

              <Route path="/login" exact={true}>
                <LoginPage />
                {/* Renderiza el componente `LoginPage` cuando la ruta es "/login" */}
              </Route>

              <Route path="/folder/:name" exact={true}>
                <Page />
                {/* Renderiza el componente `Page` (Home) cuando la ruta es "/folder/:name" */}
              </Route>

              <Route path="/property" exact={true}>
                <PropertyPage />
                {/* Renderiza el componente `PropertyPage` cuando la ruta es "/property" */}
              </Route>

              <Route path="/notificaciones" exact={true}>
                <NotificationsPage />
                {/* Renderiza el componente `NotificationsPage` cuando la ruta es "/notificaciones" */}
              </Route>

              <Route path="/geolocation" exact={true}>
                <GeolocationPage />
                {/* Renderiza el componente `GeolocationPage` cuando la ruta es "/geolocation" */}
              </Route>

              <Route path="/dashboard" exact={true}>
                <DashboardPage />
                {/* Renderiza el componente `DashboardPage` cuando la ruta es "/dashboard" */}
              </Route>

            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </LocationProvider>
    </IonApp>
  );
};

export default App;
// Exporta el componente `App` para ser utilizado en otros archivos del proyecto.
