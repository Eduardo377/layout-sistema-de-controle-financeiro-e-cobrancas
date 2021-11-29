import { useEffect, useState } from "react";

import estilos from "./estilos.module.css";

import Alerta from "../../componentes/Alerta";

import ClientesIcone from "../../assets/icones/clientes";
import lupaIcone from "../../assets/icones/lupa.svg";

import Modal from "../../componentes/Modal";
import Formulario from "./Formulario";

const Clientes = ({ setTituloDaRota }) => {
  const [modal, setModal] = useState(false);
  const [alerta, setAlerta] = useState(false);

  useEffect(() => {
    setTituloDaRota("Controle de clientes");
  }, []);

  return (
    <>
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

        <section></section>
      </div>

      <Modal modal={modal} handleModal={setModal}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Cadastro do cliente</h3>
        </div>

        <Formulario setModal={setModal} setAlerta={setAlerta} />
      </Modal>

      {alerta && (
        <Alerta
          mensagem="Cadastro concluído com sucesso"
          handleAlerta={setAlerta}
        />
      )}
    </>
  );
};

export default Clientes;
