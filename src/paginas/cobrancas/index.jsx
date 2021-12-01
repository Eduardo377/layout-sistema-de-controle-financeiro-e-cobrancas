import { useEffect, useState } from "react";
import estilos from "./estilos.module.css";
import CobrancasIcone from "@/assets/icones/cobrancas";
import lupaIcone from "@/assets/icones/lupa.svg";
import filtro from "@/assets/icones/filtro.svg";

const Cobrancas = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("Cobranças");
  }, []);

  return (
    <div>
      <section className={`flex items-center`}>
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
      </section>

      <section></section>
    </div>
  );
};

export default Cobrancas;
