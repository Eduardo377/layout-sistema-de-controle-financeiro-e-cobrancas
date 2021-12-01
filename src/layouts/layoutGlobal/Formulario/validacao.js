import * as yup from "yup";

const validacao = yup.object().shape({
  nome: yup.string().required("Este campo deve ser preenchido"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Este campo deve ser preenchido"),
});

export default validacao;
