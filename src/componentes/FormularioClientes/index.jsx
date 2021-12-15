import fetcher from "@/constantes/fetcher";
import { yupResolver } from "@hookform/resolvers/yup";
import notify from "@/constantes/notify";
import React, { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useParams } from "react-router";
import estilos from "./estilos.module.css";
import validacao from "./validacao";
import defaultValues from "./defaultValues";

import ClientesContext from "@/contextos/ClientesContext";

const Formulario = ({ setModal, verbo }) => {
  const { clientes, setClientes, cliente, setCliente } =
    useContext(ClientesContext);

  const [erroEmailExiste, setErroEmailExiste] = useState(false);
  const [erroCpfExiste, setErroCpfExiste] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { id: clienteID } = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
    defaultValues: defaultValues(cliente),
  });

  async function cadastrarCliente(data) {
    setCarregando(true);

    data.cpf = data.cpf
      .replaceAll(".", "")
      .replaceAll(" ", "")
      .replace("-", "");

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
        notify.sucesso("Cadastro concluído com sucesso");
      } else {
        setCliente({ id: clienteID, ...data });
        notify.sucesso("Edições do cadastro conluídas com sucesso");
      }

      setModal(false);
    } catch (error) {
      console.log(error);
      if (error.field === "email") {
        setErroEmailExiste(true);
      }

      if (error.field === "cpf") {
        setErroCpfExiste(true);
      }

      if (!error.field) {
        notify.erro(error.message);
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
            onKeyDown={() => setErroEmailExiste(false)}
          />
          <p className={`${"inputMensagemErro"}`}>{errors.email?.message}</p>
          <p className={`${"inputMensagemErro"}`}>
            {erroEmailExiste && "E-mail já cadastrado"}
          </p>
        </div>

        <div className="flex gap-1 mb-1">
          <div>
            <label htmlFor="cpf">CPF*</label>

            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, name, value } }) => (
                <NumberFormat
                  format="###.###.###-##"
                  name={name}
                  value={value}
                  onChange={onChange}
                  onKeyDown={() => setErroCpfExiste(false)}
                />
              )}
            />

            {/* <input
              defaultValue={cliente?.cpf}
              id="cpf"
              name="cpf"
              placeholder="Digite o cpf"
              {...register("cpf")}
              className={`${errors.cpf && "inputErro"}`}
              onChange={() => setErroCpfExiste(false)}
            /> */}
            <p className={`${"inputMensagemErro"}`}>{errors.cpf?.message}</p>
            <p className={`${"inputMensagemErro"}`}>
              {erroCpfExiste && "CPF já cadastrado"}
            </p>
          </div>

          <div>
            <label htmlFor="telefone">Telefone*</label>

            <Controller
              control={control}
              name="telefone"
              render={({ field: { onChange, name, value } }) => (
                <NumberFormat
                  format="(##) # ####-####"
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {/* <input
              defaultValue={cliente?.telefone}
              id="telefone"
              name="telefone"
              placeholder="Digite o telefone"
              {...register("telefone")}
              className={`${errors.telefone && "inputErro"}`}
            /> */}
            <p className={`${"inputMensagemErro"}`}>
              {errors.telefone?.message}
            </p>
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
            <label htmlFor="cidade">Cidade</label>
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
            <label htmlFor="uf">UF</label>
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
