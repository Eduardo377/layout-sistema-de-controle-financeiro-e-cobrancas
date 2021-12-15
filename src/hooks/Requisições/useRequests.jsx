import notify from "../../constantes/notify";

const useRequests = () => {
  // const buscaUsuario = async () => {
  //   try {
  //     const response = await fetcher("usuarios");
  //     const responseData = await response.json();

  //     if (!response.ok) {
  //       throw responseData;
  //     }

  //     return responseData;
  //   } catch (error) {
  //     return notify.erro("Sua sessão expirou, faça login novamente!");
  //   }
  // };

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

      return response.status;
    } catch (error) {
      return error.message;
    }
  };

  const detalharCobranca = async (token, id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/cobranca/${id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
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
      return error.message;
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

      return response.status;
    } catch (error) {
      return error.message;
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
      return dados;
    } catch (error) {
      return error.message;
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
      return error.message;
    }
  };

  const excluirUmaCobranca = async (token, id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/cobranca/${id}`,
        {
          method: "DELETE",
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

      dados.erro = false;
      return dados;
    } catch (error) {
      notify.erro(error.message);
      error.erro = true;
      return error;
    }
  };

  return {
    buscarEmail,
    cadastrarUsuario,
    login,
    listarCobrancas,
    excluirUmaCobranca,
    detalharCobranca,
  };
};

export default useRequests;
