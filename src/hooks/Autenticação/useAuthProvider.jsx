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
    const response = await login(dados);
    if (!response.token) return { response, ok: false };
    setToken(response.token);
    callback();
    return { ok: true };
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
