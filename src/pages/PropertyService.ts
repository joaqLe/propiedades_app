// Importa las funciones de Firebase necesarias
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Define el tipo Property para manejar las propiedades
export interface Property {
  id?: string; // El ID de la propiedad es opcional porque Firebase lo asigna automáticamente
  userId: string; // Identificador del usuario que crea la propiedad
  name: string;
  description: string;
  price: string;
  address: string;
  images?: string[]; // Lista de URLs de las imágenes
}

// Función para obtener propiedades asociadas a un usuario
export const getPropertiesByUser = async (userId: string): Promise<Property[]> => {
    try {
      const q = query(collection(db, 'properties'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const properties: Property[] = [];
      querySnapshot.forEach((doc) => {
        // Verifica que los datos que se obtienen sean del tipo `Property`
        const data = doc.data() as Property; // <-- Tipifica explícitamente los datos
        properties.push({ id: doc.id, ...data });
      });
      return properties;
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
      throw new Error('No se pudieron obtener las propiedades');
    }
  };
  
// Función para agregar una nueva propiedad
export const addProperty = async (property: Property): Promise<void> => {
  try {
    await addDoc(collection(db, 'properties'), property);
  } catch (error) {
    console.error('Error al agregar propiedad:', error);
    throw new Error('No se pudo agregar la propiedad');
  }
};

// Función para actualizar una propiedad existente
export const updateProperty = async (propertyId: string, updatedData: Partial<Property>): Promise<void> => {
  try {
    const propertyDocRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyDocRef, updatedData);
  } catch (error) {
    console.error('Error al actualizar propiedad:', error);
    throw new Error('No se pudo actualizar la propiedad');
  }
};

// Función para eliminar una propiedad
export const deleteProperty = async (propertyId: string): Promise<void> => {
  try {
    const propertyDocRef = doc(db, 'properties', propertyId);
    await deleteDoc(propertyDocRef);
  } catch (error) {
    console.error('Error al eliminar propiedad:', error);
    throw new Error('No se pudo eliminar la propiedad');
  }
};
