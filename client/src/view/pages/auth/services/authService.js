import { loginRequest } from "../api/usuarioApi";

export const loginUser = async ({ email, senha }) => {
  try {
    const data = await loginRequest(email, senha);

    if (!data.user) {
      throw new Error("Erro no Login");
    }

    // Salva token
    localStorage.setItem("user", data.user);

    
    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
