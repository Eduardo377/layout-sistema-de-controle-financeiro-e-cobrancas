import React from "react";
import fetcher from "constantes/fetcher";
import notify from "constantes/notify";
import { Outlet } from "react-router";

const ClientesContext = React.createContext([]);

const ClientesContextProvider = () => {
  const [clientes, setClientes] = React.useState([]);
  const [loadingClientes, setLoadingClientes] = React.useState(true);

  const [cliente, setCliente] = React.useState({});
  const [loadingCliente, setLoadingCliente] = React.useState(true);

  React.useEffect(() => {
    (async function () {
      try {
        setClientes(await buscaClientes());

        setLoadingClientes(false);
      } catch (error) {
        setLoadingClientes(false);
      }
    })();
  }, [cliente]);

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        setClientes,
        loadingClientes,
        setLoadingClientes,
        cliente,
        setCliente,
        loadingCliente,
        setLoadingCliente,
      }}
    >
      <Outlet />
    </ClientesContext.Provider>
  );
};

async function buscaClientes() {
  try {
    const response = await fetcher("clientes");

    const data = await response.json();

    return data;
  } catch (error) {
    notify.erro(error.message).showToast();
  }
}

export default ClientesContext;
export { ClientesContextProvider };
