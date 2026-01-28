import { loginRequest } from "../api/usuarioApi";

export const loginUser = async ({ email, senha }) => {
  try {

  await loginRequest(email, senha);

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
