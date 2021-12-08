import estilos from "./estilos.module.css";

import fecharIcone from "../../assets/icones/fechar.svg";

const Modal = ({ children, modal, handleModal }) => {
  function fechaModal() {
    handleModal(false);
  }

  return (
    <>
      {modal && (
        <div className={`${estilos.modal}`}>
          <div
            className={`${estilos.modalContainer} scale-in-center`}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={fecharIcone}
              alt="fechar"
              className={`${estilos.fecharIcone}`}
              onClick={fechaModal}
            />
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
