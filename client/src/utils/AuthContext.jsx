import React, { createContext, useState, useEffect, useContext } from "react";
import Loader from "../components/common/Loader";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const role = sessionStorage.getItem("role");

    if (!token || !refreshToken) {
      const token = sessionStorage.getItem("token");
      const role = sessionStorage.getItem("role");
      if (!token) {
        setLoading(false);
        return;
      }
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      refreshTokenAPI(refreshToken);
    } else {
      setAuth({ token, refreshToken, role });
      setLoading(false);
    }
  }, []);

  const refreshTokenAPI = async (refreshToken) => {
    try {
      const response = await refreshToken(refreshToken);
      const data = await response.json();

      if (response.ok) {
        const newToken = data.Token;
        sessionStorage.setItem("token", newToken);
        setAuth({
          token: newToken,
          refreshToken: sessionStorage.getItem("refreshToken"),
          role: sessionStorage.getItem("role"),
        });
      } else {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("role");
      }
      if (decodedToken.exp < currentTime) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        setAuth(null);
      }
    } catch (error) {
      console.error("Refresh token error:", error);
      console.error("Invalid token:", error);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      setAuth(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
