import React, { useState } from 'react'; 
// Importa React y el hook `useState` desde la librería de React.

import { IonModal, IonButton, IonInput, IonTextarea, IonItem, IonLabel, IonList } from '@ionic/react';
// Importa componentes de la librería de Ionic como el modal, botones, inputs, y listas.

interface EditarPropiedadProps {
  property: any;
  onSave: (updatedProperty: any) => void;
  onClose: () => void;
}
// Define la interfaz `EditarPropiedadProps` para especificar las propiedades esperadas por el componente `EditarPropiedad`.
// `property`: Objeto que representa la propiedad a editar.
// `onSave`: Función que se ejecuta al guardar los cambios.
// `onClose`: Función que se ejecuta al cerrar el modal.

const EditarPropiedad: React.FC<EditarPropiedadProps> = ({ property, onSave, onClose }) => {
  // Define el componente `EditarPropiedad` con las propiedades `property`, `onSave`, y `onClose`.
  
  const [propertyName, setPropertyName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price);
  const [address, setAddress] = useState(property.address);
  // Define cuatro estados locales: `propertyName`, `description`, `price`, y `address` para manejar los cambios en los campos de edición.

  const handleSave = () => {
    const updatedProperty = {
      ...property, // Mantiene el resto de las propiedades del objeto original.
      name: propertyName,
      description,
      price,
      address,
    };
    onSave(updatedProperty);
    // Crea un objeto `updatedProperty` con los valores actualizados y ejecuta la función `onSave` con este objeto.
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose}>
      {/* Componente modal que se muestra siempre (`isOpen={true}`) y se cierra con `onDidDismiss={onClose}`. */}

      <IonList>
        {/* Lista de elementos dentro del modal para editar la propiedad. */}
        
        <IonItem>
          <IonLabel position="stacked">Nombre de la Propiedad</IonLabel>
          {/* Etiqueta para indicar el nombre del campo. */}
          <IonInput value={propertyName} onIonChange={(e) => setPropertyName(e.detail.value!)} />
          {/* Campo de entrada para el nombre de la propiedad, que actualiza el estado `propertyName` al cambiar. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value!)} />
          {/* Campo de área de texto para la descripción, que actualiza el estado `description` al cambiar. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio (UF)</IonLabel>
          <IonInput value={price} onIonChange={(e) => setPrice(e.detail.value!)} />
          {/* Campo de entrada para el precio de la propiedad, que actualiza el estado `price` al cambiar. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput value={address} onIonChange={(e) => setAddress(e.detail.value!)} />
          {/* Campo de entrada para la dirección de la propiedad, que actualiza el estado `address` al cambiar. */}
        </IonItem>
      </IonList>

      <IonButton expand="block" onClick={handleSave} color="primary">
        Guardar Cambios
        {/* Botón para guardar los cambios. Llama a la función `handleSave` cuando se presiona. */}
      </IonButton>

      <IonButton expand="block" onClick={onClose} color="medium">
        Cancelar
        {/* Botón para cancelar la edición y cerrar el modal. Llama a `onClose` cuando se presiona. */}
      </IonButton>
    </IonModal>
  );
};

export default EditarPropiedad;
// Exporta el componente `EditarPropiedad` para ser utilizado en otros archivos.
