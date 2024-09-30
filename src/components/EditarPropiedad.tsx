import React, { useState } from 'react'; 
import { IonModal, IonButton, IonInput, IonTextarea, IonItem, IonLabel, IonList } from '@ionic/react';

interface EditarProps {
  property: any;
  onSave: (p: any) => void;
  onClose: () => void;
}

const EditarPropiedad: React.FC<EditarProps> = ({ property, onSave, onClose }) => {
  const [propName, setPropName] = useState(property.name);
  const [desc, setDesc] = useState(property.description);
  const [price, setPrice] = useState(property.price);
  const [addr, setAddr] = useState(property.address);


  const guardarCambios = () => {
    const propAct = { ...property, name: propName, description: desc, price, address: addr };
    onSave(propAct);
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose}>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Nombre Propiedad</IonLabel>
          <IonInput value={propName} onIonChange={(e) => setPropName(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={desc} onIonChange={(e) => setDesc(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio</IonLabel>
          <IonInput value={price} onIonChange={(e) => setPrice(e.detail.value!)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput value={addr} onIonChange={(e) => setAddr(e.detail.value!)} />
        </IonItem>
      </IonList>

      <IonButton expand="block" onClick={guardarCambios} color="primary">
        Guardar
      </IonButton>

      <IonButton expand="block" onClick={onClose} color="medium">
        Cancelar
      </IonButton>
    </IonModal>
  );
};

export default EditarPropiedad;
