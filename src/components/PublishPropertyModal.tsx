import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
} from '@ionic/react';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../pages/firebaseConfig'; // Configuración de Firebase
import GeolocationMap from './GeolocationMap';
import { useAuth } from '../pages/AuthContext'; // Contexto de autenticación
import { CLOUDINARY_URL, UPLOAD_PRESET } from '../CloudinaryConfig'; // Configuración de Cloudinary

interface PublishPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishPropertyModal: React.FC<PublishPropertyModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [rooms, setRooms] = useState('');
  const [size, setSize] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { currentUser } = useAuth();

  const searchAddress = async () => {
    if (address.trim() !== '') {
      try {
        const encodedAddress = encodeURIComponent(address);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`
        );

        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          alert('Dirección no encontrada.');
        }
      } catch (error) {
        alert('Error al buscar la dirección.');
      }
    }
  };

  const handleImageUpload = async (): Promise<string> => {
    if (!image) throw new Error('No se seleccionó ninguna imagen.');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url; // Retorna la URL de la imagen subida
    } catch (error) {
      console.error('Error subiendo imagen a Cloudinary:', error);
      throw new Error('No se pudo subir la imagen.');
    }
  };

  const handlePublish = async () => {
    if (!currentUser) {
      alert('Debes iniciar sesión para publicar una propiedad.');
      return;
    }

    if (name && price && description && rooms && size && address && coordinates && phone && email) {
      try {
        const imageUrl = await handleImageUpload(); // Subir imagen a Cloudinary

        await addDoc(collection(db, 'properties'), {
          name,
          price,
          description,
          rooms: parseInt(rooms),
          size: parseFloat(size),
          address,
          coordinates,
          imageUrl, // URL de la imagen subida
          contact: { phone, email }, // Guardar contacto
          userId: currentUser.uid,
        });

        alert('Propiedad publicada exitosamente.');
        onClose();
      } catch (error) {
        alert('Error al publicar la propiedad.');
        console.error(error);
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publicar Propiedad</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={name}
            placeholder="Ej: Casa en la playa"
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio (USD)</IonLabel>
          <IonInput
            value={price}
            type="number"
            placeholder="Ej: 120000"
            onIonChange={(e) => setPrice(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            value={description}
            placeholder="Ej: Hermosa casa con vista al mar."
            onIonChange={(e) => setDescription(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Número de Habitaciones</IonLabel>
          <IonInput
            value={rooms}
            type="number"
            placeholder="Ej: 3"
            onIonChange={(e) => setRooms(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Tamaño (m²)</IonLabel>
          <IonInput
            value={size}
            type="number"
            placeholder="Ej: 120"
            onIonChange={(e) => setSize(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Dirección</IonLabel>
          <IonInput
            value={address}
            placeholder="Ej: Av. Libertador 123"
            onIonChange={(e) => setAddress(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={searchAddress}>
          Buscar Dirección
        </IonButton>

        <GeolocationMap coordinates={coordinates} />

        <IonItem>
          <IonLabel position="stacked">Seleccionar Imagen</IonLabel>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Teléfono de contacto</IonLabel>
          <IonInput
            type="tel"
            value={phone}
            placeholder="Ej: +56912345678"
            onIonChange={(e) => setPhone(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Email de contacto</IonLabel>
          <IonInput
            type="email"
            value={email}
            placeholder="Ej: contacto@ejemplo.com"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" color="success" onClick={handlePublish}>
          Publicar Propiedad
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancelar
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default PublishPropertyModal;
