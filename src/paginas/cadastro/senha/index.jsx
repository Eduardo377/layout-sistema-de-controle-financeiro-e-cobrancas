import { Link } from "react-router-dom";
import stepBottom2 from "../../../assets/icones/bottom-step2.svg";
import estilos from "./estilos.module.css";
import olho from "../../../assets/icones/olho.svg";
import olhoAberto from "../../../assets/icones/olho2.png";
import { useState } from "react";

const CadastroSenha = () => {
  const [olhaAberto, setOlhoAberto] = useState(false);
  const [inputSenha, setInputSenha] = useState({ senha: "", repeticao: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const inputOnchange = (target) => {
    setInputSenha({ ...inputSenha, [target.name]: target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${estilos.form} flex-column items-center`}
    >
      <h2>Escolha uma senha</h2>
      <label className={`${estilos.label} flex-column`}>
        Senha*
        <input
          className={`${estilos.input}`}
          type={`${olhaAberto ? "text" : "password"}`}
          name="senha"
          style={{ marginBottom: "1rem" }}
          value={inputSenha.senha}
          onChange={(e) => inputOnchange(e.target)}
          placeholder="••••••••"
        />
        <img
          onClick={() => setOlhoAberto(!olhaAberto)}
          className={estilos.olho}
          src={olhaAberto ? olhoAberto : olho}
          alt="ver senha"
        />
      </label>
      <label className={`${estilos.label} flex-column`}>
        Repita a senha*
        <input
          className={`${estilos.input}`}
          type={`${olhaAberto ? "text" : "password"}`}
          name="repeticao"
          style={{ marginBottom: "1rem" }}
          value={inputSenha.repeticao}
          onChange={(e) => inputOnchange(e.target)}
          placeholder="••••••••"
        />
        <img
          onClick={() => setOlhoAberto(!olhaAberto)}
          className={estilos.olho}
          src={olhaAberto ? olhoAberto : olho}
          alt="ver senha"
        />
      </label>
      <button className={`${estilos.button} btn-primario`} type="submit">
        Cadastrar
      </button>
      <p>
        Já possui uma conta? Faça seu <Link to="/login">Login</Link>
      </p>
      <img className={estilos.img} src={stepBottom2} alt="step-bottom-2" />
    </form>
  );
};

export default CadastroSenha;
