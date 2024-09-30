import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import { addCircleOutline, listOutline, chevronUpOutline, chevronDownOutline, pencilOutline, trashOutline } from 'ionicons/icons';
import PublicarPropiedad from '../components/PublicarPropiedad';
import EditarPropiedad from '../components/EditarPropiedad';

const Dashboard: React.FC = () => {
  const [publishedProperties, setPublishedProperties] = useState<any[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);

  const handlePublish = (property: any) => {
    setPublishedProperties([...publishedProperties, property]);
  };

  const handleDelete = (id: number) => {
    setPublishedProperties(publishedProperties.filter((property) => property.id !== id));
  };

  const handleEditProperty = (property: any) => {
    setSelectedProperty(property);
  };

  const handleSaveProperty = (updatedProperty: any) => {
    setPublishedProperties(
      publishedProperties.map((property) => (property.id === updatedProperty.id ? updatedProperty : property))
    );
    setSelectedProperty(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ textAlign: 'center', fontWeight: 'bold', color: '' }}>bienvenido Usuario123</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ backgroundColor: '#1e1e1e' }}>
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <IonButton onClick={() => setIsPublishing(true)} style={{ marginRight: '10px', borderRadius: '15px', backgroundColor: '#007bff', color: '#ffffff' }}>
            <IonIcon icon={addCircleOutline} slot="start" />
            Publicar Propiedad
          </IonButton>

          <IonButton onClick={() => setIsViewing(!isViewing)} style={{ borderRadius: '15px', backgroundColor: '#4caf50', color: '#ffffff' }}>
            <IonIcon icon={listOutline} slot="start" />
            {isViewing ? 'Ocultar Propiedades' : 'Ver Propiedades'}
            <IonIcon icon={isViewing ? chevronUpOutline : chevronDownOutline} slot="end" />
          </IonButton>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard style={{ boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: '15px' }}>
                <IonCardHeader>
                  <IonCardSubtitle style={{ color: '#a1a1a1' }}>Propiedades Publicadas</IonCardSubtitle>
                  <IonCardTitle style={{ color: '#007bff', fontSize: '2rem' }}>{publishedProperties.length}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonIcon icon={addCircleOutline} size="large" style={{ color: '#007bff' }} />
                </IonCardContent>
              </IonCard>
            </IonCol>

            <IonCol size="6">
              <IonCard style={{ boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', borderRadius: '15px' }}>
                <IonCardHeader>
                  <IonCardSubtitle style={{ color: '#a1a1a1' }}>Propiedades Vendidas</IonCardSubtitle>
                  <IonCardTitle style={{ color: '#28a745', fontSize: '2rem' }}>75</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonIcon icon={chevronUpOutline} size="large" style={{ color: '#28a745' }} />
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {isViewing && (
          <IonList style={{ backgroundColor: '#1e1e1e', borderRadius: '15px' }}>
            {publishedProperties.length === 0 ? (
              <IonItem style={{ color: '#a1a1a1', backgroundColor: '#333', borderRadius: '10px', margin: '10px' }}>
                <IonLabel>No hay propiedades publicadas aún.</IonLabel>
              </IonItem>
            ) : (
              publishedProperties.map((property) => (
                <IonItem key={property.id} style={{ backgroundColor: '#333', margin: '10px', borderRadius: '10px' }}>
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

                  <IonButton slot="end" color="warning" onClick={() => handleEditProperty(property)} style={{ marginRight: '8px' }}>
                    <IonIcon icon={pencilOutline} />
                  </IonButton>

                  <IonButton slot="end" color="danger" onClick={() => handleDelete(property.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonItem>
              ))
            )}
          </IonList>
        )}

        <PublicarPropiedad onPublish={handlePublish} isOpen={isPublishing} onClose={() => setIsPublishing(false)} />
        {selectedProperty && <EditarPropiedad property={selectedProperty} onSave={handleSaveProperty} onClose={() => setSelectedProperty(null)} />}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
