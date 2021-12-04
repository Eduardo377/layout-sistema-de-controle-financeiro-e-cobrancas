const useRequests = () => {
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
      const { token } = dados;
      return token;
    } catch (error) {
      window.alert(error);
    }
  };

  const listarCobrancas = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/cobrancas`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dados = await response.json();

      if (!response.ok) {
        throw new Error(dados.message);
      }

      return dados;
    } catch (error) {
      window.alert(error);
    }
  };

  return {
    buscarEmail,
    cadastrarUsuario,
    login,
    listarCobrancas,
  };
};

export default useRequests;
