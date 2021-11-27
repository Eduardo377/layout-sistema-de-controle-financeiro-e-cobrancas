import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import useAuth from "../../../hooks/Autenticação/useAuth";
import estilos from "./estilos.module.css";
import { useNavigate } from "react-router-dom";
import chevronIcone from "../../../assets/icones/chevron-down.svg";
import editarIcone from "../../../assets/icones/editar.svg";
import sairIcone from "../../../assets/icones/sair.svg";

const MenuTopo = ({ tituloDaRota, setModal }) => {
  const [menuUsuario, abreMenuUsuario] = useState(false);
  const { deslogar } = useAuth();
  const navigate = useNavigate();

  const refMenuUsuario = useDetectClickOutside({
    onTriggered: fechaMenuUsuario,
  });

  function fechaMenuUsuario() {
    abreMenuUsuario(false);
  }

  const handleOnclick = (e) => {
    e.stopPropagation();

    return deslogar(redirecionamento);
  };

  const redirecionamento = () => {
    return navigate("/login");
  };

  return (
    <header className={`${estilos.header}`}>
      <div className="container flex items-center">
        <div className="flex-grow">
          <h1 className={`${estilos.tituloDaRota}`}>{tituloDaRota}</h1>
        </div>

        <div className={`${estilos.usuarioContainer}`} ref={refMenuUsuario}>
          <div
            className={`flex items-center ${estilos.usuario}`}
            onClick={() => abreMenuUsuario(!menuUsuario)}
          >
            <span className={`${estilos.avatar}`}>LR</span>
            <span>Lorena</span>
            <img src={chevronIcone} alt="opções de perfil" />
          </div>

          {menuUsuario && (
            <div className={`${estilos.usuarioMenu}`}>
              <div className={`${estilos.usuarioMenuContainer}`}>
                <span
                  className={`${estilos.usuarioMenuItem}`}
                  onClick={() => setModal(true)}
                >
                  <img
                    src={editarIcone}
                    alt="editar"
                    className={`${estilos.usuarioMenuIconeEditar}`}
                  />
                  <span>Editar</span>
                </span>

                <span className={`${estilos.usuarioMenuItem}`}>
                  <img src={sairIcone} onClick={handleOnclick} alt="sair" />
                  <span>Sair</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MenuTopo;
