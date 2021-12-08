import notify from "@/constantes/notify";
import fetcher from "@/constantes/fetcher";

async function buscaClientes() {
  try {
    const response = await fetcher("clientes");

    const data = await response.json();

    return data;
  } catch (error) {
    notify.erro(error.message).showToast();
  }
}

export default buscaClientes;
