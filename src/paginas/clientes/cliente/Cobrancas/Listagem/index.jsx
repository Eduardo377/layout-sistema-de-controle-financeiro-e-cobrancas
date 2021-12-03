import { useState, useEffect } from "react";
import fetcher from "@/constantes/fetcher";
import { useParams } from "react-router";
import estilos from "./estilos.module.css";

import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";
import editarCobrancaIcone from "@/assets/icones/editar.svg";
import excluirCobrancaIcone from "@/assets/icones/excluir.svg";

const Listagem = ({ cliente, setFormCobranca, formCobranca }) => {
  const [cobrancas, setCobrancas] = useState([]);
  const { id: clienteID } = useParams();

  useEffect(() => {
    buscaCobrancas();
  }, []);

  useEffect(() => {
    if (formCobranca) {
      buscaCobrancas();
    }
  }, [formCobranca]);

  async function buscaCobrancas() {
    try {
      const response = await fetcher(`cobrancas/${clienteID}`);

      const responseData = await response.json();

      setCobrancas(responseData);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      {cobrancas && (
        <>
          <div className={`${estilos.listaHeader}`}>
            <span className="flex items-center gap-1">
              <img src={setasOrdenacaoIcone} alt="" />
              ID Cob.
            </span>
            <span className="flex items-center gap-1">
              <img src={setasOrdenacaoIcone} alt="" />
              Data de venc.
            </span>
            <span>Valor</span>
            <span>Status</span>
            <span>Descrição</span>
          </div>

          <div className={`${estilos.listaBody}`}>
            <ul>
              {cobrancas.map((item) => {
                return (
                  <li key={item.id}>
                    <span>{item?.id}</span>
                    <span>
                      {new Date(item?.data_vencimento).toLocaleDateString()}
                    </span>
                    <span>
                      {(item?.valor / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span>
                      <span
                        className={`
                    ${estilos.status} 
                    ${item.status === "paga" && estilos.statusVerde}
                    ${item.status === "vencida" && estilos.statusVermelho}
                    ${item.status === "pendente" && estilos.statusAmarelo}
                    `}
                      >
                        {item.status}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`flex-1 ${estilos.descricao}`}>
                        {item.descricao}
                      </div>
                      <div
                        className={`flex items-center gap-1 ${estilos.icones}`}
                      >
                        <span className={`flex-column items-center`}>
                          <img src={editarCobrancaIcone} alt="editar" />
                          <span>Editar</span>
                        </span>
                        <span className={`flex-column items-center`}>
                          <img src={excluirCobrancaIcone} alt="excluir" />
                          <span>Excluir</span>
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Listagem;
