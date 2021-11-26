import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import stepBottom1 from "../../../assets/icones/bottom-step1.svg";
import estilos from "./estilos.module.css";
import useRequests from "../../../hooks/Requisições/useRequests";
import useAuth from "../../../hooks/Autenticação/useAuth";

const FormularioInicio = () => {
  const [inputs, setInputs] = useState({ nome: "", email: "" });
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const { buscarEmail } = useRequests();
  const { setEtapaCadastro, etapaCadastro, dadosCadastro, setDadosCadastro } =
    useAuth();

  useEffect(() => {
    if (!inputs.nome || !inputs.email) {
      return setErro(true);
    }
    setErro(false);
  }, [inputs]);

  useEffect(() => {
    setErro(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.nome || !inputs.email) {
      return window.alert(
        "ERRO: PREENCHA OS CAMPOS OBRIGATÓRIOS DO FORMULÁRIO"
      );
    }
    // const dados = { ...inputs };
    const response = await buscarEmail({ ...inputs });
    if (response) {
      const { nome, email } = inputs;
      setDadosCadastro({ ...dadosCadastro, nome, email });
      setEtapaCadastro(2);
      return navigate("/cadastro/senha");
    }
    return;
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
          className={`${estilos.input} ${erro ? estilos.erro : ""}`}
          type="text"
          name="nome"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => inputOnchange(e.target)}
          value={inputs.nome}
          placeholder="Digite seu nome"
        />
      </label>
      {!inputs.nome && erro && (
        <span className={estilos.span}>*Este campo deve ser preenchido</span>
      )}
      <label className={`${estilos.label} flex-column`}>
        E-mail*
        <input
          className={`${estilos.input} ${erro ? estilos.erro : ""}`}
          type="email"
          name="email"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => inputOnchange(e.target)}
          value={inputs.email}
          placeholder="Digite seu e-mail"
        />
      </label>
      {!inputs.email && erro && (
        <span className={estilos.span}>*Este campo deve ser preenchido</span>
      )}
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
