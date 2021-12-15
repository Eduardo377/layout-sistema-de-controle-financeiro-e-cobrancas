const defaultValues = (cliente) => {
  return {
    nome: cliente.nome || "",
    email: cliente.email || "",
    cpf: cliente.cpf || "",
    telefone: cliente.telefone || "",
    endereco: cliente.endereco || "",
    complemento: cliente.complemento || "",
    cep: cliente.cep || "",
    bairro: cliente.bairro || "",
    cidade: cliente.cidade || "",
    uf: cliente.uf,
  };
};

export default defaultValues;
