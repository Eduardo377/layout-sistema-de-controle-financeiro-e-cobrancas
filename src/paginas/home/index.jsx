import { useEffect } from "react";
import CardCobrancas from "./CardCobrancas";

import estilos from "./estilos.module.css";

import cobrancaVerde from "../../assets/icones/cobranca-verde.svg";
import cobrancaVermelha from "../../assets/icones/cobranca-vermelha.svg";
import cobrancaAmarela from "../../assets/icones/cobranca-amarela.svg";

const dados = [
  {
    cliente: "Sara Silva",
    id_cobranca: "223456187",
    valor: 100000,
  },
  {
    cliente: "Carlos Prado",
    id_cobranca: "223456287",
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

const Home = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("Resumo das cobranças");
  }, []);

  return (
    <>
      <section className={`flex gap-2 ${estilos.resumosSecao}`}>
        <div className={`${estilos.cardResumo} bg-verde-claro`}>
          <img src={cobrancaVerde} alt="" />
          <div className="flex-column items-center flex-1">
            <span className={`${estilos.cardResumoNome}`}>Cobranças Pagas</span>
            <span className={`${estilos.cardResumoValor}`}>R$ 30.000</span>
          </div>
        </div>

        <div className={`${estilos.cardResumo} bg-vermelho-claro`}>
          <img src={cobrancaVermelha} alt="" />
          <div className="flex-column items-center flex-1">
            <span className={`${estilos.cardResumoNome}`}>
              Cobranças Vencidas
            </span>
            <span className={`${estilos.cardResumoValor}`}>R$ 7.000</span>
          </div>
        </div>

        <div className={`${estilos.cardResumo} bg-amarelo-claro`}>
          <img src={cobrancaAmarela} alt="" />
          <div className="flex-column items-center flex-1">
            <span className={`${estilos.cardResumoNome}`}>
              Cobranças Previstas
            </span>
            <span className={`${estilos.cardResumoValor}`}>R$ 10.000</span>
          </div>
        </div>
      </section>

      <section className={`flex gap-2 ${estilos.cobrancasSecao}`}>
        <CardCobrancas
          nome="Cobranças Pagas"
          total={10}
          cor="verde"
          lista={dados}
        ></CardCobrancas>

        <CardCobrancas
          nome="Cobranças Vencidas"
          total={10}
          cor="vermelho"
          lista={dados}
        ></CardCobrancas>

        <CardCobrancas
          nome="Cobranças Previstas"
          total={10}
          cor="amarelo"
          lista={dados}
        ></CardCobrancas>
      </section>
    </>
  );
};

export default Home;
