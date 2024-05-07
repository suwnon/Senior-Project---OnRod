import { create } from "zustand";

type User = {
  Id?: number;
  username: string;
  email: string;
  phone: string;
  role: string | null;
  token: string;
};

type UserState = {
  user: User;
  setUser: (user: User) => void;
};

export const useGetUser = create<UserState>((set) => ({
  user: {
    id: 0,
    username: "",
    email: "",
    phone: "",
    role: null,
    token: "",
  },
  setUser: (user: User) => set({ user }),
}));

import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};
function getSessionStorageOrDefault(key: string, defaultValue: boolean) {
  const stored = sessionStorage.getItem(key);

  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    Id: 0,
    username: "",
    email: "",
    phone: "",
    role: null,
    token: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = getSessionStorageOrDefault("user", false);
    setUser(storedUser);
    setIsAuthenticated(!!storedUser);
  }, []);
  const login = (newUser: User) => {
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser({
      Id: 0,
      username: "",
      email: "",
      phone: "",
      role: null,
      token: "",
    });
    setIsAuthenticated(false);
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
