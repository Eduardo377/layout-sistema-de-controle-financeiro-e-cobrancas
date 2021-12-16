import olhoFechado from "@/assets/icones/olho.svg";
import olhoAberto from "@/assets/icones/olho2.png";
import sucessoIcone from "@/assets/icones/sucesso.svg";
import UsuarioContext from "@/contextos/UsuarioContext";
import { yupResolver } from "@hookform/resolvers/yup";
import fetcher from "constantes/fetcher";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import estilos from "./estilos.module.css";
import validacao from "./validacao";

const Formulario = () => {
  const { usuario, setUsuario } = useContext(UsuarioContext);

  const [erroEmailExiste, setErroEmailExiste] = useState(false);
  const [erroCpfExiste, setErroCpfExiste] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [verSenha, setVerSenha] = useState("password");
  const [iconeSenha, setIconeSenha] = useState(olhoFechado);
  const [senhaValida, setSenhaValida] = useState(true);
  const [sucesso, setSucesso] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validacao),
    defaultValues: {
      nome: usuario.nome || "",
      email: usuario.email || "",
      cpf: usuario.cpf || "",
      tel: usuario.tel || "",
      senha1: "",
      senha2: "",
    },
  });

  useEffect(() => {
    setIconeSenha(verSenha === "password" ? olhoFechado : olhoAberto);
  }, [verSenha]);

  function handleVerSenha() {
    setVerSenha(verSenha === "password" ? "text" : "password");
  }

  async function onSubmit(data) {
    data.cpf = data.cpf
      .replaceAll(".", "")
      .replaceAll(" ", "")
      .replace("-", "");

    setCarregando(true);
    const { senha1, senha2, ...resto } = data;

    if (senha1 || senha2) {
      if (senha1 !== senha2) {
        setSenhaValida(false);
        setCarregando(false);
        return;
      }
    }

    const dadosASerAtualizado = { ...resto, senha: senha1 };

    try {
      const response = await fetcher("usuarios", "PUT", dadosASerAtualizado);

      const responseData = await response.json();

      if (!response.ok) {
        throw responseData;
      }

      setUsuario(dadosASerAtualizado);
      setCarregando(false);
      setSucesso(true);
    } catch (error) {
      if (error.field === "email") {
        setErroEmailExiste(true);
      }

      if (error.field === "cpf") {
        setErroCpfExiste(true);
      }

      setCarregando(false);
    }
  }

  return (
    <>
      {!sucesso && (
        <div>
          <div className="mb-1">
            <label htmlFor="nome">Nome*</label>
            <input
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              required
              className={`${errors.nome && " inputErro"} ${estilos.input}`}
              {...register("nome")}
            />

            <p className={`${"inputMensagemErro"}`}>{errors.nome?.message}</p>
          </div>

          <div className="mb-1">
            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Digite seu email"
              className={`${errors.email && "inputErro"}`}
              onKeyDown={() => setErroEmailExiste(false)}
              {...register("email")}
            />
            <p className={`${"inputMensagemErro"}`}>{errors.email?.message}</p>
            <p className={`${"inputMensagemErro"}`}>
              {erroEmailExiste && "E-mail já cadastrado."}
            </p>
          </div>

          <div className="flex gap-2 mb-1">
            <div>
              <label htmlFor="cpf">CPF</label>

              <Controller
                control={control}
                name="cpf"
                render={({ field: { onChange, name, value } }) => (
                  <NumberFormat
                    format="###.###.###-##"
                    name={name}
                    value={value}
                    onChange={onChange}
                    onKeyDown={() => setErroCpfExiste(false)}
                  />
                )}
              />

              <p className={`${"inputMensagemErro"}`}>{errors.cpf?.message}</p>
              <p className={`${"inputMensagemErro"}`}>
                {erroCpfExiste && "CPF já cadastrado."}
              </p>
            </div>

            <div>
              <label htmlFor="tel">Telefone</label>

              <Controller
                control={control}
                name="tel"
                render={({ field: { onChange, name, value } }) => (
                  <NumberFormat
                    format="(##) # ####-####"
                    name={name}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="novasenha">Nova Senha</label>
            <div className={`${estilos.inputContainer}`}>
              <input
                type={verSenha}
                name="senha1"
                placeholder=""
                {...register("senha1")}
                onChange={() => setSenhaValida(true)}
                className={`${!senhaValida && "inputErro"}`}
              />
              <img
                src={iconeSenha}
                alt=""
                className={`${estilos.inputContainerIcone}`}
                onClick={handleVerSenha}
              />
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="confirmarsenha">Confirmar Senha</label>
            <div className={`${estilos.inputContainer}`}>
              <input
                type={verSenha}
                name="senha2"
                placeholder=""
                {...register("senha2")}
                onChange={() => setSenhaValida(true)}
                className={`${!senhaValida && "inputErro"}`}
              />

              <img
                src={iconeSenha}
                alt=""
                className={`${estilos.inputContainerIcone}`}
                onClick={handleVerSenha}
              />
            </div>
            <p className={`${"inputMensagemErro"}`}>
              {!senhaValida && "As senhas não coincidem"}
            </p>
          </div>

          <div className="text-center">
            <button
              className={`btn-primario ${carregando && "btn-desabilitado"}`}
              onClick={handleSubmit(onSubmit)}
            >
              {carregando ? "Carregando..." : "Aplicar"}
            </button>
          </div>
        </div>
      )}

      {sucesso && (
        <div className="flex-column items-center gap-2">
          <img src={sucessoIcone} alt="Sucesso" />
          <h3>Cadastro atualizado com sucesso!</h3>
        </div>
      )}
    </>
  );
};

export default Formulario;
