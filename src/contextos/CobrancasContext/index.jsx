import React from "react";
import fetcher from "@/constantes/fetcher";
import notify from "@/constantes/notify";
import { Outlet } from "react-router";

const CobrancasContext = React.createContext([]);

const CobrancasContextProvider = () => {
  const [cobrancas, setCobrancas] = React.useState([]);
  const [loadingCobrancas, setLoadingCobrancas] = React.useState(true);
  const [sucessoExclusao, setSucessoExclusao] = React.useState(false);
  const [cobrancasCLiente, setCobrancasCLiente] = React.useState([]);
  const [loadingCobrancasCLiente, setLoadingCobrancasCLiente] =
    React.useState(true);

  React.useEffect(() => {
    (async function () {
      try {

        const data = await buscaCobrancas();
const dataSort = data.sort((a, b) => a.id - b.id)

        setCobrancas(dataSort);

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
        setSucessoExclusao,
        sucessoExclusao,
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
