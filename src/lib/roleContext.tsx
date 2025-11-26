'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'farmer' | 'buyer' | 'government' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clearRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('echarak_user_role') as UserRole;
    if (savedRole) {
      setRoleState(savedRole);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole) {
      localStorage.setItem('echarak_user_role', newRole);
    }
  };

  const clearRole = () => {
    setRoleState(null);
    localStorage.removeItem('echarak_user_role');
  };

  return (
    <RoleContext.Provider value={{ role, setRole, clearRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within RoleProvider');
  }
  return context;
}
