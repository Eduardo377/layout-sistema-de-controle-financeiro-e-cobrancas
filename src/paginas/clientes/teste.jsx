import { useState } from "react";

import Modal from "@/componentes/Modal";
import FormularioCobrancas from "@componentes/FormularioCobrancas";

const Teste = () => {
  const [modalCobranca, setModalCobranca] = useState(false);
  const [formCobrancas, setFormCobrancas] = useState({
    paga: false,
    valor: 500,
    vencimento: "2021-11-30",
    descricao: "Essa é a descrição da cobrança",
    nome: "Lucas Kennedy",
  });

  return (
    <>
      <Modal modal={modalCobranca} handleModal={setModalCobranca}>
        <div className="flex gap-1 items-center mb-2">
          <h3>Cadastro de cobrança</h3>
        </div>

        <FormularioCobrancas
          setModal={setModalCobranca}
          form={formCobrancas}
          setForm={setFormCobrancas}
          carregando={false}
        />
      </Modal>
    </>
  );
};

export default Teste;
