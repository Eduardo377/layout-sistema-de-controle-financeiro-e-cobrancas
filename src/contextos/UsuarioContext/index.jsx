import React from "react";
import fetcher from "constantes/fetcher";
import notify from "constantes/notify";

import { useNavigate } from "react-router";
import useAuth from "@/hooks/Autenticação/useAuth";

const UsuarioContext = React.createContext([]);

const UsuarioContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { deslogar } = useAuth();
  const [usuario, setUsuario] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const buscaUsuario = async () => {
      try {
        const response = await fetcher("usuarios");

        const responseData = await response.json();

        if (!response.ok) {
          throw responseData;
        }

        setUsuario(responseData);
      } catch (error) {
        if (error.message === "jwt expired") {
          return deslogar(() => navigate("/login"));
        }

        notify.erro(error.message);
      }
    };

    buscaUsuario();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, loading, setLoading }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioContext;
export { UsuarioContextProvider };
