import { useEffect, useState, useContext } from "react";
import CardCobrancas from "./CardCobrancas";
import CardClientes from "./CardClientes";

import estilos from "./estilos.module.css";

import cobrancaVerde from "@/assets/icones/cobranca-verde.svg";
import cobrancaVermelha from "@/assets/icones/cobranca-vermelha.svg";
import cobrancaAmarela from "@/assets/icones/cobranca-amarela.svg";
import CobrancasContext from "contextos/CobrancasContext";

const dadosCobrancas = [
  {
    cliente: "Sara Silva",
    id_cobranca: "223456387",
    valor: 100000,
  },
  {
    cliente: "Carlos Prado",
    id_cobranca: "223456387",
    valor: 40000,
  },
  {
    cliente: "Lara Brito",
    id_cobranca: "223456387",
    valor: 90000,
  },
  {
    cliente: "Soraia nexes",
    id_cobranca: "223456487",
    valor: 70000,
  },
];

const dadosClientes = [
  {
    cliente: "Sara Silva",
    data: "03/02/2021",
    valor: 50000,
  },
  {
    cliente: "Carlos Prado",
    data: "03/02/2021",
    valor: 50000,
  },
  {
    cliente: "Lara Brito",
    data: "03/02/2021",
    valor: 50000,
  },
  {
    cliente: "Soraia nexes",
    data: "03/02/2021",
    valor: 50000,
  },
];

const Home = ({ setTituloDaRota }) => {
  const { cobrancas } = useContext(CobrancasContext);
  const [totalPagas, setTotalPagas] = useState([]);
  const [totalVencidas, setTotalVencidas] = useState([]);
  const [totalPendentes, setTotalPendentes] = useState([]);

  useEffect(() => {
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
          lista={dadosClientes}
          nome={`Clientes em dia`}
          cor="verde"
          total="08"
          status={false}
        ></CardClientes>

        <CardClientes
          lista={dadosClientes}
          nome={`Clientes inadimplentes`}
          total="08"
          cor="vermelho"
          status={true}
        ></CardClientes>
      </section>
    </>
  );
};

export default Home;
