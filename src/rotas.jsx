import { AuthProvider } from "@/contextos/AuthContext";
import { ClientesContextProvider } from "@/contextos/ClientesContext";
import { CobrancasContextProvider } from "contextos/CobrancasContext";
import useAuth from "@/hooks/Autenticação/useAuth";
import LayoutCadastro from "@/layouts/layoutCadastro";
import LayoutClientes from "@/layouts/layoutClientes";
import LayoutGlobal from "@/layouts/layoutGlobal";
import CadastroInicio from "@/paginas/cadastro/inicio";
import CadastroSenha from "@/paginas/cadastro/senha";
import CadastroSucesso from "@/paginas/cadastro/sucesso";
import Cliente from "@/paginas/cliente";
import Clientes from "@/paginas/clientes";
import Cobrancas from "@/paginas/cobrancas";
import Home from "@/paginas/home";
import Login from "@/paginas/login";
import NotFound from "@/paginas/notfound";
import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

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
            <Route element={<ClientesContextProvider />}>
              <Route element={<CobrancasContextProvider />}>
                <Route element={<LayoutGlobal tituloDaRota={tituloDaRota} />}>
                  <Route
                    path="/"
                    element={<Home setTituloDaRota={setTituloDaRota} />}
                  />

                  <Route
                    element={
                      <LayoutClientes setTituloDaRota={setTituloDaRota} />
                    }
                  >
                    <Route
                      path="/clientes"
                      element={<Clientes setTituloDaRota={setTituloDaRota} />}
                    />

                    <Route path="/clientes/:id" element={<Cliente />} />
                  </Route>

                  <Route
                    path="/cobrancas"
                    element={<Cobrancas setTituloDaRota={setTituloDaRota} />}
                  />
                </Route>
              </Route>
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
