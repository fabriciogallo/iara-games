import { useState } from "react";
import estadosDoBrasil from "../data/mapa-brasil.json";
import { useTituloDaPagina } from "../hooks/usePagina";

function MapaBrasil({ uf }) {
  return (
    <svg className="regiao-mapa" viewBox="0 0 450 460" role="img" aria-label={uf ? `Mapa do Brasil com ${uf} em destaque` : "Mapa dos estados brasileiros"}>
      {estadosDoBrasil.map((estado) => (
        <path key={estado.uf} d={estado.contorno} data-uf={estado.uf} className={estado.uf === uf ? "regiao-estado-ativo" : undefined} />
      ))}
    </svg>
  );
}

function EnderecoEncontrado({ endereco }) {
  const campos = [
    ["Logradouro", endereco.logradouro],
    ["Complemento", endereco.complemento],
    ["Bairro", endereco.bairro],
    ["Cidade", endereco.localidade],
    ["Estado", endereco.estado ? `${endereco.estado} (${endereco.uf})` : endereco.uf],
    ["Região", endereco.regiao],
    ["CEP", endereco.cep],
  ];

  return (
    <section className="regiao-resultado" aria-labelledby="titulo-endereco">
      <h2 id="titulo-endereco" className="h5">Endereço encontrado</h2>
      <dl className="mb-0">
        {campos.filter(([, valor]) => valor).map(([rotulo, valor]) => (
          <div key={rotulo}>
            <dt>{rotulo}</dt>
            <dd>{valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function MinhaRegiao() {
  useTituloDaPagina("Minha região | Iara Games");

  const [cep, definirCep] = useState("");
  const [endereco, definirEndereco] = useState(null);
  const [mensagemErro, definirMensagemErro] = useState("");
  const [cepInvalido, definirCepInvalido] = useState(false);
  const [carregando, definirCarregando] = useState(false);

  function alterarCep(evento) {
    definirCep(evento.target.value);
    definirEndereco(null);
    definirMensagemErro("");
    definirCepInvalido(false);
  }

  async function consultarCep(evento) {
    evento.preventDefault();
    if (carregando) return;

    const cepLimpo = cep.replace(/\D/g, "");
    definirEndereco(null);
    definirMensagemErro("");
    definirCepInvalido(false);

    if (cepLimpo.length !== 8) {
      definirCepInvalido(true);
      definirMensagemErro("Digite um CEP com 8 números.");
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
        definirMensagemErro("CEP não encontrado. Confira os números e tente novamente.");
        return;
      }

      definirEndereco(dados);
    } catch {
      definirMensagemErro("Não foi possível consultar o ViaCEP agora. Tente novamente.");
    } finally {
      definirCarregando(false);
    }
  }

  return (
    <main className="container-xl regiao-pagina py-5">
      <div className="regiao-intro mb-4">
        <p className="regiao-selo mb-2">IARA GAMES / MINHA REGIÃO</p>
        <h1 className="title">Descubra sua região na Iara Games</h1>
        <p className="mb-0">Consulte seu CEP para ver o endereço e localizar seu estado no mapa do Brasil.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="regiao-painel h-100">
            <form onSubmit={consultarCep} noValidate>
              <label className="form-label fw-semibold" htmlFor="regiao-cep">CEP</label>
              <div className="d-flex flex-wrap gap-2">
                <input
                  id="regiao-cep"
                  name="cep"
                  className="form-control regiao-campo"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="00000-000"
                  aria-describedby="regiao-ajuda regiao-erro"
                  aria-invalid={cepInvalido || undefined}
                  required
                  readOnly={carregando}
                  value={cep}
                  onChange={alterarCep}
                />
                <button type="submit" className="btn btn-warning fw-semibold" disabled={carregando}>Consultar CEP</button>
              </div>
              <p id="regiao-ajuda" className="regiao-ajuda small mt-2 mb-0">Informe os 8 dígitos, com ou sem hífen.</p>
              <div id="regiao-erro" className="regiao-erro" role="alert">{mensagemErro}</div>
            </form>
            <div role="status" className="regiao-status">
              {carregando && <p className="mt-3 mb-0">Consultando o ViaCEP…</p>}
              {endereco && <EnderecoEncontrado endereco={endereco} />}
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <figure className="regiao-painel h-100 mb-0 text-center">
            <h2 className="h5">Mapa do Brasil</h2>
            <MapaBrasil uf={endereco?.uf} />
            <figcaption className="regiao-ajuda">
              {endereco ? `${endereco.localidade} · ${endereco.uf}` : "O estado será destacado após a consulta."}
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
