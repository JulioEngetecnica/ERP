import LoginForm from "./view/pages/usuario/login/login.jsx";
import Home from "./view/pages/home/Home";
import Sidebar from "./view/components/sidebar";
import ProductShow from "./view/pages/cadastro/produtos/create.jsx";
import ProductForm from "./view/pages/cadastro/produtos";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  // return <LoginForm />;
  return (
    <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path="/produtos" element={<ProductForm />} />
        <Route path="/produtos/novo" element={<ProductShow />} />
        <Route path="/produtos/editar" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
