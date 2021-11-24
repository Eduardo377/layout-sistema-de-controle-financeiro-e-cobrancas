import { Link } from "react-router-dom";
import stepBottom1 from "../../../assets/icones/bottom-step1.svg";
import estilos from "./estilos.module.css";
import { useState } from "react";

const CadastroInicio = (props) => {
  const [inputs, setInputs] = useState({ nome: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputOnchange = (target) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${estilos.form} flex-column items-center`}
    >
      <h2>Adicione seus dados</h2>
      <label className={`${estilos.label} flex-column`}>
        Nome*
        <input
          className={`${estilos.input}`}
          type="text"
          name="nome"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => inputOnchange(e.target)}
          value={inputs.nome}
          placeholder="Digite seu nome"
        />
      </label>
      <label>
        <label className={`${estilos.label} flex-column`}>
          E-mail*
          <input
            className={`${estilos.input}`}
            type="email"
            name="email"
            style={{ marginBottom: "1rem" }}
            onChange={(e) => inputOnchange(e.target)}
            value={inputs.email}
            placeholder="Digite seu e-mail"
          />
        </label>
      </label>
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

export default CadastroInicio;
