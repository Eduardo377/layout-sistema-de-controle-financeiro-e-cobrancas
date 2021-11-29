import React, { useEffect } from "react";
import estilos from "./estilos.module.css";
import xIcone from "../../assets/icones/x-alerta.svg";
import sucessoAlertaIcone from "../../assets/icones/sucesso-alerta.svg";

const Alerta = ({ mensagem, handleAlerta }) => {
  useEffect(() => {
    setTimeout(() => {
      handleAlerta(false);
    }, 5000);
  }, []);

  return (
    <div className={`${estilos.alerta}`}>
      <div className={`flex items-center gap-1`}>
        <img src={sucessoAlertaIcone} alt="sucesso" />
        {mensagem}
        <img src={xIcone} alt="fechar" onClick={() => handleAlerta(false)} />
      </div>
    </div>
  );
};

export default Alerta;
