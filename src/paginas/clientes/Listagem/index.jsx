import criarCorancaIcone from "@/assets/icones/criar-cobranca.svg";
import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";
import Modal from "@/componentes/Modal";
import ClientesContext from "@/contextos/ClientesContext";
import CobrancasContext from "@/contextos/CobrancasContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import estilos from "./estilos.module.css";

const Listagem = ({ pesquisa }) => {
  const { clientes, loadingClientes, setClientes } =
    useContext(ClientesContext);

  const [modal, setModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({});
  const [ordenado, setOrdenado] = useState(true);

  useEffect(() => {}, [pesquisa]);

  function cadastrarCobranca(cliente) {
    setModal(true);
    setCurrentCliente(cliente);
  }

  const ordenarClientes = () => {
    const listaOrdenada = clientes.sort((a, b) => {
      if (a.nome > b.nome) {
        return ordenado ? 1 : -1;
      }

      if (a.nome < b.nome) {
        return ordenado ? -1 : 1;
      }

      return 0;
    });

    setClientes([...listaOrdenada]);
    setOrdenado(!ordenado);
  };

  const pesquisarCliente = (nome) => {
    nome = nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (nome.toLowerCase().includes(pesquisa)) {
      return false;
    }

    return true;
  };

  if (loadingClientes) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {clientes.length > 0 && (
        <div className={`${estilos.clientesSecao}`}>
          <section className={`${estilos.listagem}`}>
            <div className={`${estilos.listagemHeader}`}>
              <span
                className="flex items-center gap-1"
                onClick={ordenarClientes}
              >
                <img src={setasOrdenacaoIcone} alt="" />
                <span>Cliente</span>
              </span>
              <span>CPF</span>
              <span>E-mail</span>
              <span>Telefone</span>
              <span>Status</span>
              <span>Criar Cobrança</span>
            </div>

            <ul className={`${estilos.listagemBody}`}>
              {clientes &&
                clientes.map((cliente, index) => (
                  <li
                    key={cliente.id || cliente.nome}
                    className={`${
                      pesquisa && pesquisarCliente(cliente.nome) && "hidden"
                    }`}
                  >
                    <span>
                      <Link to={`${cliente.id}`}>{cliente.nome}</Link>
                    </span>
                    <span>{cliente.cpf}</span>
                    <span>{cliente.email}</span>
                    <span>{cliente.telefone}</span>
                    <span
                      className={`${estilos.status} ${
                        cliente.inadimplente
                          ? estilos.statusVermelho
                          : estilos.statusVerde
                      }`}
                    >
                      {cliente.inadimplente ? "Inadimplente" : "Em dia"}
                    </span>
                    <span onClick={() => cadastrarCobranca(cliente)}>
                      <img src={criarCorancaIcone} alt="criar conbrança" />
                      <span>Cobrança</span>
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      )}

      <Modal modal={modal} handleModal={setModal}>
        <FormularioCobrancas
          setModal={setModal}
          cliente={currentCliente}
          verbo="POST"
        />
      </Modal>
    </>
  );
};

export default Listagem;
