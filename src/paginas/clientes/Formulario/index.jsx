import fetcher from "@/constantes/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import estilos from "./estilos.module.css";
import validacao from "./validacao";
import { useParams } from "react-router";

const Formulario = ({
  setModal,
  setAlerta,
  setClientes,
  clientes,
  setCliente,
  cliente,
  verbo,
}) => {
  const [erroEmailExiste, setErroEmailExiste] = useState(false);
  const [erroCpfExiste, setErroCpfExiste] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { id: clienteID } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  async function cadastrarCliente(data) {
    setCarregando(true);

    try {
      let response;

      if (verbo === "POST") {
        response = await fetcher(`clientes`, verbo, data);
      } else {
        response = await fetcher(`clientes/${cliente.id}`, verbo, data);
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      if (verbo === "POST") {
        setClientes([...clientes, responseData[0]]);
      } else {
        setCliente({ id: clienteID, ...data });
      }

      setModal(false);
      setAlerta(true);
    } catch (error) {
      if (error.field === "email") {
        setErroEmailExiste(true);
      }

      if (error.field === "cpf") {
        setErroCpfExiste(true);
      }

      setCarregando(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(cadastrarCliente)}>
        <div className="mb-1">
          <label htmlFor="nome">Nome*</label>
          <input
            defaultValue={cliente?.nome}
            id="nome"
            name="nome"
            placeholder="Digite o nome"
            {...register("nome", {
              required: true,
            })}
            className={`${errors.nome && "inputErro"}`}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.nome?.message}</p>
        </div>

        <div className="mb-1">
          <label htmlFor="email">Email*</label>
          <input
            defaultValue={cliente?.email}
            id="email"
            name="email"
            placeholder="Digite o email"
            {...register("email")}
            className={`${errors.email && "inputErro"}`}
            onChange={() => setErroEmailExiste(false)}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.email?.message}</p>
          <p className={`${"inputMensagemErro"}`}>
            {erroEmailExiste && "E-mail já cadastrado"}
          </p>
        </div>

        <div className="flex gap-1 mb-1">
          <div>
            <label htmlFor="cpf">CPF*</label>
            <input
              defaultValue={cliente?.cpf}
              id="cpf"
              name="cpf"
              placeholder="Digite o cpf"
              {...register("cpf")}
              className={`${errors.cpf && "inputErro"}`}
              onChange={() => setErroCpfExiste(false)}
            />
            <p className={`${"inputMensagemErro"}`}>{errors.cpf?.message}</p>
            <p className={`${"inputMensagemErro"}`}>
              {erroCpfExiste && "CPF já cadastrado"}
            </p>
          </div>

          <div>
            <label htmlFor="telefone">Telefone*</label>
            <input
              defaultValue={cliente?.telefone}
              id="telefone"
              name="telefone"
              placeholder="Digite o telefone"
              {...register("telefone")}
              className={`${errors.telefone && "inputErro"}`}
            />
            <p className={`${"inputMensagemErro"}`}>
              {errors.telefone?.message}
            </p>
          </div>
        </div>

        <div className="mb-1">
          <label htmlFor="endereco">Endereço</label>
          <input
            defaultValue={cliente?.endereco}
            id="endereco"
            name="endereco"
            placeholder="Digite o endereço"
            {...register("endereco")}
          />
        </div>

        <div className="mb-1">
          <label htmlFor="complemento">Complemento</label>
          <input
            defaultValue={cliente?.complemento}
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
              defaultValue={cliente?.cep}
              id="cep"
              name="cep"
              placeholder="Digite o cep"
              {...register("cep")}
            />
          </div>

          <div>
            <label htmlFor="bairro">Bairro</label>
            <input
              defaultValue={cliente?.bairro}
              id="bairro"
              name="bairro"
              placeholder="Digite o bairro"
              {...register("bairro")}
            />
          </div>
        </div>

        <div className="flex gap-1 mb-2">
          <div className="flex-1">
            <label htmlFor="cidade">Cidade</label>
            <input
              defaultValue={cliente?.cidade}
              id="cidade"
              name="cidade"
              placeholder="Digite a cidade"
              {...register("cidade")}
              className={`${errors.cidade && "inputErro"}`}
            />
            <p className={`${"inputMensagemErro"}`}>{errors.cidade?.message}</p>
          </div>

          <div className={`${estilos.inputContainerUF}`}>
            <label htmlFor="uf">UF</label>
            <input
              defaultValue={cliente?.uf}
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
          <button
            type="reset"
            className="btn-secundario flex-1"
            onClick={() => setModal(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`btn-primario flex-1 ${
              carregando && "btn-desabilitado"
            }`}
          >
            {carregando ? "Carregando..." : "Aplicar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Formulario;
