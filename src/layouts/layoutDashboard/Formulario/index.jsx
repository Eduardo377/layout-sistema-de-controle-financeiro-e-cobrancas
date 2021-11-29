import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validacao from "./validacao";

import estilos from "./estilos.module.css";

import olhoFechado from "../../../assets/icones/olho.svg";
import olhoAberto from "../../../assets/icones/olho2.png";
import sucessoIcone from "../../../assets/icones/sucesso.svg";

const Formulario = ({ usuario, setUsuario, setModal }) => {
  const [token] = useLocalStorage("token");
  const [erroEmailExiste, setErroEmailExiste] = useState(false);
  const [erroCpfExiste, setErroCpfExiste] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [verSenha, setVerSenha] = useState("password");
  const [iconeSenha, setIconeSenha] = useState(olhoFechado);
  const [senhaValida, setSenhaValida] = useState(true);
  const [sucesso, setSucesso] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  useEffect(() => {
    setIconeSenha(verSenha === "password" ? olhoFechado : olhoAberto);
  }, [verSenha]);

  function handleVerSenha() {
    setVerSenha(verSenha === "password" ? "text" : "password");
  }

  function checaSeSenhaSaoIguais(senha1, senha2) {
    if (senha1 !== senha2) {
      return setSenhaValida(false);
    }

    return setSenhaValida(true);
  }

  async function onSubmit(data) {
    setCarregando(true);
    const { senha1, senha2, ...resto } = data;

    if (senha1 || senha2) {
      checaSeSenhaSaoIguais(senha1, senha2);
    }

    const dadosASerAtualizado = { ...resto, senha: senha1 };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL_BASE}/usuarios`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dadosASerAtualizado),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      setUsuario(dadosASerAtualizado);
      setCarregando(false);
      setSucesso(true);
    } catch (error) {
      if (error.message === "O email já existe" || error.field === "email") {
        setErroEmailExiste(true);
      }
      setCarregando(false);
    }
  }

  return (
    <>
      {!sucesso && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <label htmlFor="nome">Nome*</label>
            <input
              defaultValue={usuario?.nome}
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              {...register("nome", {
                required: true,
              })}
              className={`${errors.nome && " inputErro"}`}
            />

            <p className={`${"inputMensagemErro"}`}>{errors.nome?.message}</p>
          </div>

          <div className="mb-1">
            <label htmlFor="email">Email*</label>
            <input
              defaultValue={usuario?.email}
              id="email"
              name="email"
              placeholder="Digite seu email"
              {...register("email", { required: true })}
              onChange={() => setErroEmailExiste(false)}
              className={`${errors.email && "inputErro"}`}
            />
            <p className={`${"inputMensagemErro"}`}>{errors.email?.message}</p>
            <p className={`${"inputMensagemErro"}`}>
              {erroEmailExiste && "E-mail já cadastrado."}
            </p>
          </div>

          <div className="flex gap-2 mb-1">
            <div>
              <label htmlFor="cpf">CPF</label>
              <input
                defaultValue={usuario?.cpf}
                type="text"
                id="cpf"
                name="cpf"
                placeholder="Digite seu CPF"
                {...register("cpf")}
              />
            </div>

            <div>
              <label htmlFor="tel">Telefone</label>
              <input
                defaultValue={usuario?.tel}
                type="tel"
                id="tel"
                name="tel"
                placeholder="Digite seu telefone"
                {...register("tel")}
              />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="novasenha">Nova Senha</label>
            <div className={`${estilos.inputContainer}`}>
              <input
                type={verSenha}
                id="novasenha"
                name="novasenha"
                placeholder=""
                {...register("senha1")}
                onChange={() => setSenhaValida(true)}
                className={`${!senhaValida && "inputErro"}`}
              />
              <img
                src={iconeSenha}
                alt=""
                className={`${estilos.inputContainerIcone}`}
                onClick={handleVerSenha}
              />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="confirmarsenha">Confirmar Senha</label>
            <div className={`${estilos.inputContainer}`}>
              <input
                type={verSenha}
                id="confirmarsenha"
                name="confirmarsenha"
                placeholder=""
                {...register("senha2")}
                onChange={() => setSenhaValida(true)}
                className={`${!senhaValida && "inputErro"}`}
              />

              <img
                src={iconeSenha}
                alt=""
                className={`${estilos.inputContainerIcone}`}
                onClick={handleVerSenha}
              />
            </div>
            <p className={`${"inputMensagemErro"}`}>
              {!senhaValida && "As senhas não coincidem"}
            </p>
          </div>

          <div className="text-center">
            <button
              className={`btn-primario ${carregando && "btn-desabilitado"}`}
            >
              {carregando ? "Carregando..." : "Aplicar"}
            </button>
          </div>
        </form>
      )}

      {sucesso && (
        <div className="flex-column items-center gap-2">
          <img src={sucessoIcone} alt="Sucesso" />
          <h3>Cadastro atualizado com sucesso!</h3>
        </div>
      )}
    </>
  );
};

export default Formulario;
