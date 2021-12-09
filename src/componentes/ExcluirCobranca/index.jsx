import React, { useState } from "react";
import fetcher from "@/constantes/fetcher";
import estilos from "./estilos.module.css";
import alertaIcone from "@/assets/icones/alerta.svg";
import notify from "@/constantes/notify";

// Aguardando enpoint
const ExcluirCobranca = ({ cobranca, setModal }) => {
  const excluirCobranca = async () => {
    console.log("ID da cobrança a ser exluida => " + cobranca.id);
  };

  return (
    <div className={`${estilos.container}`}>
      <img src={alertaIcone} alt="alerta" />
      <p>Tem certeza que deseja exluir esta cobrança?</p>
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
