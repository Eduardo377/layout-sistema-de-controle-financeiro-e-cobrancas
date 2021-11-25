import { useEffect, useState } from "react";

import estilos from "./estilos.module.css";

import ClientesIcone from "../../assets/icones/clientes";
import lupaIcone from "../../assets/icones/lupa.svg";
import Modal from "../../componentes/Modal";

const Clientes = ({ setTituloDaRota }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setTituloDaRota("Controle de clientes");
  }, []);

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={`${estilos.clientesSecao}`}>
      <section className={`flex items-center`}>
        <div className={`flex items-center flex-1 gap-1`}>
          <ClientesIcone tamanho={2} />
          <h2>Clientes</h2>
        </div>

        <div className={`flex  gap-1`}>
          <button className="btn-primario" onClick={() => setModal(true)}>
            + Adicionar cliente
          </button>
          <div className={`${estilos.inputContainer}`}>
            <input type="text" placeholder="Pesquisa" />
            <img
              src={lupaIcone}
              alt="lupa"
              className={`${estilos.inputIcone}`}
            />
          </div>
        </div>
      </section>

      <section></section>

      <Modal modal={modal} handleModal={setModal}>
        <div className="flex gap-1 items-center mb-2">
          <ClientesIcone tamanho={2} />
          <h3>Cadastro do cliente</h3>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-1">
            <label htmlFor="nome">Nome*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite o nome"
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite o email"
              required
            />
          </div>

          <div className="flex gap-1 mb-1">
            <div>
              <label htmlFor="cpf">CPF*</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="Digite o cpf"
                required
                inputMode="numeric"
              />
            </div>

            <div>
              <label htmlFor="telefone">Telefone*</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                placeholder="Digite o telefone"
                required
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              placeholder="Digite o endereço"
            />
          </div>

          <div className="mb-1">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              placeholder="Digite o complemento"
            />
          </div>

          <div className="flex gap-1 mb-1">
            <div>
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="Digite o cep"
                inputMode="numeric"
              />
            </div>

            <div>
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                placeholder="Digite o bairro"
              />
            </div>
          </div>

          <div className="flex gap-1 mb-2">
            <div className="flex-1">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                placeholder="Digite a cidade"
              />
            </div>

            <div className={`${estilos.inputContainerUF}`}>
              <label htmlFor="uf">UF</label>
              <input type="text" id="uf" name="uf" placeholder="Digite a UF" />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="reset"
              className="btn-secundario flex-1"
              onClick={() => setModal(false)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primario flex-1">
              Aplicar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Clientes;
