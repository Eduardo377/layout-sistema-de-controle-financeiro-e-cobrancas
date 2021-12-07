import Toastify from "toastify-js";

const sucesso = (mensagem = "Mensagem de sucesso") => {
  return Toastify({
    text: mensagem,
    close: true,
    gravity: "bottom",
    style: {
      background: "#c3d4fe",
      color: "#243F80",
    },
  });
};

const erro = (mensagem = "Mensagem de erro") => {
  return Toastify({
    text: mensagem,
    close: true,
    gravity: "bottom",
    style: {
      background: "#F48C8C",
      color: "#AE1100",
    },
  });
};

export default { sucesso, erro };
