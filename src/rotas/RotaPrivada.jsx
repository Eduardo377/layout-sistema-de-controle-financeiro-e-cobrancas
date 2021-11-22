import { Navigate, Outlet, useLocation } from "react-router-dom";

const RotaPrivada = () => {
  console.log("Essa é uma rota privada");
  // regras aqui

  return <Outlet />;
};

export default RotaPrivada;
