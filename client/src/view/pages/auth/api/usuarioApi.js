import api from '@api';

export const loginRequest = async (email, senha) => {
  const response = await api.post("/auth/login/", {email, senha} );
  
  return response;
};