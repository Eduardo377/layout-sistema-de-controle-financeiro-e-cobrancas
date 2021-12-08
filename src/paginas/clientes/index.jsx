import ClientesIcone from "@/assets/icones/clientes";
import criarCorancaIcone from "@/assets/icones/criar-cobranca.svg";
import filtroIcone from "@/assets/icones/filtro.svg";
import lupaIcone from "@/assets/icones/lupa.svg";
import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";
import Modal from "@/componentes/Modal";
import fetcher from "@/constantes/fetcher";
import notify from "constantes/notify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import estilos from "./estilos.module.css";
import Formulario from "./Formulario";
import buscaClientes from "./buscaClientes";

const Clientes = () => {
  const [modal, setModal] = useState(false);
  const [modalCobranca, setModalCobranca] = useState(false);
  const [formCobranca, setFormCobranca] = useState(null);
  const [carregandoCobranca, setCarregandoCobranca] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [clienteID, setClienteID] = useState(null);

  useEffect(() => {
    (async function () {
      setClientes(await buscaClientes());
    })();
  }, []);

  useEffect(() => {
    if (formCobranca) {
      cadastrarCobranca();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formCobranca]);

  function criarCobranca(clienteID, cliente) {
    setClienteID(clienteID);
    setCliente(cliente);
    setModalCobranca(true);
  }

  async function cadastrarCobranca() {
    setCarregandoCobranca(true);

    try {
      const response = await fetcher("cobrancas", "POST", formCobranca);

      const responseData = await response.json();

      if (!response.ok) {
        setCarregandoCobranca(false);
        return;
      }

      notify.sucesso("Cobrança cadastrada com sucesso").showToast();
      setModalCobranca(false);
    } catch (error) {
      setCarregandoCobranca(false);
      notify.erro(error.message).showToast();
    }
  }

  return (
    <>
      <section className={`flex items-center mb-2`}>
        <div className={`flex items-center flex-1 gap-1`}>
          <ClientesIcone tamanho={2} />
          <h2>Clientes</h2>
        </div>

        <div className={`flex  gap-1`}>
          <button className="btn-primario" onClick={() => setModal(true)}>
            + Adicionar cliente
          </button>

          <button className={`${estilos.filtroBtn}`}>
            <img src={filtroIcone} alt="filtro" />
          </button>

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
                    <span
                      onClick={() => criarCobranca(cliente.id, cliente.nome)}
                    >
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
          <h3>Cadastro do cliente</h3>
        </div>

        <Formulario
          setModal={setModal}
          setClientes={setClientes}
          clientes={clientes}
          verbo="POST"
        />
      </Modal>

      <Modal modal={modalCobranca} handleModal={setModalCobranca}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Cadastro de cobrança</h3>
        </div>

        <FormularioCobrancas
          setModal={setModalCobranca}
          carregando={carregandoCobranca}
          cliente={cliente}
          clienteID={clienteID}
          setForm={setFormCobranca}
        />
      </Modal>
    </>
  );
};

export default Clientes;
