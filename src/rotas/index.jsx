import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutPadrao from "../layout/Padrao";

import Home from "../paginas/home";
import Clientes from "../paginas/clientes";
import Cobrancas from "../paginas/cobrancas";
import Login from "../paginas/login";
import Cadastro from "../paginas/cadastro";

const Rotas = () => {
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

export default Rotas;
