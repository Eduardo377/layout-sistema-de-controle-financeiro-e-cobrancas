import fetcher from "@/constantes/fetcher";
import notify from "@/constantes/notify";

async function buscaCliente(id) {
  try {
    const response = await fetcher(`clientes/${id}`);

    const data = await response.json();

    return data;
  } catch (error) {
    notify.erro(error.message).showToast();
  }
}

export default buscaCliente;
