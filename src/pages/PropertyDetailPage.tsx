import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonButton,
  IonLabel,
  IonItem,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useParams } from 'react-router-dom'; // Para obtener el ID desde la URL
import { doc, getDoc } from 'firebase/firestore'; // Firebase Firestore
import { db } from '../pages/firebaseConfig';
import {
  homeOutline,
  locationOutline,
  notificationsOutline,
  personOutline,
} from 'ionicons/icons';
import { useAuth } from './AuthContext'; // Contexto de autenticación
import { useHistory } from 'react-router-dom';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la propiedad desde la URL
  const [property, setProperty] = useState<any>(null); // Datos de la propiedad
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { currentUser } = useAuth();

  const navigateToDashboard = () => history.push('/dashboard');
  const goToPropertyPage = () => history.push('/property');
  const gotonotifaciones = () => history.push('/notificaciones');
  const gotologin = () => history.push('/login');
  const navigateToHome = () => history.push('/folder/Inbox');

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'properties', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProperty(docSnap.data());
        } else {
          console.error('No se encontró la propiedad.');
        }
      } catch (error) {
        console.error('Error al obtener los datos de la propiedad:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cargando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  if (!property) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonLabel>No se encontraron los datos de la propiedad.</IonLabel>
        </IonContent>
      </IonPage>
    );
  }

  const {
    name,
    description,
    price,
    rooms,
    size,
    address,
    imageUrl,
    contact,
    coordinates,
  } = property;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles de la Propiedad</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Imagen de la propiedad */}
        <IonCard>
          <IonImg
            src={imageUrl}
            alt={`Imagen de ${name}`}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </IonCard>

        {/* Información de la propiedad */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{name}</IonCardTitle>
            <IonCardSubtitle>{address}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              <p>Descripción: {description}</p>
              <p>Precio: {price}</p>
              <p>Habitaciones: {rooms}</p>
              <p>Tamaño: {size} m²</p>
            </IonLabel>
          </IonCardContent>
        </IonCard>

        {/* Contacto */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contacto</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Teléfono: {contact?.phone || 'No disponible'}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Email: {contact?.email || 'No disponible'}</IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Mapa */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Ubicación</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={15}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
                <Popup>{name}</Popup>
              </Marker>
            </MapContainer>
          </IonCardContent>
        </IonCard>
      </IonContent>

      {/* Footer del Home integrado */}
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" onClick={navigateToHome}>
          <IonIcon icon={homeOutline} />
        </IonTabButton>
        <IonTabButton tab="property" onClick={goToPropertyPage}>
          <IonIcon icon={locationOutline} />
        </IonTabButton>
        <IonTabButton tab="notifications" onClick={gotonotifaciones}>
          <IonIcon icon={notificationsOutline} />
        </IonTabButton>
        <IonTabButton
          tab="profile"
          onClick={() => {
            if (currentUser) {
              navigateToDashboard(); // Redirige al Dashboard si está autenticado
            } else {
              gotologin(); // Redirige al login si no está autenticado
            }
          }}
        >
          <IonIcon icon={personOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonPage>
  );
};

export default PropertyDetailPage;
