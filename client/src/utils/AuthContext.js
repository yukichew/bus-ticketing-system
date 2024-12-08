import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../api/auth';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      const profile = await getUserProfile(token);
      if (profile) {
        setAuth(profile);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
