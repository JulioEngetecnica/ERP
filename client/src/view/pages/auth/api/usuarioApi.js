import api from '@api';

export const loginRequest = async (email, senha) => {
  const response = await api.post("/usuario/login/", {email, senha} );
  
  return response;
};