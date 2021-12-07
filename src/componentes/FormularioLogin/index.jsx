import estilos from "./estilos.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/Autenticação/useAuth";

const FormularioLogin = () => {
  const [login, setLogin] = useState({ email: "", senha: "" });
  const { logar } = useAuth();
  const navigate = useNavigate();
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    setErroEmail(false);
    setErroSenha(false);
  }, [login]);

  const inputOnchange = (target) => {
    setLogin({ ...login, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fazerLogin = await logar({ ...login }, redirecionamento);
    if (!fazerLogin.ok) {
      if (fazerLogin.response.toLowerCase().includes("senha")) {
        setMensagemErro(fazerLogin.response);
        setErroSenha(true);
      }
      if (
        fazerLogin.response.toLowerCase().includes("email") ||
        fazerLogin.response.toLowerCase().includes("usuário")
      ) {
        setMensagemErro(fazerLogin.response);
        setErroEmail(true);
      }
      setMensagemErro(fazerLogin.response);
    }
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
          className={`${estilos.input} mb-1 ${erroEmail ? estilos.erro : ""}`}
          type="text"
          name="email"
          placeholder="Digite seu e-mail"
          onChange={(e) => inputOnchange(e.target)}
          value={login.nome}
        />
        {erroEmail && <span className={estilos.erro2}>{mensagemErro}</span>}
      </label>
      <label className={`${estilos.label} flex-column`}>
        Senha
        <input
          className={`${estilos.input} mb-1 ${erroSenha ? estilos.erro : ""}`}
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          onChange={(e) => inputOnchange(e.target)}
          value={login.nome}
        />
        {erroSenha && <span className={estilos.erro2}>{mensagemErro}</span>}
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
