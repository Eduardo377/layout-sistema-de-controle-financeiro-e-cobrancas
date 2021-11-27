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
  tel: yup.string().required(messagensErro.obrigatorio),
  cidade: yup.string().required(messagensErro.obrigatorio),
  uf: yup.string().required(messagensErro.obrigatorio),
});

export default validacao;
