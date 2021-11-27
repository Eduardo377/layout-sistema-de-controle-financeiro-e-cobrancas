import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validacao from "./validacao";

import estilos from "./estilos.module.css";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1">
        <label htmlFor="nome">Nome*</label>
        <input
          id="nome"
          name="nome"
          placeholder="Digite o nome"
          {...register("nome")}
          className={`${errors.nome && "inputErro"}`}
        />
        <p className={`${"inputMensagemErro"}`}>{errors.nome?.message}</p>
      </div>

      <div className="mb-1">
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          name="email"
          placeholder="Digite o email"
          {...register("email")}
          className={`${errors.email && "inputErro"}`}
        />
        <p className={`${"inputMensagemErro"}`}>{errors.email?.message}</p>
      </div>

      <div className="flex gap-1 mb-1">
        <div>
          <label htmlFor="cpf">CPF*</label>
          <input
            id="cpf"
            name="cpf"
            placeholder="Digite o cpf"
            {...register("cpf")}
            className={`${errors.cpf && "inputErro"}`}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.cpf?.message}</p>
        </div>

        <div>
          <label htmlFor="tel">Telefone*</label>
          <input
            id="tel"
            name="tel"
            placeholder="Digite o telefone"
            {...register("tel")}
            className={`${errors.tel && "inputErro"}`}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.tel?.message}</p>
        </div>
      </div>

      <div className="mb-1">
        <label htmlFor="endereco">Endereço</label>
        <input
          id="endereco"
          name="endereco"
          placeholder="Digite o endereço"
          {...register("endereco")}
        />
      </div>

      <div className="mb-1">
        <label htmlFor="complemento">Complemento</label>
        <input
          id="complemento"
          name="complemento"
          placeholder="Digite o complemento"
          {...register("complemento")}
        />
      </div>

      <div className="flex gap-1 mb-1">
        <div>
          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            name="cep"
            placeholder="Digite o cep"
            {...register("cep")}
          />
        </div>

        <div>
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            name="bairro"
            placeholder="Digite o bairro"
            {...register("bairro")}
          />
        </div>
      </div>

      <div className="flex gap-1 mb-2">
        <div className="flex-1">
          <label htmlFor="cidade">Cidade*</label>
          <input
            id="cidade"
            name="cidade"
            placeholder="Digite a cidade"
            {...register("cidade")}
            className={`${errors.cidade && "inputErro"}`}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.cidade?.message}</p>
        </div>

        <div className={`${estilos.inputContainerUF}`}>
          <label htmlFor="uf">UF*</label>
          <input
            id="uf"
            name="uf"
            placeholder="Digite a UF"
            {...register("uf")}
            className={`${errors.uf && "inputErro"}`}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.uf?.message}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="reset" className="btn-secundario flex-1">
          Cancelar
        </button>
        <button type="submit" className="btn-primario flex-1">
          Aplicar
        </button>
      </div>
    </form>
  );
};

export default Formulario;