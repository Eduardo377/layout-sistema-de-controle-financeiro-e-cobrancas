import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutPadrao from "../layouts/Padrao";

import Inicio from "../paginas/Inicio";
import Clientes from "../paginas/Clientes";
import Cobrancas from "../paginas/Cobrancas";

import Login from "../paginas/Login";
import Cadastro from "../paginas/Cadastro";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPadrao />}>
          <Route path="/" element={<Inicio />} />
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
