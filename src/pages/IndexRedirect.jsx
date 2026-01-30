import React from "react";
import { Navigate } from "react-router-dom";

export default function IndexRedirect() {
  const token = localStorage.getItem("token");
  return <Navigate to={token ? "/devices" : "/signin"} replace />;
}
