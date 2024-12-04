import React, { useState } from 'react';
import {
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonButton,
  IonModal,
  IonToolbar,
  IonTitle,
  IonContent,
  IonHeader,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    address: string;
    location?: string;
    rating?: number;
    reviews?: number;
    contact: { phone: string; email: string };
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { id, name, price, imageUrl, address, location, rating, reviews, contact } = property;
  const [showContactModal, setShowContactModal] = useState(false);
  const history = useHistory();

  const openDetailPage = () => {
    history.push(`/property/${id}`);
  };

  return (
    <>
      <IonCard onClick={openDetailPage} style={{ cursor: 'pointer' }}>
        <IonImg
          src={imageUrl}
          alt={`Imagen de ${name}`}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <IonCardHeader>
          <IonLabel>{name}</IonLabel>
          <IonLabel>
            ⭐ {rating || 'N/A'} ({reviews || 0} reviews) • {location || 'Ubicación no disponible'}
          </IonLabel>
        </IonCardHeader>
        <IonCardContent>
          <IonLabel>{price || 'Precio no disponible'}</IonLabel>
          <IonLabel>{address}</IonLabel>
          <IonButton color="primary" onClick={(e) => { e.stopPropagation(); setShowContactModal(true); }}>
            Contactar
          </IonButton>
        </IonCardContent>
      </IonCard>

      {/* Modal de contacto */}
      <IonModal isOpen={showContactModal} onDidDismiss={() => setShowContactModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Contacto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonLabel>
            <p><strong>Teléfono:</strong> {contact.phone}</p>
            <p><strong>Email:</strong> {contact.email}</p>
          </IonLabel>
          <IonButton expand="block" color="medium" onClick={() => setShowContactModal(false)}>
            Cerrar
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default PropertyCard;
