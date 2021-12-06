import ClientesIcone from "@/assets/icones/clientes";
import Alerta from "@/componentes/Alerta";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";
import Modal from "@/componentes/Modal";
import fetcher from "@/constantes/fetcher";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import estilos from "./estilos.module.css";
import Listagem from "./Listagem";

const Cobrancas = ({ cliente }) => {
  const { id: clienteID } = useParams();

  const [modalCobranca, setModalCobranca] = useState(false);
  const [carregandoCobranca, setCarregandoCobranca] = useState();
  const [formCobranca, setFormCobranca] = useState(null);
  const [alertaCobranca, setAlertaCobranca] = useState(false);
  const [cobrancas, setCobrancas] = useState([]);

  useEffect(() => {
    if (formCobranca) {
      cadastrarCobranca();
    }

    buscaCobrancas();
  }, [formCobranca]);

  async function cadastrarCobranca() {
    setCarregandoCobranca(true);

    try {
      const response = await fetcher("cobrancas", "POST", formCobranca);

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      setCarregandoCobranca(false);
      setAlertaCobranca(true);
      setModalCobranca(false);
    } catch (error) {
      alert(error.message);
      setCarregandoCobranca(false);
    }
  }

  async function buscaCobrancas() {
    try {
      const response = await fetcher(`cobrancas/${clienteID}`);

      const responseData = await response.json();

      setCobrancas(responseData);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <section className={`${estilos.containerSecao}`}>
        <div className={`flex items-center mb-2`}>
          <h3 className={`flex-1`}>Cobranças do cliente</h3>

          <button
            className={`btn-primario`}
            onClick={() => setModalCobranca(true)}
          >
            + Nova cobrança
          </button>
        </div>

        <div>
          <Listagem
            cliente={cliente}
            formCobranca={formCobranca}
            setFormCobranca={setFormCobranca}
            cobrancas={cobrancas}
          />
        </div>
      </section>

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

      {alertaCobranca && (
        <Alerta
          mensagem="Cobrança cadastrada com sucesso"
          handleAlerta={setAlertaCobranca}
        />
      )}
    </>
  );
};

export default Cobrancas;
