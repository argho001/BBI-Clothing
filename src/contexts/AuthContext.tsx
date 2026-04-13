import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, logoutUser, type User } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
    setIsLoading(false);
  }, []);

  const login = (u: User) => setUser(u);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const refreshUser = () => {
    setUser(getCurrentUser());
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
