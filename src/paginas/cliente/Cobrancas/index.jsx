import FormularioCobrancas from "@/componentes/FormularioCobrancas";
import Modal from "@/componentes/Modal";
import ClientesContext from "@/contextos/ClientesContext";
import React, { useContext, useState } from "react";
import estilos from "./estilos.module.css";
import Listagem from "./Listagem";

const Cobrancas = () => {
  const { cliente } = useContext(ClientesContext);

  const [modal, setModal] = useState(false);

  return (
    <>
      <section className={`${estilos.containerSecao}`}>
        <div className={`flex items-center mb-2`}>
          <h3 className={`flex-1`}>Cobranças do cliente</h3>

          <button className={`btn-primario`} onClick={() => setModal(true)}>
            + Nova cobrança
          </button>
        </div>

        <div>
          <Listagem />
        </div>
      </section>

      <Modal modal={modal} handleModal={setModal}>
        <FormularioCobrancas
          setModal={setModal}
          cliente={cliente}
          verbo="POST"
        />
      </Modal>
    </>
  );
};

export default Cobrancas;
