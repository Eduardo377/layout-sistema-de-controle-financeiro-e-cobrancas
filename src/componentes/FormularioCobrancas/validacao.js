import * as yup from "yup";

const messagensErro = {
  obrigatorio: "Este campo deve ser preenchido",
};

const validacao = yup.object().shape({
  nome: yup.string().required(messagensErro.obrigatorio),
  descricao: yup.string().required(messagensErro.obrigatorio),
  data_vencimento: yup.string().required(messagensErro.obrigatorio),
  valor: yup.string().required(messagensErro.obrigatorio),
  // paga: yup.boolean().required(messagensErro.obrigatorio),
});

export default validacao;
