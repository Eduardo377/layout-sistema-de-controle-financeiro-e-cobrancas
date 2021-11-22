import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutPadrao from "../layouts/Padrao";

import Home from "../pages/Home";
import Clientes from "../pages/Clientes";
import Cobrancas from "../pages/Cobrancas";

import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPadrao />}>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/cobrancas" element={<Cobrancas />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
