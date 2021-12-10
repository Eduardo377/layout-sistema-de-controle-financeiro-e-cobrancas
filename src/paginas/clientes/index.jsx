import ClientesIcone from "@/assets/icones/clientes";
import filtroIcone from "@/assets/icones/filtro.svg";
import lupaIcone from "@/assets/icones/lupa.svg";
import FormularioClientes from "@/componentes/FormularioClientes";
import Modal from "@/componentes/Modal";
import ClientesContext from "contextos/ClientesContext";
import React, { useContext, useEffect, useState } from "react";
import estilos from "./estilos.module.css";
import Listagem from "./Listagem";

const Clientes = () => {
  const [modal, setModal] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  const { clientes, setClientes, setCliente } = useContext(ClientesContext);

  useEffect(() => {
    setCliente({});
  }, []);

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
            <input
              type="text"
              placeholder="Pesquisa"
              value={pesquisa}
              onChange={({ target }) => setPesquisa(target.value)}
            />
            <img
              src={lupaIcone}
              alt="lupa"
              className={`${estilos.inputIcone}`}
            />
          </div>
        </div>
      </section>

      <Listagem pesquisa={pesquisa} />

      <Modal modal={modal} handleModal={setModal}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Cadastro do cliente</h3>
        </div>

        <FormularioClientes setModal={setModal} verbo="POST" />
      </Modal>
    </>
  );
};

export default Clientes;
