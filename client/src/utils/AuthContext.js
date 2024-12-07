import React, { createContext, useState, useEffect, useContext } from "react";
import { getUserProfile } from "../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return;
    }

    const fetchUserProfile = async () => {
      const profile = await getUserProfile(token);
      if (profile) {
        setUser(profile);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
