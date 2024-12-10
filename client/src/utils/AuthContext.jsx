import React, { createContext, useState, useEffect, useContext } from 'react';
import Loader from '../components/common/Loader';
import { jwtDecode } from 'jwt-decode';
import { refreshTokenApi } from '../api/auth';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        const data = await refreshTokenApi(refreshToken);
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
        setAuth({
          token: data.accessToken,
          role: sessionStorage.getItem('role'),
        });
      } catch (err) {
        setAuth(null);
        sessionStorage.clear();
      }
    };

    const token = sessionStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      refreshToken().finally(() => setLoading(false));
      return;
    }

    setAuth({ token, role: sessionStorage.getItem('role') });
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
