import checkboxDesmarcado from "@/assets/icones/checkbox-desmarcado.svg";
import checkboxMarcado from "@/assets/icones/checkbox-marcado.svg";
import fetcher from "@/constantes/fetcher";
import notify from "@/constantes/notify";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import estilos from "./estilos.module.css";
import validacao from "./validacao";
import defaultValues from "./defaultValues";
import CobrancasContext from "contextos/CobrancasContext";
import CobrancasIcone from "@/assets/icones/cobrancas";

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

  useEffect(() => {
    if (verbo === "PUT") {
      return setPaga(cobranca.paga);
    }
    setPaga(true);
  }, []);

  async function onSubmit(data) {
    setLoading(true);

    data.paga = paga;

    data.data_vencimento = data.data_vencimento.substring(0, 10);

    try {
      let response;

      if (verbo === "POST") {
        data.cliente_id = cliente.id;
        response = await fetcher("cobrancas", "POST", data);
      } else {
        response = await fetcher("cobranca", "PUT", data);
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      if (verbo === "POST") {
        setCobrancasCLiente([...cobrancasCLiente, responseData]);
        notify.sucesso("Cobrança cadastrada com sucesso");
      } else {
        notify.sucesso("Cobrança editada com sucesso");
      }

      setModal(false);
    } catch (error) {
      setLoading(false);
      notify.erro(error.message);
      setModal(false);
    }
  }

  return (
    <>
      <div className="flex gap-1 items-center mb-2">
        <CobrancasIcone tamanho={2} />
        <h3>{verbo === "POST" ? "Cadastro" : "Edição"} de cobrança</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <label htmlFor="nome">Nome*</label>
          <input
            id="nome"
            {...register("nome")}
            defaultValue={cliente?.nome || cliente}
            readOnly
          />
        </div>

        <div className="mb-1">
          <label htmlFor="descricao">Descrição*</label>
          <textarea
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
