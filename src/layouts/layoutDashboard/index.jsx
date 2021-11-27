import { useState } from "react";
import { Outlet } from "react-router-dom";

import estilos from "./estilos.module.css";

import MenuLateral from "./MenuLateral";
import MenuTopo from "./MenuTopo";
import Modal from "../../componentes/Modal";
import Formulario from "./Formulario";

const Padrao = ({ tituloDaRota }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className={`${estilos.layout}`}>
        <MenuLateral />

        <div className={`${estilos.main}`}>
          <MenuTopo setModal={setModal} tituloDaRota={tituloDaRota} />

          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>

      <Modal modal={modal} handleModal={setModal}>
        <h3 className="text-center mb-2">Edite seu cadastro</h3>

        <Formulario />
      </Modal>
    </>
  );
};

export default Padrao;
