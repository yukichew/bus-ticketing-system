import React, { createContext, useState, useEffect, useContext } from 'react';
import Loader from '../components/common/Loader';

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
    setAuth({ token, role });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
