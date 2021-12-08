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
  cpf: yup
    .string()
    .test("min11", "O cpf precisa ter 11 dígitos", (value) => {
      const valueFormated = value
        .replaceAll(".", "")
        .replaceAll(" ", "")
        .replace("-", "");

      if (valueFormated.length === 0 || valueFormated.length === 11) {
        return true;
      }

      return false;
    })
    .required(messagensErro.obrigatorio),
  telefone: yup.string().required(messagensErro.obrigatorio),
  cidade: yup.string(),
  uf: yup.string(),
});

export default validacao;
