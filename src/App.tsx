import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Page from './pages/home';
import PropertyPage from './pages/property'; 
import LoginPage from './pages/login';
import NotificationsPage from './pages/notificaciones';
import GeolocationPage from './pages/geolocation';
import DashboardPage from './pages/dashboard';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
 import '@ionic/react/css/palettes/dark.always.css';
 import '@ionic/react/css/palettes/dark.class.css';


/* Theme variables */
import './theme/variables.css';
import { LocationProvider } from './components/LocationContext';
import PropertyDetailPage from './pages/PropertyDetailPage';



setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
    <LocationProvider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          
          <IonRouterOutlet id="main">

          <Route path="/" exact={true}>
            <Redirect to="/login" />
          </Route>

          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>

          <Route path="/folder/:name" exact={true}>
           <Page />
          </Route>

          <Route path="/property" exact={true}>
            <PropertyPage />
          </Route>

          <Route path="/notificaciones" exact={true}>
            <NotificationsPage />
          </Route>

          <Route path="/geolocation" exact={true}>
            <GeolocationPage />
          </Route>

          <Route path="/dashboard"exact={true}>
          <DashboardPage />
          </Route>
          
          <Route path="/property/:id" exact={true} component={PropertyDetailPage} />


          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </LocationProvider>
    </IonApp>
  );
};

export default App;
