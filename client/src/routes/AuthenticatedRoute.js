import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthenticatedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    toast.error("You do not have permission to access this page.", {
      position: toast.POSITION.TOP_CENTER,
    });
    return <Navigate to='/' replace />;
  }
  return children;
};

export default AuthenticatedRoute;
