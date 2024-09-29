import React, { useState } from 'react';
import { IonModal, IonButton, IonInput, IonTextarea, IonItem, IonLabel, IonList } from '@ionic/react';

interface EditarPropiedadProps {
  property: any;
  onSave: (updatedProperty: any) => void;
  onClose: () => void;
}

const EditarPropiedad: React.FC<EditarPropiedadProps> = ({ property, onSave, onClose }) => {
  const [propertyName, setPropertyName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price);
  const [address, setAddress] = useState(property.address);

  const handleSave = () => {
    const updatedProperty = {
      ...property,
      name: propertyName,
      description,
      price,
      address,
    };
    onSave(updatedProperty);
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose}>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Nombre de la Propiedad</IonLabel>
          <IonInput value={propertyName} onIonChange={(e) => setPropertyName(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Precio (UF)</IonLabel>
          <IonInput value={price} onIonChange={(e) => setPrice(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput value={address} onIonChange={(e) => setAddress(e.detail.value!)} />
        </IonItem>
      </IonList>
      <IonButton expand="block" onClick={handleSave} color="primary">
        Guardar Cambios
      </IonButton>
      <IonButton expand="block" onClick={onClose} color="medium">
        Cancelar
      </IonButton>
    </IonModal>
  );
};

export default EditarPropiedad;
