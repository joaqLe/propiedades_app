import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonButton, IonIcon, IonThumbnail, IonImg } from '@ionic/react';
import { trashOutline, pencilOutline } from 'ionicons/icons';
import EditarPropiedad from './EditarPropiedad';
import '../components/verpropiedades.css'
interface VerPropiedadesProps {
  properties: any[];
  onDelete: (id: number) => void;
  onEdit: (updatedProperty: any) => void;
}

const VerPropiedades: React.FC<VerPropiedadesProps> = ({ properties, onDelete, onEdit }) => {
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <>
      <IonList style={{ backgroundColor: '#1e1e1e' }}>
        {properties.map((property) => (
          <IonItem key={property.id} style={{ margin: '10px 0', borderRadius: '10px', backgroundColor: '#333' }}>
            {/* Miniatura de la imagen de la propiedad */}
            {property.images && property.images.length > 0 && (
              <IonThumbnail slot="start">
                <IonImg src={property.images[0]} style={{ borderRadius: '10px' }} />
              </IonThumbnail>
            )}
            <IonLabel style={{ color: '#ffffff' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{property.name}</h2>
              <p style={{ color: '#a1a1a1' }}>{property.description}</p>
              <p style={{ color: '#4caf50' }}>{property.price}</p>
              <p style={{ color: '#a1a1a1' }}>{property.address}</p>
            </IonLabel>

            {/* Botones de Editar y Eliminar */}
            <IonButton slot="end" color="warning" onClick={() => setSelectedProperty(property)} style={{ marginRight: '8px' }}>
              <IonIcon icon={pencilOutline} />
            </IonButton>
            <IonButton slot="end" color="danger" onClick={() => handleDelete(property.id)}>
              <IonIcon icon={trashOutline} />
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
          }}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
};

export default VerPropiedades;
