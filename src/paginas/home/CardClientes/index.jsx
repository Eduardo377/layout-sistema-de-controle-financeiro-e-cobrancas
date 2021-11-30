import React from "react";
import estilos from "./estilos.module.css";

import clienteVerde from "@/assets/icones/cliente-verde.svg";
import clienteVermelho from "@/assets/icones/cliente-vermelho.svg";

const CardCobrancas = ({ nome = "Nome do card", total, cor, lista }) => {
  return (
    <div className={`flex-1 ${estilos.card}`}>
      <div className={`flex items-center gap-1 ${estilos.header}`}>
        <span className={`flex-1 flex items-center gap-1`}>
          <img src={cor === "verde" ? clienteVerde : clienteVermelho} alt="" />
          {nome}
        </span>
        <span className={`${estilos.badge} texto-${cor} bg-${cor}-claro`}>
          {total}
        </span>
      </div>

      <div className={`${estilos.subHeader}`}>
        <span>Cliente</span>
        <span>Data de venc.</span>
        <span>Valor</span>
      </div>

      <ul className={`${estilos.lista}`}>
        {lista &&
          lista.map((item) => (
            <li key={item.id_cobranca} className={`${estilos.listaItem}`}>
              <span>{item.cliente}</span>

              <span>{item.data}</span>

              <span>
                {(item.valor / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </li>
          ))}
      </ul>

      <div className={`text-center ${estilos.footer}`}>
        <a href="#">Ver todos</a>
      </div>
    </div>
  );
};

export default CardCobrancas;
