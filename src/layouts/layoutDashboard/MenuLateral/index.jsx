import React from "react";
import { Link, useLocation } from "react-router-dom";

import estilos from "./estilos.module.css";

import HomeIcone from "../../../assets/icones/home";
import ClientesIcone from "../../../assets/icones/clientes";
import CobrancasIcone from "../../../assets/icones/cobrancas";

const MenuLateral = () => {
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
      link: "#",
      icone: <CobrancasIcone tamanho={tamanhoIconesMenu} />,
    },
  ];

  return (
    <nav className={`${estilos.nav}`}>
      <ul className={`${estilos.menu}`}>
        {menuLinks.map((item) => (
          <li key={item.nome} className={`${estilos.menuItem}`}>
            <Link
              to={item.link}
              className={`
          ${estilos.menuItemLink} 
          ${item.link === pathname && estilos.menuItemLinkAtivo} 
          ${item.nome === "Cobranças" && estilos.menuItemDesabilitado}
          `}
            >
              {item.icone}
              <span>{item.nome}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuLateral;
