import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/Autenticação/useAuth";
import estilos from "./estilos.module.css";
import imgLogin from "../../assets/img-login.png";
import FormularioLogin from "../../componentes/FormularioLogin";

const Login = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex">
      <aside className={estilos.aside}>
        <img
          className={estilos.img}
          src={imgLogin}
          alt="escrivaninha e computador"
        />
        <h3 className={estilos.h2}>
          Gerencie todos os pagamentos
          <br /> da sua empresa em um só <br />
          lugar.
        </h3>
      </aside>
      <main className={`${estilos.main} flex justify-center`}>
        <FormularioLogin />
      </main>
    </div>
  );
};

export default Login;
