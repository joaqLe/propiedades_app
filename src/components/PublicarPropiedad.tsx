import React, { useState } from 'react';
import { IonModal, IonButton, IonInput, IonTextarea, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';


interface PublicarPropiedadProps {
  onPublish: (property: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

const PublicarPropiedad: React.FC<PublicarPropiedadProps> = ({ onPublish, isOpen, onClose }) => {


  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState<File[]>([]);
  // Define los estados locales para manejar los valores del nombre de la propiedad,   descripción, precio, dirección e imágenes.

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages(Array.from(files));
      // Convierte la lista de archivos a un array y actualiza el estado con imagenes
    }
  };

  const handlePublish = () => {
    const newProperty = {
      id: Date.now(),
      name: propertyName,
      description,
      price: `UF ${price}`,
      address,
      images: images.map((image) => URL.createObjectURL(image)),
    };
    onPublish(newProperty); 
    // Resetea los valores del formulario.
    setPropertyName('');
    setDescription('');
    setPrice('');
    setAddress('');
    setImages([]);
    onClose(); 
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonList>        
        <IonItem>
          <IonLabel position="stacked">Nombre de la Propiedad</IonLabel>
          <IonInput value={propertyName} onIonChange={(e) => setPropertyName(e.detail.value!)} placeholder="Ingresa el nombre de la propiedad" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value!)} placeholder="Ingresa una descripción" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio (UF)</IonLabel>
          <IonInput value={price} onIonChange={(e) => setPrice(e.detail.value!)} type="number" placeholder="4500" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput value={address} onIonChange={(e) => setAddress(e.detail.value!)} placeholder="Ingresa la dirección" />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Subir Imágenes</IonLabel>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        </IonItem>

        {images.length > 0 && (
          <IonGrid>
            <IonRow>
              {images.map((image, index) => (
                <IonCol size="4" key={index}>
                  <IonImg src={URL.createObjectURL(image)} alt={`preview ${index}`} />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonList>

      <IonButton expand="block" onClick={handlePublish} color="success">
        Publicar
      </IonButton>

      <IonButton expand="block" onClick={onClose} color="medium">
        Cancelar
      </IonButton>
    </IonModal>
  );
};

export default PublicarPropiedad;

