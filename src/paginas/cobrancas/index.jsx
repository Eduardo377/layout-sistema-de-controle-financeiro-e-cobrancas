import { useEffect } from "react";

const Cobrancas = ({ setTituloDaRota }) => {
  useEffect(() => {
    // Não alterar
    setTituloDaRota("Controle de cobranças");
  }, []);

  return <div>Cobrancas</div>;
};

export default Cobrancas;
