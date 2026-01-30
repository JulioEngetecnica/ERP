import api from "@api";

export default async function Logout(){
    await api.get("/auth/logout");
    localStorage.clear();
} 
