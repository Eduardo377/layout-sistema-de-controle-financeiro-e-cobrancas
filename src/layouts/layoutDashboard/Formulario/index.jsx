import React, { useState, useEffect } from "react";
import estilos from "./estilos.module.css";

import olhoFechado from "../../../assets/icones/olho.svg";
import olhoAberto from "../../../assets/icones/olho2.png";

const Formulario = () => {
  const [verSenha, setVerSenha] = useState("password");
  const [iconeSenha, setIconeSenha] = useState(olhoFechado);

  useEffect(() => {
    setIconeSenha(verSenha === "password" ? olhoFechado : olhoAberto);
  }, [verSenha]);

  function handleVerSenha() {
    setVerSenha(verSenha === "password" ? "text" : "password");
  }

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-1">
        <label htmlFor="nome">Nome*</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite seu nome"
          required
        />
      </div>

      <div className="mb-1">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div className="flex gap-2 mb-1">
        <div>
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF" />
        </div>

        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="Digite seu telefone"
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
          />
          <img
            src={iconeSenha}
            alt=""
            className={`${estilos.inputContainerIcone}`}
            onClick={handleVerSenha}
          />
        </div>
      </div>

      <div className="text-center">
        <button className="btn-primario">Aplicar</button>
      </div>
    </form>
  );
};

export default Formulario;
