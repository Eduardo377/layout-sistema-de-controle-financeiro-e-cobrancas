import { memo, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/Autenticação/useAuth";

import estilos from "./estilos.module.css";

import MenuLateral from "./MenuLateral";
import MenuTopo from "./MenuTopo";
import Modal from "@/componentes/Modal";
import Formulario from "./Formulario";

const Padrao = ({ tituloDaRota }) => {
  const [usuario, setUsuario] = useState({});
  const [modal, setModal] = useState(false);
  const [token] = useLocalStorage("token");
  const { deslogar } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const buscaUsuario = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL_BASE}/usuarios`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
    <>
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
    </>
  );
};

export default memo(Padrao);
