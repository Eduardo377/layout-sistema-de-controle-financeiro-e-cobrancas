import { useLocalStorage } from "react-use";
import { useState } from "react";
import useRequests from "../Requisições/useRequests";
import jwt from "jsonwebtoken";

const useAuthProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [etapaCadastro, setEtapaCadastro] = useState(1);
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: "",
    email: "",
  });
  const { login } = useRequests();

  const verificarToken = (token) => {
    try {
      jwt.verify(token, process.env.REACT_APP_SENHA_JWT);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logar = async (dados, callback) => {
    const response = await login(dados);
    if (!response.token) return { response, ok: false };
    setToken(response.token);
    callback();
    return { ok: true };
  };

  const deslogar = (callback) => {
    callback();
    removeToken();
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
    verificarToken,
    removeToken,
  };
};

export default useAuthProvider;
