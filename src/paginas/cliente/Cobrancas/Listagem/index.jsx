import { useState, useEffect, useContext } from "react";
import fetcher from "@/constantes/fetcher";
import { useParams } from "react-router";
import estilos from "./estilos.module.css";
import CobrancasIcone from "@/assets/icones/cobrancas";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";

import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";
import editarCobrancaIcone from "@/assets/icones/editar.svg";
import excluirCobrancaIcone from "@/assets/icones/excluir.svg";
import buscaCobrancasCliente from "./buscaCobrancasCliente";
import CobrancasContext from "@/contextos/CobrancasContext";
import Modal from "@/componentes/Modal";
import ClientesContext from "contextos/ClientesContext";

const Listagem = () => {
  const [modal, setModal] = useState(false);
  const [currentCobranca, setCurrentCobranca] = useState({});
  const { id: clienteID } = useParams();
  const {
    cobrancasCLiente,
    setCobrancasCLiente,
    loadingCobrancasCLiente,
    setLoadingCobrancasCLiente,
  } = useContext(CobrancasContext);
  const { cliente } = useContext(ClientesContext);

  useEffect(() => {
    (async function () {
      buscaCobrancasCliente(clienteID).then((res) => {
        setCobrancasCLiente(res);
        setLoadingCobrancasCLiente(false);
      });
    })();
  }, [cobrancasCLiente]);

  if (loadingCobrancasCLiente) {
    return <div>Carregando...</div>;
  }

  const editarCobranca = (cobranca) => {
    setModal(true);

    setCurrentCobranca(cobranca);
  };

  return (
    <>
      {cobrancasCLiente.length > 0 && (
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
              {cobrancasCLiente.map((cobranca) => {
                return (
                  <li key={cobranca.id}>
                    <span>{cobranca?.id}</span>
                    <span>
                      {new Date(cobranca?.data_vencimento).toLocaleDateString(
                        "pt-BR",
                        {
                          timeZone: "UTC",
                        }
                      )}
                    </span>
                    <span>
                      {(cobranca?.valor / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span>
                      <span
                        className={`
                    ${estilos.status}
                    ${cobranca.status === "paga" && estilos.statusVerde}
                    ${cobranca.status === "vencida" && estilos.statusVermelho}
                    ${cobranca.status === "pendente" && estilos.statusAmarelo}
                    `}
                      >
                        {cobranca.status}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`flex-1 ${estilos.descricao}`}>
                        {cobranca.descricao}
                      </div>
                      <div
                        className={`flex items-center gap-1 ${estilos.icones}`}
                      >
                        <span
                          className={`flex-column items-center`}
                          onClick={() => editarCobranca(cobranca)}
                        >
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

      <Modal modal={modal} handleModal={setModal}>
        <FormularioCobrancas
          setModal={setModal}
          verbo="PUT"
          cobranca={currentCobranca}
          cliente={cliente}
        />
      </Modal>
    </>
  );
};

export default Listagem;
