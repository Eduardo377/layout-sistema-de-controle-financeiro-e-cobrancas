import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import stepBottom1 from "../../../assets/icones/bottom-step1.svg";
import estilos from "./estilos.module.css";
import useRequests from "../../../hooks/Requisições/useRequests";
import useAuth from "../../../hooks/Autenticação/useAuth";

const FormularioInicio = () => {
  const [inputs, setInputs] = useState({ nome: "", email: "" });
  const navigate = useNavigate();
  const [erroNome, setErroNome] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const { buscarEmail } = useRequests();
  const { setEtapaCadastro, dadosCadastro, setDadosCadastro } = useAuth();

  useEffect(() => {
    if (inputs.nome) {
      setErroNome(false);
    }
    if (inputs.email) {
      setErroEmail(false);
    }
    setMensagemErro("");
  }, [inputs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.nome) {
      return setErroNome(true);
    }

    if (!inputs.email) {
      setErroEmail(true);
    }

    const response = await buscarEmail({ ...inputs }, setMensagemErro);
    if (response === 200) {
      const { nome, email } = inputs;
      setDadosCadastro({ ...dadosCadastro, nome, email });
      setEtapaCadastro(2);
      return navigate("/cadastro/senha");
    }
    setErroEmail(true);
    return setMensagemErro(response);
  };

  const inputOnchange = (target) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${estilos.form} flex-column items-center`}
    >
      <h2 className="mb-2">Adicione seus dados</h2>
      <label className={`${estilos.label} flex-column`}>
        Nome*
        <input
          className={`${estilos.input} ${erroNome ? estilos.erro : ""}`}
          type="text"
          name="nome"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => inputOnchange(e.target)}
          value={inputs.nome}
          placeholder="Digite seu nome"
        />
      </label>
      {erroNome && (
        <span className={estilos.span}>*Este campo deve ser preenchido</span>
      )}
      <label className={`${estilos.label} flex-column`}>
        E-mail*
        <input
          className={`${estilos.input} ${erroEmail ? estilos.erro : ""}`}
          type="email"
          name="email"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => inputOnchange(e.target)}
          value={inputs.email}
          placeholder="Digite seu e-mail"
        />
      </label>
      {mensagemErro && <span className={estilos.span}>{mensagemErro}</span>}
      <button className={`${estilos.button} btn-primario`} type="submit">
        Continuar
      </button>
      <p>
        Já possui uma conta? Faça seu <Link to="/login">Login</Link>
      </p>
      <img className={estilos.img} src={stepBottom1} alt="step-bottom-1" />
    </form>
  );
};

export default FormularioInicio;
