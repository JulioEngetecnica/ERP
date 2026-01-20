import Login from "./view/pages/auth/login.jsx";
import Home from "./view/pages/home/home";
import Sidebar from "./view/components/sidebar";
import CriarServico from "./view/pages/cadastro/servico/create.jsx";
import Servicos from "./view/pages/cadastro/servico";

import PrivateRoute from '@/context/auth/PrivateRoute';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



function App() {
  // return <LoginForm />;
  return (
     <BrowserRouter>
      <Routes>
        
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Navigate to="/painel" replace />} />
            <Route path="painel" element={<Home />} /> {/* /dashboard */}
            <Route path="servicos" element={<Servicos />} /> 
            <Route path="servicos/novo" element={<CriarServico />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
