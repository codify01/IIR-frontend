import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode, JwtPayload} from 'jwt-decode';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded:any = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    

    if (decoded.exp < currentTime) {
      localStorage.removeItem('token')
      return <Navigate to="/login" replace />
    }
  } catch (error) {
    console.error('Invalid token', error)
    return <Navigate to="/login" replace />
  }

  return children;
};

export default ProtectedRoute;
