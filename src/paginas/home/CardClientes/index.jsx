import clienteVerde from "@/assets/icones/cliente-verde.svg";
import clienteVermelho from "@/assets/icones/cliente-vermelho.svg";
import ClientesIcone from "@/assets/icones/clientes";
import ClientesContext from "contextos/ClientesContext";
import React, { useContext, useEffect, useState } from "react";
import estilos from "./estilos.module.css";

const CardClientes = ({ nome = "Nome do card", total, cor, lista, status }) => {
  const { clientes } = useContext(ClientesContext);

  const [clientesPorStatus, setClientesPorStatus] = useState([]);

  useEffect(() => {
    if (clientes.length > 0) {
      const clientesFiltrado = clientes.filter(
        (cliente) => cliente.inadimplente === status
      );

      setClientesPorStatus(clientesFiltrado);

      console.log(clientesFiltrado);
    }
  }, [clientes]);

  return (
    <div className={`flex-1 ${estilos.card}`}>
      <div className={`flex items-center gap-1 ${estilos.header}`}>
        <span className={`flex-1 flex items-center gap-1`}>
          <img src={cor === "verde" ? clienteVerde : clienteVermelho} alt="" />
          {nome}
        </span>
        <span className={`${estilos.badge} texto-${cor} bg-${cor}-claro`}>
          {clientesPorStatus.length > 0
            ? String(clientesPorStatus.length).padStart(2, "0")
            : 0}
        </span>
      </div>

      {clientesPorStatus.length > 0 && (
        <>
          <div className={`${estilos.subHeader}`}>
            <span>Cliente</span>
            <span>ID do Clie.</span>
            <span>CPF</span>
          </div>

          <ul className={`${estilos.lista}`}>
            {clientesPorStatus.slice(0, 4).map((cliente) => (
              <li key={cliente.id} className={`${estilos.listaItem}`}>
                <span>{cliente.nome}</span>

                <span>{cliente.id}</span>

                <span>
                  {String(cliente.cpf).replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4"
                  )}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {clientesPorStatus.length === 0 && (
        <div className="flex justify-center" style={{ padding: "3rem 0" }}>
          <ClientesIcone tamanho={6} />
        </div>
      )}

      {clientesPorStatus.length > 4 && (
        <div className={`text-center ${estilos.footer}`}>
          <a href="#">Ver todos</a>
        </div>
      )}
    </div>
  );
};

export default CardClientes;
