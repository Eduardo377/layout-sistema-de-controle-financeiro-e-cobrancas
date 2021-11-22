import { Navigate, Outlet, useLocation } from "react-router-dom";

const RotaPrivada = () => {
  const { pathname } = useLocation();
  console.log("Essa é uma rota privada => " + pathname);

  // regras aqui

  return <Outlet />;
};

export default RotaPrivada;
