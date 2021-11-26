import useAuth from "../Autenticação/useAuth";

const useRequests = () => {
  const { token } = useAuth();

  const buscarEmail = async (body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BASE}/email`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados.message);
      }

      return response.ok;
    } catch (error) {
      window.alert(error);
    }
  };

  const cadastrarUsuario = async (body) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/usuarios`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const dados = await response.json();
      if (!response.ok) {
        throw new Error(dados.message);
      }
      return response.ok;
    } catch (error) {
      window.alert(error);
    }
  };

  const login = async (body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados);
      }

      return dados;
    } catch (error) {
      window.alert(error.message);
    }
  };

  return {
    buscarEmail,
    cadastrarUsuario,
    login,
  };
};

export default useRequests;
