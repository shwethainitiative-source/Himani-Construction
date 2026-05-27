import React from 'react';
import { Navigate } from 'react-router-dom';
import { db } from '../utils/db';

const ProtectedRoute = ({ children }) => {
  if (!db.isAuthenticated()) {
    // If not authenticated, redirect to login page
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
