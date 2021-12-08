import criarCorancaIcone from "@/assets/icones/criar-cobranca.svg";
import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";
import ClientesContext from "@/contextos/ClientesContext";
import CobrancasContext from "@/contextos/CobrancasContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./estilos.module.css";
import Modal from "@/componentes/Modal";
import ClientesIcone from "@/assets/icones/clientes";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";

const Listagem = () => {
  const { clientes, loadingClientes } = useContext(ClientesContext);
  const { cobrancasCliente, setCobrancasCliente } =
    useContext(CobrancasContext);
  const [modal, setModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({});

  function cadastrarCobranca(cliente) {
    setModal(true);
    setCurrentCliente(cliente);
    console.log(cliente);
  }

  if (loadingClientes) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {clientes.length > 0 && (
        <div className={`${estilos.clientesSecao}`}>
          <section className={`${estilos.listagem}`}>
            <div className={`${estilos.listagemHeader}`}>
              <span className="flex items-center gap-1">
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
                  <li key={cliente.id || cliente.nome}>
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
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Cadastro de cobrança</h3>
        </div>

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
