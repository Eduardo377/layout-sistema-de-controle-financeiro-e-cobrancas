import Modal from "@/componentes/Modal";
import { memo, useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import estilos from "./estilos.module.css";
import Formulario from "./Formulario";
import MenuLateral from "./MenuLateral";
import MenuTopo from "./MenuTopo";
import { UsuarioContextProvider } from "@/contextos/UsuarioContext";
import notify from "constantes/notify";

const Padrao = ({ tituloDaRota }) => {
  const [usuario, setUsuario] = useState({});
  const [modal, setModal] = useState(false);

  return (
    <UsuarioContextProvider>
      <div className={`${estilos.layout}`}>
        <MenuLateral />

        <div className={`${estilos.main}`}>
          <MenuTopo
            setModal={setModal}
            tituloDaRota={tituloDaRota}
          />

          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>

      <Modal modal={modal} handleModal={setModal}>
        <h3 className="text-center mb-2">Edite seu cadastro</h3>

        <Formulario />
      </Modal>
    </UsuarioContextProvider>
  );
};

export default memo(Padrao);
