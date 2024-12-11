import React, { createContext, useState, useEffect, useContext } from 'react';
import Loader from '../components/common/Loader';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          handleLogout();
          return;
        }

        setAuth({ token, role: sessionStorage.getItem('role') });
      } catch (err) {
        handleLogout();
      }

      setLoading(false);
    };

    const handleLogout = () => {
      setAuth(null);
      sessionStorage.clear();
      alert('Your session has expired. Please log in again.');
    };

    checkTokenValidity();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
