import React, { useState } from 'react';
// Importa React y el hook `useState` para manejar el estado local del componente.

import { IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail, IonImg } from '@ionic/react';
// Importa componentes de Ionic como listas, ítems, etiquetas, botones, íconos y vistas previas de imágenes.

import { trashOutline, pencilOutline } from 'ionicons/icons';
// Importa íconos específicos de Ionicons para representar la funcionalidad de eliminar y editar.

import EditarPropiedad from './EditarPropiedad';
// Importa el componente `EditarPropiedad` para mostrar el modal de edición cuando se selecciona una propiedad.

import '../components/verpropiedades.css';
// Importa el archivo CSS para aplicar estilos personalizados al componente.

interface VerPropiedadesProps {
  properties: any[];
  onDelete: (id: number) => void;
  onEdit: (updatedProperty: any) => void;
}
// Define la interfaz `VerPropiedadesProps` que especifica las propiedades que se esperan recibir en el componente `VerPropiedades`.
// `properties`: Lista de propiedades a mostrar.
// `onDelete`: Función para eliminar una propiedad específica.
// `onEdit`: Función para editar una propiedad y actualizar la lista.

const VerPropiedades: React.FC<VerPropiedadesProps> = ({ properties, onDelete, onEdit }) => {
  // Define el componente `VerPropiedades` y recibe `properties`, `onDelete`, y `onEdit` como propiedades.

  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  // Define un estado local `selectedProperty` para almacenar la propiedad seleccionada para edición.

  const handleDelete = (id: number) => {
    onDelete(id);
    // Llama a la función `onDelete` para eliminar la propiedad con el ID especificado.
  };

  return (
    <>
      <IonList style={{ backgroundColor: '#1e1e1e' }}>
        {/* Contenedor `IonList` con fondo oscuro para mostrar la lista de propiedades. */}

        {properties.map((property) => (
          <IonItem key={property.id} style={{ margin: '10px 0', borderRadius: '10px', backgroundColor: '#333' }}>
            {/* Itera sobre cada propiedad y muestra un `IonItem` con un estilo oscuro y bordes redondeados. */}

            {/* Miniatura de la imagen de la propiedad */}
            {property.images && property.images.length > 0 && (
              <IonThumbnail slot="start">
                <IonImg src={property.images[0]} style={{ borderRadius: '10px' }} />
                {/* Si la propiedad tiene imágenes, muestra la primera imagen como miniatura con `IonImg`. */}
              </IonThumbnail>
            )}

            <IonLabel style={{ color: '#ffffff' }}>
              {/* Contenedor de la información de la propiedad con color de texto blanco. */}
              <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{property.name}</h2>
              {/* Muestra el nombre de la propiedad con estilo de fuente en negrita y tamaño grande. */}
              <p style={{ color: '#a1a1a1' }}>{property.description}</p>
              {/* Muestra la descripción de la propiedad en un color gris claro. */}
              <p style={{ color: '#4caf50' }}>{property.price}</p>
              {/* Muestra el precio de la propiedad en un color verde (indicador de precio). */}
              <p style={{ color: '#a1a1a1' }}>{property.address}</p>
              {/* Muestra la dirección de la propiedad en gris claro. */}
            </IonLabel>

            {/* Botones de Editar y Eliminar */}
            <IonButton slot="end" color="warning" onClick={() => setSelectedProperty(property)} style={{ marginRight: '8px' }}>
              <IonIcon icon={pencilOutline} />
              {/* Botón de color amarillo para editar la propiedad. Al hacer clic, selecciona la propiedad para edición. */}
            </IonButton>

            <IonButton slot="end" color="danger" onClick={() => handleDelete(property.id)}>
              <IonIcon icon={trashOutline} />
              {/* Botón de color rojo para eliminar la propiedad. Llama a la función `handleDelete` con el ID de la propiedad. */}
            </IonButton>
          </IonItem>
        ))}
      </IonList>

      {/* Modal para editar la propiedad seleccionada */}
      {selectedProperty && (
        <EditarPropiedad
          property={selectedProperty}
          onSave={(updatedProperty) => {
            onEdit(updatedProperty);
            setSelectedProperty(null);
            // Al guardar los cambios de la propiedad editada, se actualiza la lista y se cierra el modal.
          }}
          onClose={() => setSelectedProperty(null)}
          // Cierra el modal al hacer clic en cancelar.
        />
      )}
    </>
  );
};

export default VerPropiedades;
// Exporta el componente `VerPropiedades` para su uso en otros componentes o archivos.
