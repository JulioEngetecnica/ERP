import { loginRequest } from "../api/usuarioApi";

export const loginUser = async ({ email, senha }) => {
  try {
    const response = await loginRequest(email, senha);
    localStorage.setItem("user", JSON.stringify(response.user));
  } catch (error) {
    throw error;
  }
};
