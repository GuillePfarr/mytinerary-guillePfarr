import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    // guarda la ruta a la que querías entrar, para volver después del login si querés
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
