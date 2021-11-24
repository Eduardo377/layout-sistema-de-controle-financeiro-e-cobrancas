import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LayoutPadrao from "../layout/Padrao";

import Home from "../paginas/home";
import Clientes from "../paginas/clientes";
import Cobrancas from "../paginas/cobrancas";
import Login from "../paginas/login";
import Cadastro from "../paginas/cadastro";
import Inicio from "../paginas/cadastro/inicio";
import Senha from "../paginas/cadastro/senha";
import Sucesso from "../paginas/cadastro/sucesso";

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

        <Route path="/cadastro" element={<Cadastro />}>
          <Route path="inicio" element={<Inicio />} />
          <Route path="senha" element={<Senha />} />
          <Route path="sucesso" element={<Sucesso />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
