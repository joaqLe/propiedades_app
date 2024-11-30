import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../pages/firebaseConfig';
import { useAuth } from '../pages/AuthContext'; // Importa el contexto de autenticación

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const { currentUser } = useAuth(); // Obtén el usuario actual del contexto

  useEffect(() => {
    if (!currentUser) return;

    // Realiza una consulta para obtener solo las propiedades del usuario actual
    const q = query(
      collection(db, 'properties'),
      where('userId', '==', currentUser.uid) // Filtra por userId
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(data);
    });

    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
  }, [currentUser]);

  if (!currentUser) {
    return <IonLabel>No estás autenticado.</IonLabel>;
  }

  return (
    <IonList>
      {properties.length === 0 ? (
        <IonItem>
          <IonLabel>No hay propiedades publicadas por ti.</IonLabel>
        </IonItem>
      ) : (
        properties.map((property) => (
          <IonItem key={property.id}>
            <IonLabel>
              <h2>{property.name}</h2>
              <p>{property.address}</p>
              <p>{property.price} USD</p>
            </IonLabel>
          </IonItem>
        ))
      )}
    </IonList>
  );
};

export default PropertyList;
