// src/auth/AuthRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@api";
import CircularProgress from "@mui/material/CircularProgress";

export default function AuthRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        await api.get("/auth/me"); // 👈 passa pelo authMiddleware
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
