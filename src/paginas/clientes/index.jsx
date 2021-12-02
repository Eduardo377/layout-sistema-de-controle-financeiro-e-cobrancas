import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use";

import estilos from "./estilos.module.css";

import Alerta from "@/componentes/Alerta";

import ClientesIcone from "@/assets/icones/clientes";
import lupaIcone from "@/assets/icones/lupa.svg";

import Modal from "@/componentes/Modal";
import Formulario from "./Formulario";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";

import criarCorancaIcone from "@/assets/icones/criar-cobranca.svg";
import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";

const Clientes = () => {
  const [modal, setModal] = useState(false);
  const [modalCobranca, setModalCobranca] = useState(false);
  const [formCobranca, setFormCobranca] = useState(null);
  const [carregandoCoranca, setCarregandoCobranca] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [alertaCobranca, setAlertaCobranca] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [clienteID, setClienteID] = useState(null);
  const [token] = useLocalStorage("token");

  useEffect(async () => {
    setClientes(await buscaClientes());
  }, []);

  async function buscaClientes() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/clientes`,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(formCobranca);

    if (formCobranca) {
      cadastrarCobranca();
    }
  }, [formCobranca]);

  function criarCobranca(clienteID, cliente) {
    setClienteID(clienteID);
    setCliente(cliente);
    setModalCobranca(true);
  }

  async function cadastrarCobranca() {
    setCarregandoCobranca(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/cobrancas`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formCobranca),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setCarregandoCobranca(false);
        return;
      }

      setAlertaCobranca(true);
      setModalCobranca(false);
      setCarregandoCobranca(false);

      console.log(responseData);
    } catch (error) {
      console.log(error);
      setCarregandoCobranca(false);
    }
  }

  return (
    <>
      {clientes.length > 0 && (
        <div className={`${estilos.clientesSecao}`}>
          <section className={`flex items-center`}>
            <div className={`flex items-center flex-1 gap-1`}>
              <ClientesIcone tamanho={2} />
              <h2>Clientes</h2>
            </div>

            <div className={`flex  gap-1`}>
              <button className="btn-primario" onClick={() => setModal(true)}>
                + Adicionar cliente
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
                    <span></span>
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
          setAlerta={setAlerta}
          setClientes={setClientes}
          clientes={clientes}
        />
      </Modal>

      <Modal modal={modalCobranca} handleModal={setModalCobranca}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Cadastro de cobrança</h3>
        </div>

        <FormularioCobrancas
          setModal={setModalCobranca}
          carregando={carregandoCoranca}
          cliente={cliente}
          clienteID={clienteID}
          setForm={setFormCobranca}
        />
      </Modal>

      {alerta && (
        <Alerta
          mensagem="Cadastro concluído com sucesso"
          handleAlerta={setAlerta}
        />
      )}

      {alertaCobranca && (
        <Alerta
          mensagem="Cobrança cadastrada com sucesso"
          handleAlerta={setAlertaCobranca}
        />
      )}
    </>
  );
};

export default Clientes;
