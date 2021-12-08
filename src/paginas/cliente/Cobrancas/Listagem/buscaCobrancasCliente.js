import notify from "constantes/notify";
import fetcher from "constantes/fetcher";

const buscaCobrancasCliente = async (clienteID) => {
  try {
    const response = await fetcher(`cobrancas/${clienteID}`);

    const reponseData = await response.json();

    return reponseData;
  } catch (error) {
    notify.erro(error.message);
  }
};

export default buscaCobrancasCliente;
