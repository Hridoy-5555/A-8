import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  const location = useLocation();

  if (!user) {
    // Redirect to login but save the current location to return later
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}