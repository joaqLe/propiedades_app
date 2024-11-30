import React from 'react';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg } from '@ionic/react';

const PropertyCard: React.FC<{ property: any }> = ({ property }) => {
  return (
    <IonCard>
      <IonImg src={property.img} alt={property.name} />
      <IonCardHeader>
        <IonCardTitle>{property.name}</IonCardTitle>
        <IonCardSubtitle>{property.location}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        Precio: {property.price}
      </IonCardContent>
    </IonCard>
  );
};

export default PropertyCard;
