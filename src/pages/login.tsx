import React, { useState } from 'react';
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
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Asegúrate de importar la configuración de Firebase

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/dashboard'); // Redirige al dashboard después del inicio de sesión
    } catch (error) {
      setError('Error al iniciar sesión. Verifique sus credenciales e intente de nuevo.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      history.push('/dashboard');
    } catch (error) {
      setError('Error al iniciar sesión con Google.');
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

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
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Iniciar sesión</h2>
            {error && <IonText color="danger">{error}</IonText>}
          </IonText>
        </div>
        <IonItem>
          <IonInput
            placeholder="email@domain.com"
            type="email"
            onIonChange={(e) => setEmail(e.detail.value!)}
            clearInput
          />
        </IonItem>
        <IonItem>
          <IonInput
            placeholder="Contraseña"
            type="password"
            onIonChange={(e) => setPassword(e.detail.value!)}
            clearInput
          />
        </IonItem>
        <IonButton expand="block" onClick={handleLogin} style={{ marginTop: '20px' }}>
          Iniciar sesión
        </IonButton>
        <IonButton expand="block" fill="outline" onClick={handleGoogleLogin} style={{ marginTop: '10px' }}>
          <IonIcon slot="start" icon="/assets/google-icon.png" />
          Continuar con Google
        </IonButton>
      </IonContent>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={() => history.push('/folder/Inbox')}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" onClick={() => history.push('/property')}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default LoginPage;
