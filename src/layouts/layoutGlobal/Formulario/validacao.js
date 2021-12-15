import * as yup from "yup";

const validacao = yup.object().shape({
  nome: yup.string().required("Este campo deve ser preenchido"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Este campo deve ser preenchido"),
  cpf: yup.string().test("min11", "O cpf precisa ter 11 dígitos", (value) => {
    const valueFormated = value
      .replaceAll(".", "")
      .replaceAll(" ", "")
      .replace("-", "");

    if (valueFormated.length === 0 || valueFormated.length === 11) {
      return true;
    }

    return false;
  }),
});

export default validacao;
