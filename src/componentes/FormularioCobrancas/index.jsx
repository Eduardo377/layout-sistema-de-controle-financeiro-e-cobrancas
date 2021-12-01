import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validacao from "./validacao";

import estilos from "./estilos.module.css";

import checkboxMarcado from "@/assets/icones/checkbox-marcado.svg";
import checkboxDesmarcado from "@/assets/icones/checkbox-desmarcado.svg";

const FormularioCobrancas = ({
  form = {},
  setForm,
  cliente,
  carregando,
  setModal,
}) => {
  const [paga, setPaga] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
  });

  useEffect(() => {
    if (form.paga !== undefined) {
      setPaga(form.paga);
    }
  }, []);

  async function onSubmit(data) {
    data.paga = paga;
    data.valor = Number(data.valor);
    console.log(data);

    if (form && setForm) {
      setForm(data);
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
            defaultValue={form?.nome || cliente}
            readOnly
          />
        </div>

        <div className="mb-1">
          <label htmlFor="descricao">Descrição*</label>
          <textarea
            defaultValue={form?.descricao}
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
              defaultValue={form?.data_vencimento}
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
              defaultValue={form?.valor}
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
            className={`btn-primario flex-1 ${
              carregando && "btn-desabilitado"
            }`}
            type="submit"
          >
            {carregando ? "Carregando" : "Aplicar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default FormularioCobrancas;
