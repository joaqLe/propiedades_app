import React, { createContext, useState, ReactNode, useContext } from 'react';

// Definir el tipo para el contexto de la ubicación
interface LocationContextType {
  address: string;
  setAddress: (address: string) => void;
}

// Crear el contexto con un valor predeterminado
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Proveedor del contexto para envolver la aplicación
export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string>('Ingresa tu ubicación...');

  return (
    <LocationContext.Provider value={{ address, setAddress }}>
      {children}
    </LocationContext.Provider>
  );
};

// Hook para usar el contexto de la ubicación en componentes funcionales
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation debe ser usado dentro de un LocationProvider');
  }
  return context;
};
