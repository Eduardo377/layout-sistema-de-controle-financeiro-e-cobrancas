import estilos from "./estilos.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/Autenticação/useAuth";

const FormularioLogin = () => {
  const [login, setLogin] = useState({ email: "", senha: "" });
  const { logar } = useAuth();
  const navigate = useNavigate();

  const inputOnchange = (target) => {
    setLogin({ ...login, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!login.email || !login.senha) {
      return window.alert(
        "ERRO: PREENCHA OS CAMPOS OBRIGATÓRIOS DO FORMULÁRIO"
      );
    }
    await logar({ ...login }, redirecionamento);
    return;
  };

  const redirecionamento = () => {
    return navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${estilos.form} flex-column items-center`}
    >
      <h2 className={`${estilos.h2} mb-2`}>Faça seu login!</h2>
      <label className={`${estilos.label} flex-column`}>
        E-mail
        <input
          className={`${estilos.input} mb-1`}
          type="text"
          name="email"
          placeholder="Digite seu e-mail"
          onChange={(e) => inputOnchange(e.target)}
          value={login.nome}
        />
      </label>
      <label className={`${estilos.label} flex-column`}>
        Senha
        <input
          className={`${estilos.input} mb-1`}
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          onChange={(e) => inputOnchange(e.target)}
          value={login.nome}
        />
      </label>
      <button className={`${estilos.button} btn-primario`} type="submit">
        Entrar
      </button>
      <p className={estilos.p}>
        Ainda não possui uma conta?{" "}
        <Link to="/cadastro/inicio">Cadastre-se</Link>
      </p>
    </form>
  );
};

export default FormularioLogin;
