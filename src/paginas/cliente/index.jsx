import ClientesIcone from "@/assets/icones/clientes";
import editarClienteIcone from "@/assets/icones/editar-cliente.svg";
import Formulario from "@/componentes/FormularioClientes";
import Modal from "@/componentes/Modal";
import ClientesContext from "contextos/ClientesContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import buscaCliente from "./buscaCliente";
import CobrancasSecao from "./Cobrancas";
import estilos from "./estilos.module.css";

const Cliente = () => {
  const { id: clienteID } = useParams();

  const { cliente, setCliente, setLoadingCliente, loadingCliente } =
    useContext(ClientesContext);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    setCliente({});

    (async function () {
      setCliente(await buscaCliente(clienteID));

      setLoadingCliente(false);
    })();
  }, []);

  if (loadingCliente) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={`flex items-center flex-1 gap-1 my-2`}>
        <ClientesIcone tamanho={2} />
        <h2>{cliente?.nome}</h2>
      </div>

      <section className={`${estilos.containerSecao} mb-2`}>
        <div className={`flex items-center mb-2`}>
          <h3 className={`flex-1`}>Dados do cliente</h3>

          <button
            className={`btn-secundario flex items-center gap-1`}
            onClick={() => setModal(true)}
          >
            <img src={editarClienteIcone} alt="editar cliente" />
            <span>Editar Cliente</span>
          </button>
        </div>

        <div className={`flex gap-2 ${estilos.dados}`}>
          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>E-mail</span>
            <span>{cliente?.email}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Telefone</span>
            <span>{cliente?.telefone}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>CPF</span>
            <span>{cliente?.cpf}</span>
          </div>
        </div>

        <div className={`flex gap-2  ${estilos.dados}`}>
          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Endereço</span>
            <span className="font-capitalize">{cliente?.endereco}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Bairro</span>
            <span className="font-capitalize">{cliente?.bairro}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Complemento</span>
            <span className="font-capitalize">{cliente?.complemento}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>CEP</span>
            <span>{cliente?.cep}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Cidade</span>
            <span className="font-capitalize">{cliente?.cidade}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>UF</span>
            <span className="font-uppercase">{cliente?.uf}</span>
          </div>
        </div>
      </section>

      <CobrancasSecao cliente={cliente} />

      <Modal modal={modal} handleModal={setModal}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Editar cliente</h3>
        </div>

        <Formulario setModal={setModal} verbo="PUT" />
      </Modal>
    </>
  );
};

export default Cliente;
