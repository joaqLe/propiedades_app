import React, { useState } from 'react';
// Importa React y el hook `useState` para manejar estados en el componente.

import { IonModal, IonButton, IonInput, IonTextarea, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
// Importa los componentes de Ionic como el modal, botones, entradas de texto, etiquetas, y listas para construir la UI.

interface PublicarPropiedadProps {
  onPublish: (property: any) => void;
  isOpen: boolean;
  onClose: () => void;
}
// Define la interfaz `PublicarPropiedadProps` que especifica las propiedades esperadas por el componente `PublicarPropiedad`.
// `onPublish`: Función que se ejecuta al publicar una propiedad.
// `isOpen`: Indica si el modal está abierto o cerrado.
// `onClose`: Función que se ejecuta al cerrar el modal.

const PublicarPropiedad: React.FC<PublicarPropiedadProps> = ({ onPublish, isOpen, onClose }) => {
  // Define el componente `PublicarPropiedad` y recibe las propiedades `onPublish`, `isOpen`, y `onClose`.

  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<File[]>([]);
  // Define los estados locales para manejar los valores del nombre de la propiedad, descripción, precio, dirección e imágenes.

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages(Array.from(files));
      // Convierte la lista de archivos a un array y actualiza el estado `images` con las imágenes seleccionadas.
    }
  };

  const handlePublish = () => {
    const newProperty = {
      id: Date.now(), // Genera un ID único para la propiedad usando la fecha actual.
      name: propertyName,
      description,
      price: `UF ${price}`,
      address,
      images: images.map((image) => URL.createObjectURL(image)),
      // Crea un nuevo objeto de propiedad que incluye los detalles ingresados y las imágenes convertidas a URLs.
    };
    onPublish(newProperty); // Llama a la función `onPublish` con la nueva propiedad.
    // Resetea los valores del formulario.
    setPropertyName('');
    setDescription('');
    setPrice('');
    setAddress('');
    setImages([]);
    onClose(); // Cierra el modal después de publicar.
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      {/* Componente Modal de Ionic que se abre basado en el valor de `isOpen`. Se cierra cuando se llama a `onClose`. */}

      <IonList>
        {/* Lista de Ionic que contiene los elementos del formulario para ingresar los datos de la propiedad. */}
        
        <IonItem>
          <IonLabel position="stacked">Nombre de la Propiedad</IonLabel>
          {/* Etiqueta del campo para el nombre de la propiedad. */}
          <IonInput value={propertyName} onIonChange={(e) => setPropertyName(e.detail.value!)} placeholder="Ingresa el nombre de la propiedad" />
          {/* Entrada de texto para el nombre de la propiedad. Actualiza el estado `propertyName` cuando el usuario cambia el valor. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value!)} placeholder="Ingresa una descripción" />
          {/* Área de texto para la descripción de la propiedad. Actualiza el estado `description` cuando se cambia el valor. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio (UF)</IonLabel>
          <IonInput value={price} onIonChange={(e) => setPrice(e.detail.value!)} type="number" placeholder="4500" />
          {/* Entrada de texto para el precio de la propiedad. Actualiza el estado `price` cuando se cambia el valor. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput value={address} onIonChange={(e) => setAddress(e.detail.value!)} placeholder="Ingresa la dirección" />
          {/* Entrada de texto para la dirección de la propiedad. Actualiza el estado `address` cuando se cambia el valor. */}
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Subir Imágenes</IonLabel>
          {/* Etiqueta del campo para subir imágenes. */}
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          {/* Input tipo file que permite seleccionar múltiples imágenes. Llama a `handleImageChange` cuando se seleccionan imágenes. */}
        </IonItem>

        {/* Vista previa de imágenes seleccionadas */}
        {images.length > 0 && (
          <IonGrid>
            <IonRow>
              {images.map((image, index) => (
                <IonCol size="4" key={index}>
                  <IonImg src={URL.createObjectURL(image)} alt={`preview ${index}`} />
                  {/* Muestra una vista previa de cada imagen seleccionada usando `IonImg` y `URL.createObjectURL` para generar la URL de la imagen. */}
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonList>

      <IonButton expand="block" onClick={handlePublish} color="success">
        Publicar
        {/* Botón que llama a `handlePublish` cuando es presionado para publicar la propiedad. */}
      </IonButton>

      <IonButton expand="block" onClick={onClose} color="medium">
        Cancelar
        {/* Botón que llama a `onClose` para cerrar el modal sin publicar la propiedad. */}
      </IonButton>
    </IonModal>
  );
};

export default PublicarPropiedad;
// Exporta el componente `PublicarPropiedad` para su uso en otros archivos.
