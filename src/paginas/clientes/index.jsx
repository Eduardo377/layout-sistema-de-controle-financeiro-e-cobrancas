import { useEffect } from "react";

const Clientes = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("Clientes");
  }, []);

  return <div>Clientes</div>;
};

export default Clientes;
