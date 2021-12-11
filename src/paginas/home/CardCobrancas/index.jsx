import React, { useState, useContext, useEffect } from "react";
import estilos from "./estilos.module.css";
import CobrancasContext from "contextos/CobrancasContext";
import CobrancasIcone from "@/assets/icones/cobrancas";

const CardCobrancas = ({ status }) => {
  const { cobrancas } = useContext(CobrancasContext);
  const [total, setTotal] = useState(0);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    if (cobrancas.length > 0) {
      const cobrancasFiltradas = cobrancas.filter(
        (item) => item.status.toLowerCase() === status
      );

      setLista(cobrancasFiltradas);

      setTotal(cobrancasFiltradas.length);
    }
  }, [cobrancas]);

  return (
    <div className={`flex-1 ${estilos.card}`}>
      <div className={`flex items-center gap-1 ${estilos.header}`}>
        <span className={`flex-1 text-center`}>
          Cobranças {status === "paga" && "Pagas"}{" "}
          {status === "vencida" && "Vencidas"}{" "}
          {status === "pendente" && "Pendentes"}
        </span>
        <span
          className={`${estilos.badge}
        ${status === "paga" && "texto-verde bg-verde-claro"}
        ${status === "vencida" && "texto-vermelho bg-vermelho-claro"}
        ${status === "pendente" && "texto-amarelo bg-amarelo-claro"} 
 `}
        >
          {total > 0 ? String(total).padStart(2, "0") : 0}
        </span>
      </div>

      {lista.length > 0 && (
        <>
          <div className={`${estilos.subHeader}`}>
            <span>Cliente</span>
            <span>ID da cob.</span>
            <span>Valor</span>
          </div>

          <ul className={`${estilos.lista}`}>
            {lista.slice(0, 4).map((item, index) => (
              <li key={item.id + index} className={`${estilos.listaItem}`}>
                <span>{item.nome}</span>

                <span>{item.id}</span>

                <span>
                  {(item.valor / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {lista.length === 0 && (
        <div className="flex justify-center" style={{ padding: "3rem 0" }}>
          <CobrancasIcone tamanho={6} />
        </div>
      )}

      {lista.length > 4 && (
        <div className={`text-center ${estilos.footer}`}>
          <a href="#">Ver todos</a>
        </div>
      )}
    </div>
  );
};

export default CardCobrancas;
