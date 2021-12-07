import chevronIcone from "@/assets/icones/chevron-down.svg";
import editarIcone from "@/assets/icones/editar.svg";
import sairIcone from "@/assets/icones/sair.svg";
import useAuth from "@/hooks/Autenticação/useAuth";
import React, { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useLocation, useNavigate } from "react-router-dom";
import estilos from "./estilos.module.css";

const MenuTopo = ({ tituloDaRota, setModal, usuario, setUsuario }) => {
  const [menuUsuario, abreMenuUsuario] = useState(false);
  const { deslogar } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
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
    <header className={`${estilos.header} flex items-center`}>
      <h1
        className={`${
          pathname !== "/" ? `${estilos.tituloDaRota}` : null
        } flex gap-1`}
      >
        {tituloDaRota}
        {pathname.includes("/clientes/") && (
          <>
            <span>&gt;</span>
            <span>Detalhes do cliente</span>
          </>
        )}
      </h1>

      <div className={`${estilos.usuarioContainer}`} ref={refMenuUsuario}>
        <div
          className={`flex items-center ${estilos.usuario}`}
          onClick={() => abreMenuUsuario(!menuUsuario)}
        >
          <span className={`${estilos.avatar}`}>
            {!!usuario.nome && usuario.nome.substring(0, 2).toUpperCase()}
          </span>
          <span>{!!usuario.nome && usuario.nome.split(" ")[0]}</span>
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

              <span
                className={`${estilos.usuarioMenuItem}`}
                onClick={handleOnclick}
              >
                <img src={sairIcone} alt="sair" />
                <span>Sair</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MenuTopo;
