import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => (
  <IonHeader>
    <IonToolbar>
      <IonTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Bienvenido {userName}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
