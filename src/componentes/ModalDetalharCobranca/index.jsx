import estilos from "./estilos.module.css";
import fechar from "@/assets/icones/fechar.svg";
import CobrancasIcone from "@/assets/icones/cobrancas";

const ModalDetalharCobranca = ({
  setModalDetalhar,
  modalDetalhar,
  currentCobranca,
}) => {
  const escolherEstiloDeStatus = (status) => {
    console.log(status);
    if (status === "Paga") return estilos.paga;
    if (status === "Pendente") return estilos.pendente;
    return estilos.vencida;
  };

  return (
    <div
      onClick={() => setModalDetalhar(false)}
      className={`${estilos.container} flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${estilos.card} flex-column scale-in-center`}
      >
        <div className={`flex mb-1`} style={{ marginTop: "1.5rem" }}>
          <img
            onClick={() => setModalDetalhar(false)}
            className={`${estilos.close}`}
            src={fechar}
            alt="fechar"
          />
          <CobrancasIcone tamanho={2} />
          <h1 className={estilos.h1}>Detalhe da Cobrança</h1>
        </div>
        <label className={estilos.label} style={{ marginBottom: "0.5rem" }}>
          Nome
        </label>
        <span style={{ marginBottom: "1.5rem" }}>{currentCobranca.nome}</span>
        <label className={estilos.label} style={{ marginBottom: "0.5rem" }}>
          descricao
        </label>
        <span style={{ marginBottom: "1.5rem" }}>
          {currentCobranca.descricao}
        </span>
        <div className={`flex mb-2`} style={{ gap: "6rem" }}>
          <div className={`flex-column gap-1`}>
            <label className={estilos.label}>Vencimento</label>
            <span>{`${new Date(
              currentCobranca.data_vencimento
            ).toLocaleDateString("pt-BR", { timeZone: "UTC" })}`}</span>
          </div>
          <div className={`flex-column gap-1`}>
            <label className={estilos.label}>Valor</label>
            <span>
              {(currentCobranca.valor / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
        <div className={`flex`} style={{ gap: "6rem" }}>
          <div className={`flex-column gap-1`}>
            <label className={estilos.label}>ID cobranças</label>
            <span>{currentCobranca.id}</span>
          </div>
          <div className={`flex-column gap-1`}>
            <label className={estilos.label}>Status</label>
            <span
              className={`${() =>
                escolherEstiloDeStatus(currentCobranca.status)}`}
            >
              {currentCobranca.status}
            </span>
          </div>
        </div>
      </div>
      {console.log(currentCobranca)}
    </div>
  );
};

export default ModalDetalharCobranca;
