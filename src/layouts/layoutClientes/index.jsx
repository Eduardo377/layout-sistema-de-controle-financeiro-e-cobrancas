import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const LayoutClientes = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("Clientes");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutClientes;
