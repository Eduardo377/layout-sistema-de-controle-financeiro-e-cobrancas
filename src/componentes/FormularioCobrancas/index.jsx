import checkboxDesmarcado from "@/assets/icones/checkbox-desmarcado.svg";
import checkboxMarcado from "@/assets/icones/checkbox-marcado.svg";
import fetcher from "@/constantes/fetcher";
import notify from "@/constantes/notify";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import estilos from "./estilos.module.css";
import validacao from "./validacao";
import defaultValues from "./defaultValues";
import CobrancasContext from "contextos/CobrancasContext";

const FormularioCobrancas = ({ cobranca = {}, cliente, verbo, setModal }) => {
  const { cobrancasCLiente, setCobrancasCLiente } =
    useContext(CobrancasContext);
  const [paga, setPaga] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
    defaultValues: defaultValues(cobranca),
  });

  async function onSubmit(data) {
    setLoading(true);

    data.cliente_id = cliente.id;
    data.paga = paga;

    console.log(data);

    try {
      let response;

      if (verbo === "POST") {
        response = await fetcher("cobrancas", "POST", data);
      } else {
        response = await fetcher("cobrancas", "PUT", data);
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      setCobrancasCLiente([...cobrancasCLiente, responseData]);
      console.log(responseData);
      notify.sucesso("Cobrança cadastrada com sucesso");
      setModal(false);
    } catch (error) {
      setLoading(false);
      notify.erro(error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <label htmlFor="nome">Nome*</label>
          <input
            id="nome"
            {...register("nome")}
            defaultValue={cliente?.nome}
            readOnly
          />
        </div>

        <div className="mb-1">
          <label htmlFor="descricao">Descrição*</label>
          <textarea
            defaultValue={cobranca?.descricao}
            rows="4"
            wrap="hard"
            id="descricao"
            {...register("descricao")}
            placeholder="Digite a descrição"
          ></textarea>
          <p className={`${"inputMensagemErro"}`}>
            {errors.descricao?.message}
          </p>
        </div>

        <div className="flex gap-1 mb-1">
          <div>
            <label htmlFor="data_vencimento">Vencimento*</label>
            <input
              defaultValue={cobranca?.data_vencimento}
              type="date"
              id="data_vencimento"
              {...register("data_vencimento")}
              placeholder="Data de vencimento"
            />
            <p className={`${"inputMensagemErro"}`}>
              {errors.data_vencimento?.message}
            </p>
          </div>

          <div>
            <label htmlFor="valor">Valor*</label>
            <input
              defaultValue={cobranca?.valor}
              type="number"
              step="0.010"
              min="0"
              id="valor"
              {...register("valor")}
              placeholder="Digite o valor"
            />
            <p className={`${"inputMensagemErro"}`}>{errors.valor?.message}</p>
          </div>
        </div>

        <div className="mb-2">
          <label>Status*</label>
          <div
            className={`${estilos.inputRadio} flex items-center gap-1`}
            onClick={() => setPaga(true)}
          >
            {/* <input
              checked={form && form.paga}
              name="status"
              type="radio"
              value={true}
              {...register("paga")}
            /> */}
            {paga ? (
              <img src={checkboxMarcado} alt="marcado" />
            ) : (
              <img src={checkboxDesmarcado} alt="desmarcado" />
            )}{" "}
            Cobrança Paga
          </div>

          <div
            className={`${estilos.inputRadio} flex items-center gap-1`}
            onClick={() => setPaga(false)}
          >
            {/* <input
              checked={form && !form.paga}
              name="status"
              type="radio"
              value={false}
              {...register("paga")}
            /> */}
            {!paga ? (
              <img src={checkboxMarcado} alt="marcado" />
            ) : (
              <img src={checkboxDesmarcado} alt="desmarcado" />
            )}{" "}
            Cobrança Pendente
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="btn-secundario flex-1"
            type="reset"
            onClick={() => setModal(false)}
          >
            Cancelar
          </button>
          <button
            className={`btn-primario flex-1 ${loading && "btn-desabilitado"}`}
            type="submit"
          >
            {loading ? "Carregando" : "Aplicar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormularioCobrancas;
