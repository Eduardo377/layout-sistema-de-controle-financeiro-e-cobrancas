import cobrancaAmarela from "@/assets/icones/cobranca-amarela.svg";
import cobrancaVerde from "@/assets/icones/cobranca-verde.svg";
import cobrancaVermelha from "@/assets/icones/cobranca-vermelha.svg";
import CobrancasContext from "contextos/CobrancasContext";
import { useContext, useEffect, useState } from "react";
import CardClientes from "./CardClientes";
import CardCobrancas from "./CardCobrancas";
import estilos from "./estilos.module.css";
import fetcher from "constantes/fetcher";
import notify from "constantes/notify";

const Home = ({ setTituloDaRota }) => {
  const { cobrancas, setCobrancas } = useContext(CobrancasContext);
  const [totalPagas, setTotalPagas] = useState([]);
  const [totalVencidas, setTotalVencidas] = useState([]);
  const [totalPendentes, setTotalPendentes] = useState([]);

  useEffect(() => {
    console.log(cobrancas);
    const cobrancasPagas = cobrancas.filter((item) => item.paga);
    const cobrancasVencidas = cobrancas.filter(
      (item) => item.status.toLowerCase() === "vencida"
    );
    const cobrancasPendentes = cobrancas.filter(
      (item) => item.status.toLowerCase() === "pendente"
    );

    setTotalPagas(reducerValores(cobrancasPagas));
    setTotalVencidas(reducerValores(cobrancasVencidas));
    setTotalPendentes(reducerValores(cobrancasPendentes));
  }, [cobrancas]);

  useEffect(() => {
    setTituloDaRota("Resumo das cobranças");

    async function buscaCobrancas() {
      try {
        const response = await fetcher("cobrancas");

        const data = await response.json();

        setCobrancas(data);
      } catch (error) {
        notify.erro(error.message);
      }
    }

    buscaCobrancas();
  }, []);

  const formataValorMoeda = (valor) => {
    return (valor / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const reducerValores = (arr) => {
    if (arr.length === 0) {
      return 0;
    }

    const valores = arr.map((item) => Number(item.valor));
    const total = valores.reduce((acc, cur) => acc + cur);

    return total;
  };

  return (
    <>
      <section className={`flex gap-2 ${estilos.resumosSecao}`}>
        <div className={`${estilos.cardResumo} bg-verde-claro`}>
          <img src={cobrancaVerde} alt="" />
          <div className="flex-column items-center flex-1">
            <span className={`${estilos.cardResumoNome}`}>Cobranças Pagas</span>
            <span className={`${estilos.cardResumoValor}`}>
              {formataValorMoeda(totalPagas)}
            </span>
          </div>
        </div>

        <div className={`${estilos.cardResumo} bg-vermelho-claro`}>
          <img src={cobrancaVermelha} alt="" />
          <div className="flex-column items-center flex-1">
            <span className={`${estilos.cardResumoNome}`}>
              Cobranças Vencidas
            </span>
            <span className={`${estilos.cardResumoValor}`}>
              {formataValorMoeda(totalVencidas)}
            </span>
          </div>
        </div>

        <div className={`${estilos.cardResumo} bg-amarelo-claro`}>
          <img src={cobrancaAmarela} alt="" />
          <div className="flex-column items-center flex-1">
            <span className={`${estilos.cardResumoNome}`}>
              Cobranças Previstas
            </span>
            <span className={`${estilos.cardResumoValor}`}>
              {formataValorMoeda(totalPendentes)}
            </span>
          </div>
        </div>
      </section>

      <section className={`flex gap-2 ${estilos.cobrancasSecao}`}>
        <CardCobrancas status="paga"></CardCobrancas>

        <CardCobrancas status="vencida"></CardCobrancas>

        <CardCobrancas status="pendente"></CardCobrancas>
      </section>

      <section className={`flex gap-2 ${estilos.clientesSecao}`}>
        <CardClientes
          nome={`Clientes em dia`}
          cor="verde"
          status={false}
        ></CardClientes>

        <CardClientes
          nome={`Clientes inadimplentes`}
          cor="vermelho"
          status={true}
        ></CardClientes>
      </section>
    </>
  );
};

export default Home;
