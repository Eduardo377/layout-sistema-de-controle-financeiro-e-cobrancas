import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "@/contextos/AuthContext";
import LayoutGlobal from "@/layouts/layoutGlobal";
import LayoutClientes from "@/layouts/layoutClientes";
import LayoutCadastro from "@/layouts/layoutCadastro";

import Home from "@/paginas/home";
import Clientes from "@/paginas/clientes";
import Cliente from "@/paginas/clientes/cliente";
import Cobrancas from "@/paginas/cobrancas";
import Login from "@/paginas/login";
import CadastroInicio from "@/paginas/cadastro/inicio";
import CadastroSenha from "@/paginas/cadastro/senha";
import CadastroSucesso from "@/paginas/cadastro/sucesso";
import NotFound from "@/paginas/notfound";
import useAuth from "@/hooks/Autenticação/useAuth";

const RotasProtegidas = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const Rotas = () => {
  const [tituloDaRota, setTituloDaRota] = useState("");

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RotasProtegidas />}>
            <Route element={<LayoutGlobal tituloDaRota={tituloDaRota} />}>
              <Route
                path="/"
                element={<Home setTituloDaRota={setTituloDaRota} />}
              />

              <Route
                element={<LayoutClientes setTituloDaRota={setTituloDaRota} />}
              >
                <Route path="/clientes" element={<Clientes />} />

                <Route path="/clientes/:id" element={<Cliente />} />
              </Route>

              <Route
                path="/cobrancas"
                element={<Cobrancas setTituloDaRota={setTituloDaRota} />}
              />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/cadastro" element={<LayoutCadastro />}>
            <Route path="inicio" element={<CadastroInicio />} />
            <Route path="senha" element={<CadastroSenha />} />
            <Route path="sucesso" element={<CadastroSucesso />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Rotas;
