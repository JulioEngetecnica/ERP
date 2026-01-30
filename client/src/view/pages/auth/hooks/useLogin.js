import { useState } from "react";
import { loginUser } from "../services/authService";

export function useLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await loginUser(form);
    } catch (err) {
      setError("Email ou senha incorretos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    submitLogin,
  };
}
