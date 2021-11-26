import { useLocalStorage } from "react-use";
import { useState } from "react";

const useAuthProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage("token", "logado");
  const [etapaCadastro, setEtapaCadastro] = useState(1);
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: "",
    email: "",
  });

  const logar = (callback, novoToken) => {
    setToken(novoToken);
    callback();
  };

  const deslogar = (callback) => {
    removeToken();
    callback();
  };

  return {
    token,
    setToken,
    logar,
    deslogar,
    etapaCadastro,
    setEtapaCadastro,
    dadosCadastro,
    setDadosCadastro,
  };
};

export default useAuthProvider;
