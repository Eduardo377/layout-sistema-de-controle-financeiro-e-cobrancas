import React from "react";
import fetcher from "@/constantes/fetcher";
import notify from "@/constantes/notify";
import { Outlet } from "react-router";

const CobrancasContext = React.createContext([]);

const CobrancasContextProvider = () => {
  const [cobrancas, setCobrancas] = React.useState([]);
  const [loadingCobrancas, setLoadingCobrancas] = React.useState(true);

  const [cobrancasCLiente, setCobrancasCLiente] = React.useState([]);
  const [loadingCobrancasCLiente, setLoadingCobrancasCLiente] =
    React.useState(true);

  React.useEffect(() => {
    (async function () {
      try {
        setCobrancas(await buscaCobrancas());
        setLoadingCobrancas(false);
      } catch (error) {
        setLoadingCobrancas(false);
      }
    })();
  }, [cobrancasCLiente]);

  return (
    <CobrancasContext.Provider
      value={{
        cobrancas,
        setCobrancas,
        loadingCobrancas,
        setLoadingCobrancas,
        cobrancasCLiente,
        setCobrancasCLiente,
        loadingCobrancasCLiente,
        setLoadingCobrancasCLiente,
      }}
    >
      <Outlet />
    </CobrancasContext.Provider>
  );
};

async function buscaCobrancas() {
  try {
    const response = await fetcher("cobrancas");

    const data = await response.json();

    return data;
  } catch (error) {
    notify.erro(error.message);
  }
}

export default CobrancasContext;
export { CobrancasContextProvider };
