import ClientesIcone from "@/assets/icones/clientes";
import editarClienteIcone from "@/assets/icones/editar-cliente.svg";
import Alerta from "@/componentes/Alerta";
import Modal from "@/componentes/Modal";
import fetcher from "@/constantes/fetcher";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import estilos from "./estilos.module.css";
import Formulario from "../Formulario";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";
import CobrancasSecao from "./Cobrancas";

const Cliente = () => {
  const { id: clienteID } = useParams();
  const [cliente, setCliente] = useState({});
  const [alerta, setAlerta] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalCobranca, setModalCobranca] = useState(false);
  const [carregandoCobranca, setCarregandoCobranca] = useState();
  const [formCobranca, setFormCobranca] = useState(null);
  const [alertaCobranca, setAlertaCobranca] = useState(false);

  useEffect(() => {
    async function fetchCliente() {
      setCliente(await buscaCliente());
    }

    fetchCliente();
  }, []);

  async function buscaCliente() {
    try {
      const response = await fetcher(`clientes/${clienteID}`);

      const data = await response.json();

      return data;
    } catch (error) {
      alert(error.message);
    }
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
            <span>{cliente.telefone}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>CPF</span>
            <span>{cliente.cpf}</span>
          </div>
        </div>

        <div className={`flex gap-2  ${estilos.dados}`}>
          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Endereço</span>
            <span className="font-capitalize">{cliente?.endereco}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Bairro</span>
            <span className="font-capitalize">{cliente.bairro}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Complemento</span>
            <span className="font-capitalize">{cliente.complemento}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>CEP</span>
            <span>{cliente.cep}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>Cidade</span>
            <span className="font-capitalize">{cliente.cidade}</span>
          </div>

          <div className={`flex-column`}>
            <span className={`${estilos.dadosCampo}`}>UF</span>
            <span className="font-uppercase">{cliente.uf}</span>
          </div>
        </div>
      </section>

      <CobrancasSecao cliente={cliente} />

      <Modal modal={modal} handleModal={setModal}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Editar cliente</h3>
        </div>

        <Formulario
          setModal={setModal}
          setAlerta={setAlerta}
          setCliente={setCliente}
          cliente={cliente}
          verbo="PUT"
        />
      </Modal>

      {alerta && (
        <Alerta
          mensagem="Edições do cadastro conluídas com sucesso"
          handleAlerta={setAlerta}
        />
      )}
    </>
  );
};

export default Cliente;
