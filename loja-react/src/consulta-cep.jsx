import { useState } from "react";
import { createRoot } from "react-dom/client";

function selecionarRegiao(endereco) {
  document.dispatchEvent(new CustomEvent("iara:localizar-cep", { detail: endereco }));
}

function ConsultaCep() {
  const [cep, definirCep] = useState("");
  const [endereco, definirEndereco] = useState(null);
  const [erro, definirErro] = useState("");
  const [cepInvalido, definirCepInvalido] = useState(false);
  const [carregando, definirCarregando] = useState(false);

  function alterarCep(evento) {
    definirCep(evento.target.value);
    definirErro("");
    definirCepInvalido(false);
  }

  async function consultarCep(evento) {
    evento.preventDefault();
    if (carregando) return;

    const cepLimpo = cep.replace(/\D/g, "");
    definirEndereco(null);
    definirErro("");
    definirCepInvalido(false);
    selecionarRegiao(null);

    if (cepLimpo.length !== 8) {
      definirCepInvalido(true);
      definirErro("Digite um CEP com 8 números.");
      return;
    }

    definirCarregando(true);
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
        signal: AbortSignal.timeout(10000),
      });
      if (!resposta.ok) throw new Error("Falha na consulta de CEP");

      const dados = await resposta.json();
      if (dados.erro === true || dados.erro === "true") {
        definirCepInvalido(true);
        definirErro("CEP não encontrado. Confira os números e tente novamente.");
        return;
      }
      if (!dados.localidade || !dados.uf) throw new Error("Endereço incompleto");

      definirEndereco(dados);
      selecionarRegiao(dados);
    } catch {
      definirErro("Não foi possível consultar o ViaCEP agora. Tente novamente.");
    } finally {
      definirCarregando(false);
    }
  }

  return (
    <form className="explore-cep" onSubmit={consultarCep} noValidate>
      <label className="visually-hidden" htmlFor="mapa-cep">Encontre sua região pelo CEP</label>
      <div className="explore-cep-controles">
        <div className="explore-cep-campo">
        <i className="bi bi-search" aria-hidden="true"></i>
        <input
          id="mapa-cep"
          name="cep"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="Digite seu CEP e encontre os jogos da sua região"
          aria-describedby="mapa-cep-erro"
          aria-invalid={cepInvalido || undefined}
          required
          readOnly={carregando}
          value={cep}
          onChange={alterarCep}
        />
        </div>
        <button className="explore-cep-buscar" type="submit" disabled={carregando}>
          Buscar
        </button>
      </div>
      <div className="explore-cep-erro" id="mapa-cep-erro" role="alert">{erro}</div>
      <div className="explore-cep-resultado" role="status">
        {carregando && "Consultando CEP…"}
        {endereco && [
          endereco.logradouro,
          endereco.complemento,
          endereco.bairro,
          `${endereco.localidade} – ${endereco.uf}`,
          endereco.cep,
        ].filter(Boolean).join(" · ")}
      </div>
    </form>
  );
}

const formulario = document.getElementById("consulta-cep");
if (formulario) createRoot(formulario).render(<ConsultaCep />);
