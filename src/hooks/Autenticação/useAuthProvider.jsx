import { useLocalStorage } from "react-use";

const useAuthProvider = () => {
  const [token, setToken, removeToken] = useLocalStorage("token", "logado");

  const logar = (callback) => {
    setToken(true);
    callback();
  };

  const deslogar = (callback) => {
    removeToken();
    callback();
  };

  return {
    token,
    setToken,
    removeToken,
    logar,
    deslogar,
  };
};

export default useAuthProvider;
