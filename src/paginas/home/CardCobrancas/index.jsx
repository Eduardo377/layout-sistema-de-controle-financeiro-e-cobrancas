import React from "react";
import estilos from "./estilos.module.css";

const CardCobrancas = ({
  nome = "Nome do card",
  total,
  cor,
  lista,
  children,
}) => {
  return (
    <div className={`flex-1 ${estilos.card}`}>
      <div className={`flex items-center gap-1 ${estilos.header}`}>
        <span className={`flex-1 text-center`}>{nome}</span>
        <span className={`${estilos.badge} texto-${cor} bg-${cor}-claro`}>
          {total}
        </span>
      </div>

      <ul className={`${estilos.lista}`}>
        {lista &&
          lista.map((item) => (
            <li key={item.id_cobranca} className={`${estilos.listaItem}`}>
              <span>{item.cliente}</span>

              <span>{item.id_cobranca}</span>

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
