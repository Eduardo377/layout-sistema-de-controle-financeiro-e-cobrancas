import { Link, useNavigate } from "react-router-dom";
import stepBottom2 from "../../../assets/icones/bottom-step2.svg";
import estilos from "./estilos.module.css";
import olho from "../../../assets/icones/olho.svg";
import olhoAberto from "../../../assets/icones/olho2.png";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/Autenticação/useAuth";
import useRequests from "../../../hooks/Requisições/useRequests";

const FormularioSenha = () => {
  const [olhaAberto, setOlhoAberto] = useState(false);
  const [inputSenha, setInputSenha] = useState({ senha: "", repeticao: "" });
  const [mensagemErro, setMensagemErro] = useState("*As senhas não coincidem");
  const [erro, setErro] = useState(false);

  const navigate = useNavigate();
  const { etapaCadastro, setEtapaCadastro, dadosCadastro, setDadosCadastro } =
    useAuth();
  const { cadastrarUsuario } = useRequests();

  useEffect(() => {
    if (etapaCadastro !== 2) {
      return navigate("/cadastro/inicio");
    }
  }, []);

  useEffect(() => {
    if (inputSenha.senha !== inputSenha.repeticao) {
      setMensagemErro("*As senhas não coincidem");
      return setErro(true);
    }

    if (!inputSenha.senha && !inputSenha.repeticao) {
      setMensagemErro("*Preencha os campos obrigatórios");
      return setErro(true);
    }
    return setErro(false);
  }, [inputSenha]);

  useEffect(() => {
    return setErro(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputSenha.senha || !inputSenha.repeticao) {
      return window.alert("ERRO: preencha os campos obrigatórios!");
    }

    if (inputSenha.senha !== inputSenha.repeticao) {
      return window.alert("ERRO: senhas não coincidem!");
    }
    const { senha } = inputSenha;
    const body = { ...dadosCadastro };
    body.senha = senha;
    const response = await cadastrarUsuario(body);
    if (response) {
      setEtapaCadastro(3);
      return navigate("/cadastro/sucesso");
    }
  };

  const inputOnchange = (target) => {
    setInputSenha({ ...inputSenha, [target.name]: target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${estilos.form} flex-column items-center`}
    >
      <h2 className="mb-2">Escolha uma senha</h2>
      <label className={`${estilos.label} flex-column`}>
        Senha*
        <input
          className={`${estilos.input} ${erro ? estilos.erro : ""}`}
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
      {erro && <span className={estilos.span}>{mensagemErro}</span>}
      <label className={`${estilos.label} flex-column`}>
        Repita a senha*
        <input
          className={`${estilos.input} ${erro ? estilos.erro : ""}`}
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
      {erro && <span className={estilos.span}>{mensagemErro}</span>}
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

export default FormularioSenha;
