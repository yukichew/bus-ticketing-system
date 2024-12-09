import React, { createContext, useState, useEffect, useContext } from 'react';
import Loader from '../components/common/Loader';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        setAuth(null);
      } else {
        setAuth({ token, role });
      }
    } catch (error) {
      console.error('Invalid token:', error);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      setAuth(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
