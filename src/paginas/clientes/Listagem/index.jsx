import criarCorancaIcone from "@/assets/icones/criar-cobranca.svg";
import setasOrdenacaoIcone from "@/assets/icones/setas-ordenacao.svg";
import FormularioCobrancas from "@/componentes/FormularioCobrancas";
import Modal from "@/componentes/Modal";
import ClientesContext from "@/contextos/ClientesContext";
import CobrancasContext from "@/contextos/CobrancasContext";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import estilos from "./estilos.module.css";
import semResultados from "@/assets/semresultados.png";
import clientesVazioIcone from "@/assets/icones/clientes-vazio.svg";
import { useSearchParams } from "react-router-dom";
import uuid from "react-uuid";

const Listagem = ({ pesquisa }) => {
  const { clientes, loadingClientes, setClientes } =
    useContext(ClientesContext);

  const [modal, setModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({});
  const [ordenado, setOrdenado] = useState(true);

  const [searchParams] = useSearchParams();
  const ordenaPorInadimplentes = searchParams.get("inadimplentes");

  function cadastrarCobranca(cliente) {
    setModal(true);
    setCurrentCliente(cliente);
  }

  const ordenarClientes = () => {
    const listaOrdenada = clientes.sort((a, b) => {
      if (a.nome > b.nome) {
        return ordenado ? 1 : -1;
      }

      if (a.nome < b.nome) {
        return ordenado ? -1 : 1;
      }

      return 0;
    });

    setClientes([...listaOrdenada]);
    setOrdenado(!ordenado);
  };

  useEffect(() => {
    if (pesquisa) {
      pesquisarCliente();
    }
  }, [pesquisa]);

  const pesquisarCliente = () => {
    clientes.map((cliente) => {
      const nome = cliente.nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      cliente.show = false;

      if (nome.includes(pesquisa)) {
        cliente.show = true;
      }
    });
  };

  if (loadingClientes) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {clientes.length === 0 && (
        <div
          className="flex justify-center"
          style={{
            background: "white",
            borderRadius: "30px",
            padding: "5rem 0",
          }}
        >
          <img
            src={clientesVazioIcone}
            alt="Nenhum resultado encontrado"
            style={{ width: "20rem" }}
          />
        </div>
      )}

      {clientes.length > 0 && (
        <div className={`${estilos.clientesSecao}`}>
          <section className={`${estilos.listagem}`}>
            <div className={`${estilos.listagemHeader}`}>
              <span
                className="flex items-center gap-1"
                onClick={ordenarClientes}
              >
                <img src={setasOrdenacaoIcone} alt="" />
                <span>Cliente</span>
              </span>
              <span>CPF</span>
              <span>E-mail</span>
              <span>Telefone</span>
              <span>Status</span>
              <span>Criar Cobrança</span>
            </div>

            <ul className={`${estilos.listagemBody}`}>
              {clientes &&
                clientes.map((cliente) => (
                  <li
                    key={uuid()}
                    className={`
                    ${!cliente.show && pesquisa && "hidden"}
                    ${
                      ordenaPorInadimplentes &&
                      cliente.inadimplente !==
                        JSON.parse(ordenaPorInadimplentes) &&
                      "hidden"
                    }
                    `}
                  >
                    <span>
                      <Link to={`${cliente.id}`}>{cliente.nome}</Link>
                    </span>
                    <span>
                      {String(cliente.cpf).replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/,
                        "$1.$2.$3-$4"
                      )}
                    </span>
                    <span>{cliente.email}</span>
                    <span>{cliente.telefone}</span>
                    <span
                      className={`${estilos.status} ${
                        cliente.inadimplente
                          ? estilos.statusVermelho
                          : estilos.statusVerde
                      }`}
                    >
                      {cliente.inadimplente ? "Inadimplente" : "Em dia"}
                    </span>
                    <span onClick={() => cadastrarCobranca(cliente)}>
                      <img src={criarCorancaIcone} alt="criar conbrança" />
                      <span>Cobrança</span>
                    </span>
                  </li>
                ))}
            </ul>

            {clientes.every((cliente) => cliente.show === false) && pesquisa && (
              <div className="flex justify-center">
                <img
                  src={semResultados}
                  alt="Nenhum resultado encontrado"
                  style={{ maxWidth: "40em" }}
                />
              </div>
            )}
          </section>
        </div>
      )}

      <Modal modal={modal} handleModal={setModal}>
        <FormularioCobrancas
          setModal={setModal}
          cliente={currentCliente}
          verbo="POST"
        />
      </Modal>
    </>
  );
};

export default Listagem;
