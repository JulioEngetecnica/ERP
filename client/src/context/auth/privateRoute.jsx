// src/auth/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const user = localStorage.getItem('user');
  
  // Se não houver token, redireciona para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
    
  // Se houver token, renderiza as rotas filhas
  return <Outlet />;
}
