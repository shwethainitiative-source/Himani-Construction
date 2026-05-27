import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabaseService } from '../utils/supabaseService';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await supabaseService.getSession();
        setIsAuthenticated(!!session);
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();

    // Listen for auth changes
    const subscription = supabaseService.onAuthChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#371A10',
        color: '#FFCB96',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '1.1rem',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{
          border: '4px solid rgba(255, 203, 150, 0.1)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          borderLeftColor: '#FFCB96',
          animation: 'spin 1s linear infinite'
        }}></div>
        <span>Verifying Admin Session Security...</span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
