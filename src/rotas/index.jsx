import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutPadrao from "../layout/Padrao";

import Home from "../paginas/home";
import Clientes from "../paginas/clientes";
import Cobrancas from "../paginas/cobrancas";
import Login from "../paginas/login";
import LayoutCadastro from "../layout/layoutCadastro";
import CadastroInicio from "../paginas/cadastro/inicio";
import CadastroSenha from "../paginas/cadastro/senha";
import CadastroSucesso from "../paginas/cadastro/sucesso";
import NotFound from "../paginas/notfound";

const Rotas = () => {
  const [tituloDaRota, setTituloDaRota] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPadrao tituloDaRota={tituloDaRota} />}>
          <Route
            path="/"
            element={<Home setTituloDaRota={setTituloDaRota} />}
          />

          <Route
            path="/clientes"
            element={<Clientes setTituloDaRota={setTituloDaRota} />}
          />

          <Route
            path="/cobrancas"
            element={<Cobrancas setTituloDaRota={setTituloDaRota} />}
          />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<LayoutCadastro />}>
          <Route path="inicio" element={<CadastroInicio />} />
          <Route path="senha" element={<CadastroSenha />} />
          <Route path="sucesso" element={<CadastroSucesso />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
