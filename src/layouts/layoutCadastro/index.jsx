import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import estilos from "./estilos.module.css";
import step1 from "../../assets/icones/step1.svg";
import step2 from "../../assets/icones/step2.svg";
import step3 from "../../assets/icones/step3.svg";

const LayoutCadastro = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    (pathname === "/cadastro" || pathname === "/cadastro/") &&
      navigate("inicio");
      // eslint-disable-next-line
  }, []);

  const selecionarImagemStep = () => {
    if (pathname === "/cadastro/inicio") return step1;
    if (pathname === "/cadastro/senha") return step2;
    return step3;
  };

  return (
    <main className={`${estilos.main} flex`}>
      <aside className={`${estilos.aside} flex justify-center`}>
        <img className={estilos.img} src={selecionarImagemStep()} alt="steps" />
        <ul className={`${estilos.ul} flex-column`}>
          <li className={`${estilos.li} flex-column`}>
            <b className={`${estilos.b}`}>Cadastre-se</b>
            <span className={`${estilos.span}`}>
              Por favor, escreva seu nome e e-mail
            </span>
          </li>

          <li className={`${estilos.li} flex-column`}>
            <b className={`${estilos.b}`}>Escolha uma senha</b>
            <span className={`${estilos.span}`}>Escolha uma senha segura</span>
          </li>

          <li className={`${estilos.li} flex-column`}>
            <b className={`${estilos.b}`}>Cadastro realizado com sucesso</b>
            <span className={`${estilos.span}`}>
              E-mail e senha cadastrados com sucesso
            </span>
          </li>
        </ul>
      </aside>
      <div className={`${estilos.div} flex justify-center`}>
        <Outlet />
      </div>
    </main>
  );
};

export default LayoutCadastro;
