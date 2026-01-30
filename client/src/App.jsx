import Login from "./view/pages/auth/login.jsx";
import Home from "./view/pages/home/home";
import Sidebar from "./view/components/navBar";
import CriarServico from "./view/pages/cadastro/servico/create.jsx";
import Servicos from "./view/pages/cadastro/servico";
import CriarProduto from "./view/pages/cadastro/produto/create.jsx";
import Produtos from "./view/pages/cadastro/produto";
import AuthRoute from '@/auth/AuthRoute';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



function App() {
  return (
     <BrowserRouter>
      <Routes>
        
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Navigate to="/painel" replace />} />
            <Route path="painel" element={<Home />} /> {/* /dashboard */}
            <Route path="servicos" element={<Servicos />} /> 
            <Route path="servicos/novo" element={<CriarServico />} /> 
            <Route path="produtos" element={<Produtos />} /> 
            <Route path="produtos/novo" element={<CriarProduto />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
