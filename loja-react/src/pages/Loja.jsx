import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CardJogo from "../components/CardJogo";
import FiltrosLoja from "../components/FiltrosLoja";
import Paginacao from "../components/Paginacao";
import { useFavoritos } from "../context/FavoritosContext";
import { useTituloDaPagina } from "../hooks/usePagina";
import { filtrarJogos, obterTodosJogos, ordenarJogos, paginar } from "../utils/catalogo";

// O que é "padrão" não vai pra URL: /#/ é a loja sem filtro nenhum
const PADRAO = { categoria: "Todos", ordem: "relevancia", busca: "", pagina: "1" };

export default function Loja() {
  useTituloDaPagina("Loja — Iara Games");

  const todos = useMemo(obterTodosJogos, []);
  const { favoritos } = useFavoritos();
  const [params, setParams] = useSearchParams();
  const gradeRef = useRef(null);

  // Os filtros moram na URL: dá pra compartilhar o link e o botão "voltar" do navegador funciona
  const categoria = params.get("categoria") ?? PADRAO.categoria;
  const busca = params.get("busca") ?? PADRAO.busca;
  const ordem = params.get("ordem") ?? PADRAO.ordem;

  const filtrados = useMemo(
    () => ordenarJogos(filtrarJogos(todos, { categoria, busca, favoritos }), ordem),
    [todos, categoria, busca, ordem, favoritos],
  );
  const { itens, pagina, totalPaginas } = paginar(filtrados, params.get("pagina"));

  function mudar(mudancas, { substituir = false, manterPagina = false } = {}) {
    const novos = new URLSearchParams(params);
    for (const [chave, valor] of Object.entries(mudancas)) {
      if (valor === PADRAO[chave]) novos.delete(chave);
      else novos.set(chave, valor);
    }
    if (!manterPagina) novos.delete("pagina");
    setParams(novos, { replace: substituir });
  }

  function irParaPagina(numero) {
    mudar({ pagina: String(numero) }, { manterPagina: true });
    gradeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const semFiltro = categoria === "Todos" && busca.trim() === "";
  const subtitulo = semFiltro
    ? "Mostrando todos os jogos disponíveis na Iara Games"
    : `Mostrando ${filtrados.length} de ${todos.length} jogos disponíveis`;

  return (
    <main className="loja-main">
      <div className="container-fluid px-0">
        <div className="loja-header-block">
          <div>
            <h1 className="loja-title">Loja</h1>
            <p className="loja-subtitle" aria-live="polite">
              {subtitulo}
            </p>
          </div>

          <FiltrosLoja
            categoria={categoria}
            busca={busca}
            ordem={ordem}
            totalFavoritos={favoritos.size}
            aoMudarCategoria={(valor) => mudar({ categoria: valor })}
            aoMudarBusca={(valor) => mudar({ busca: valor }, { substituir: true })}
            aoMudarOrdem={(valor) => mudar({ ordem: valor })}
          />
        </div>

        <div className="loja-grid" ref={gradeRef}>
          {itens.length === 0 ? (
            <div className="loja-empty">
              <i className="bi bi-search display-1 text-secondary mb-3 d-block" aria-hidden="true"></i>
              <h2 className="h4 text-white">{categoria === "Favoritos" && busca === "" ? "Você ainda não favoritou nenhum jogo" : "Nenhum jogo encontrado"}</h2>
              <p className="text-secondary">
                {categoria === "Favoritos" && busca === ""
                  ? "Toque no coração de um jogo para guardá-lo aqui."
                  : "Tente escolher outra categoria ou limpar a pesquisa."}
              </p>
              <button type="button" className="btn btn-outline-warning mt-2" onClick={() => setParams({})}>
                Limpar filtros
              </button>
            </div>
          ) : (
            itens.map((jogo) => <CardJogo key={jogo.id} jogo={jogo} />)
          )}
        </div>

        <Paginacao pagina={pagina} totalPaginas={totalPaginas} aoMudar={irParaPagina} />
      </div>
    </main>
  );
}
