const defaultValues = (cobranca) => {
  return {
    id: cobranca.id || "",
    descricao: cobranca.descricao || "",
    valor: cobranca.valor || "",
    paga: cobranca.paga || true,
    data_vencimento: cobranca.data_vencimento || "",
  };
};

export default defaultValues;
