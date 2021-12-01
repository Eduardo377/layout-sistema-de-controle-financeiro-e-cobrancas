import * as yup from "yup";

const messagensErro = {
  obrigatorio: "Este campo deve ser preenchido",
};

const validacao = yup.object().shape({
  nome: yup.string().required(messagensErro.obrigatorio),
  email: yup
    .string()
    .email("Informe um email válido")
    .required(messagensErro.obrigatorio),
  cpf: yup.string().required(messagensErro.obrigatorio),
  telefone: yup.string().required(messagensErro.obrigatorio),
  cidade: yup.string(),
  uf: yup.string(),
});

export default validacao;
