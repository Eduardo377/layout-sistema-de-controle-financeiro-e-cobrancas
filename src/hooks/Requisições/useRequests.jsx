import useAuth from "../Autenticação/useAuth";

const useRequests = () => {
  const { token } = useAuth();

  const post = async (rota, body) => {

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/${rota}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
        }
      );

      const dados = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      return dados;
    } catch (error) {
      window.alert(error.message);
    }
  };

  return { post };
};

export default useRequests;
