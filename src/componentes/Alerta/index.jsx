import React from "react";
import estilos from "./estilos.module.css";
import xIcone from "../../assets/icones/x-alerta.svg";
import sucessoAlertaIcone from "../../assets/icones/sucesso-alerta.svg";

const Alerta = ({ mensagem, handleAlerta }) => {
  return (
    <div className={`${estilos.alerta} flex items-center gap-1`}>
      <img src={sucessoAlertaIcone} alt="" />
      {mensagem}
      <img src={xIcone} alt="fechar" onClick={() => handleAlerta(false)} />
    </div>
  );
};

export default Alerta;
