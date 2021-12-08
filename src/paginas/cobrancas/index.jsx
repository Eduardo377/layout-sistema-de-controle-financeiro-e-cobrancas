import { useEffect, useState, useContext } from "react";
import estilos from "./estilos.module.css";
import CobrancasIcone from "@/assets/icones/cobrancas";
import lupaIcone from "@/assets/icones/lupa.svg";
import filtro from "@/assets/icones/filtro.svg";
import ordenar from "@/assets/icones/ordenar.svg";
import editar from "@/assets/icones/editar.svg";
import excluir from "@/assets/icones/excluir.svg";
import useRequests from "../../hooks/Requisições/useRequests";
import { useLocalStorage } from "react-use";

const Cobrancas = ({ setTituloDaRota }) => {
  const [cobrancas, setCobrancas] = useState([]);
  const { listarCobrancas } = useRequests();
  const [token] = useLocalStorage("token");

  useEffect(() => {
    const preencherCobrancas = async () => {
      const lista = await listarCobrancas(token);
      setCobrancas(lista);
    };
    preencherCobrancas();
  }, []);
  useEffect(() => {
    setTituloDaRota("Cobranças");
  }, []);

  const escolherEstiloDeStatus = (status) => {
    if (status === "Paga") return estilos.paga;
    if (status === "Pendente") return estilos.pendente;
    return estilos.vencida;
  };

  return (
    <div>
      <header className={`flex items-center mb-2`}>
        <div className={`flex items-center flex-1 gap-1`}>
          <CobrancasIcone tamanho={2} />
          <h2>Cobrancas</h2>
        </div>

        <div className={`flex  gap-1`}>
          <div className={`${estilos.filtro} flex items-center justify-center`}>
            <img src={filtro} alt="filtrar" />
          </div>
          <div className={`${estilos.inputContainer}`}>
            <input type="text" placeholder="Pesquisa" />
            <img
              src={lupaIcone}
              alt="lupa"
              className={`${estilos.inputIcone}`}
            />
          </div>
        </div>
      </header>

      <main className={`${estilos.main}`}>
        <div className={`${estilos.headerContainer} flex items-center`}>
          <span className={`${estilos.headerItem} flex items-center ordenar`}>
            <img src={ordenar} alt="ordenar" />
            Cliente
          </span>
          <span className={`${estilos.headerItem} flex items-center ordenar`}>
            <img src={ordenar} alt="ordenar" />
            ID Cob.
          </span>
          <span className={`${estilos.headerItem}`}>Valor</span>
          <span className={`${estilos.headerItem}`}>Data de Venc.</span>
          <span className={`${estilos.headerItem}`}>Status</span>
          <span className={`${estilos.headerItem2}`}>Descrição</span>
          <span className={`${estilos.headerItem3}`}></span>
        </div>
        {cobrancas &&
          cobrancas.map((item, index) => {
            return (
              <div
                key={index}
                className={`${estilos.containerItems} flex items-center`}
              >
                <span className={`${estilos.items}`}>{item.nome}</span>
                <span className={`${estilos.items}`}>{item.id}</span>
                <span className={`${estilos.items}`}>
                  {(item.valor / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className={`${estilos.items}`}>
                  {new Date(item.data_vencimento)
                    .toLocaleString("pt-BR", { timeZone: "UTC" })
                    .slice(0, 10)}
                </span>
                <div className={`${estilos.items}`}>
                  <span className={escolherEstiloDeStatus(item.status)}>
                    {`${item.status}`}
                  </span>
                </div>
                <span className={`${estilos.item2}`}>{item.descricao}</span>
                <div className={`flex justify-center gap-2`}>
                  <div
                    className={`${estilos.divIcones} flex-column justify-center items-center`}
                  >
                    <img src={editar} alt="editar" />
                    <span className={`${estilos.span}`}>Editar</span>
                  </div>
                  <div
                    className={`${estilos.divIcones} flex-column justify-center items-center`}
                  >
                    <img src={excluir} alt="excluir" />
                    <span
                      className={`${estilos.span2}`}
                      style={{ color: "#AE1100" }}
                    >
                      Excluir
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Cobrancas;
