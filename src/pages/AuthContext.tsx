import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Importa tu configuración de Firebase

// Define la interfaz del contexto de autenticación
interface AuthContextType {
  currentUser: User | null;
}

// Define la interfaz de las props del proveedor de contexto
interface AuthProviderProps {
  children: ReactNode; // Permite que se pasen elementos secundarios al componente
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el proveedor del contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Observa los cambios en el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Limpia el observador al desmontar el componente
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
