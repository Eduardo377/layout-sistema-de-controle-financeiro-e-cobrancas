import { useLocalStorage } from "react-use";
import { useState } from "react";
import useRequests from "../Requisições/useRequests";

const useAuthProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [etapaCadastro, setEtapaCadastro] = useState(1);
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: "",
    email: "",
  });
  const { login } = useRequests();

  const logar = async (dados, callback) => {
    const novoToken = await login(dados);
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
