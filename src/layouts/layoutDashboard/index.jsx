import { useState } from "react";
<<<<<<< HEAD
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
=======
import { Link, Outlet, useLocation } from "react-router-dom";

import estilos from "./estilos.module.css";

import HomeIcone from "../../assets/icones/home";
import ClientesIcone from "../../assets/icones/clientes";
import CobrancasIcone from "../../assets/icones/cobrancas";
import chevronIcone from "../../assets/icones/chevron-down.svg";
import editarIcone from "../../assets/icones/editar.svg";
import sairIcone from "../../assets/icones/sair.svg";

const Padrao = ({ tituloDaRota }) => {
  const [menuUsuario, abreMenuUsuario] = useState(false);
  const { pathname } = useLocation();

  const tamanhoIconesMenu = 2.5;
  const menuLinks = [
    {
      nome: "Home",
      link: "/",
      icone: <HomeIcone tamanho={tamanhoIconesMenu} />,
    },
    {
      nome: "Clientes",
      link: "/clientes",
      icone: <ClientesIcone tamanho={tamanhoIconesMenu} />,
    },
    {
      nome: "Cobranças",
      link: "/cobrancas",
      icone: <CobrancasIcone tamanho={tamanhoIconesMenu} />,
    },
  ];

  return (
    <div className={`${estilos.layout}`}>
      <nav className={`${estilos.nav}`}>
        <ul className={`${estilos.menu}`}>
          {menuLinks.map((item) => (
            <li key={item.nome} className={`${estilos.menuItem}`}>
              <Link
                to={item.link}
                className={`
                ${estilos.menuItemLink} 
                ${item.link === pathname && estilos.menuItemLinkAtivo}`}
              >
                {item.icone}
                <span>{item.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`${estilos.main}`}>
        <header className={`${estilos.header}`}>
          <div className="container flex items-center">
            <div className="flex-grow">
              <h1 className={`${estilos.tituloDaRota}`}>{tituloDaRota}</h1>
            </div>

            <div className={`${estilos.usuarioContainer}`}>
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
                    <span className={`${estilos.usuarioMenuItem}`}>
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

        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
>>>>>>> main
  );
};

export default Padrao;
