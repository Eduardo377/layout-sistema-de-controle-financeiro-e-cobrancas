import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const LayoutClientes = ({ setTituloDaRota }) => {
  useEffect(() => {
    setTituloDaRota("clientes");
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutClientes;
