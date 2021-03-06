import React, { useState, useContext } from "react";
import fetcher from "@/constantes/fetcher";
import estilos from "./estilos.module.css";
import alertaIcone from "@/assets/icones/alerta.svg";
import notify from "@/constantes/notify";
import useRequests from "../../hooks/Requisições/useRequests";
import { useLocalStorage } from "react-use";
import CobrancasContext from "@/contextos/CobrancasContext";

const ExcluirCobranca = ({ cobranca, setModal }) => {
  const [token] = useLocalStorage("token");
  const { setSucessoExclusao } = useContext(CobrancasContext)
  const { excluirUmaCobranca } = useRequests();
  
  const excluirCobranca = async () => {
    const requisicaoDeExclusao = await excluirUmaCobranca(token, cobranca.id);
    if (requisicaoDeExclusao.erro) {
      setSucessoExclusao(false);
      return setModal(false);
    }
    setSucessoExclusao(true);
    notify.sucesso(requisicaoDeExclusao.message);
    return setModal(false);
  };

  return (
    <div className={`${estilos.container}`}>
      <img src={alertaIcone} alt="alerta" />
      <p>Tem certeza que deseja excluir esta cobrança?</p>
      <div className="flex gap-1 justify-center">
        <button className={`${estilos.nao}`} onClick={() => setModal(false)}>
          Não
        </button>
        <button className={`${estilos.sim}`} onClick={excluirCobranca}>
          Sim
        </button>
      </div>
    </div>
  );
};

export default ExcluirCobranca;
