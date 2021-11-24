import { useEffect } from "react";

const Cobrancas = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("Cobranças");
  }, []);

  return <div>Cobrancas</div>;
};

export default Cobrancas;
