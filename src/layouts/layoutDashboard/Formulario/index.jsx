import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validacao from "./validacao";

import estilos from "./estilos.module.css";

import olhoFechado from "../../../assets/icones/olho.svg";
import olhoAberto from "../../../assets/icones/olho2.png";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  const [verSenha, setVerSenha] = useState("password");
  const [iconeSenha, setIconeSenha] = useState(olhoFechado);
  const [senhaValida, setSenhaValida] = useState(true);

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

  function onSubmit(data) {
    const { senha1, senha2, ...resto } = data;

    if (senha1 || senha2) {
      checaSeSenhaSaoIguais(senha1, senha2);
    }

    console.log({ ...resto, senha: senha1 });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1">
        <label htmlFor="nome">Nome*</label>
        <input
          defaultValue="Lorena Ribeiro"
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
          defaultValue="lorena@email.com"
          id="email"
          name="email"
          placeholder="Digite seu email"
          {...register("email", { required: true })}
          className={`${errors.email && "inputErro"}`}
        />
        <p className={`${"inputMensagemErro"}`}>{errors.email?.message}</p>
      </div>

      <div className="flex gap-2 mb-1">
        <div>
          <label htmlFor="cpf">CPF</label>
          <input
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
        <button className="btn-primario">Aplicar</button>
      </div>
    </form>
  );
};

export default Formulario;