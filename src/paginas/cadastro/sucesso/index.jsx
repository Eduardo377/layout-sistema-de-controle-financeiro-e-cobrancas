import sucesso from "../../../assets/icones/sucesso.svg";
import bottomStep3 from "../../../assets/icones/bottom-step3.svg";
import estilos from "./estilos.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../../hooks/Autenticação/useAuth";

const CadastroSucesso = (props) => {
  const navigate = useNavigate();
  const { etapaCadastro } = useAuth();

  useEffect(() => {
    if (etapaCadastro !== 3) {
      return navigate("/cadastro/inicio");
    }
    // eslint-disable-next-line
  }, []);

  const handleOnClick = () => {
    return navigate("/login");
  };
  return (
    <div className="flex-column items-center">
      <div className={estilos.div}>
        <img src={sucesso} alt="sucesso" />
        <h2>Cadastro realizado com sucesso!</h2>
      </div>
      <button
        onClick={handleOnClick}
        className={`${estilos.button} btn-primario`}
      >
        Ir para Login
      </button>
      <img className={estilos.img} src={bottomStep3} alt="bottom-step-3" />
    </div>
  );
};

export default CadastroSucesso;
