import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

import estilos from "./estilos.module.css";

import chevronIcone from "../../../assets/icones/chevron-down.svg";
import editarIcone from "../../../assets/icones/editar.svg";
import sairIcone from "../../../assets/icones/sair.svg";

const MenuTopo = ({ tituloDaRota, setModal }) => {
  const [menuUsuario, abreMenuUsuario] = useState(false);

  const refMenuUsuario = useDetectClickOutside({
    onTriggered: fechaMenuUsuario,
  });

  function fechaMenuUsuario() {
    abreMenuUsuario(false);
  }

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
            <img src={chevronIcone} alt="" />
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
                    alt=""
                    className={`${estilos.usuarioMenuIconeEditar}`}
                  />
                  <span>Editar</span>
                </span>

                <span className={`${estilos.usuarioMenuItem}`}>
                  <img src={sairIcone} alt="" />
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
