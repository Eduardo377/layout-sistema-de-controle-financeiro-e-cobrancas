import Modal from "@/componentes/Modal";
import fetcher from "@/constantes/fetcher";
import useAuth from "@/hooks/Autenticação/useAuth";
import { memo, useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import estilos from "./estilos.module.css";
import Formulario from "./Formulario";
import MenuLateral from "./MenuLateral";
import MenuTopo from "./MenuTopo";
import { UsuarioContextProvider } from "@/contextos/UsuarioContext";
import notify from "constantes/notify";

const Padrao = ({ tituloDaRota }) => {
  const [usuario, setUsuario] = useState({});
  const [modal, setModal] = useState(false);

  const { deslogar } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const buscaUsuario = async () => {
      try {
        const response = await fetcher("usuarios");

        const responseData = await response.json();

        if (!response.ok) {
          throw responseData;
        }

        setUsuario(responseData);
      } catch (error) {
        if (error.message === "jwt expired") {
          alert("Sua sessão expirou. Faça login novamente");

          deslogar(() => navigate("/login"));
        }
      }
    };

    buscaUsuario();
  }, []);

  return (
    <UsuarioContextProvider>
      <div className={`${estilos.layout}`}>
        <MenuLateral />

        <div className={`${estilos.main}`}>
          <MenuTopo
            setModal={setModal}
            tituloDaRota={tituloDaRota}
            usuario={usuario}
            setUsuario={setUsuario}
          />

          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>

      <Modal modal={modal} handleModal={setModal}>
        <h3 className="text-center mb-2">Edite seu cadastro</h3>

        <Formulario
          usuario={usuario}
          setUsuario={setUsuario}
          setModal={setModal}
        />
      </Modal>
    </UsuarioContextProvider>
  );
};

export default memo(Padrao);
