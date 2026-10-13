import { CATEGORIAS, ORDENACOES } from "../utils/catalogo";

// Categorias, favoritos, ordenação e busca. Quem guarda o estado (na URL) é a página da loja.
export default function FiltrosLoja({ categoria, busca, ordem, totalFavoritos, aoMudarCategoria, aoMudarBusca, aoMudarOrdem }) {
  return (
    <div className="loja-filters-row">
      <div className="loja-tabs-group">
        <span className="loja-tabs-label">Filtros</span>
        <div className="loja-tabs" role="group" aria-label="Filtrar por categoria">
          {CATEGORIAS.map(({ valor, rotulo }) => (
            <button
              type="button"
              key={valor}
              className={`loja-tab${categoria === valor ? " active" : ""}`}
              aria-pressed={categoria === valor}
              onClick={() => aoMudarCategoria(valor)}
            >
              {rotulo}
            </button>
          ))}
          <button
            type="button"
            className={`loja-tab${categoria === "Favoritos" ? " active" : ""}`}
            aria-pressed={categoria === "Favoritos"}
            onClick={() => aoMudarCategoria("Favoritos")}
          >
            <i className="bi bi-heart-fill me-1" aria-hidden="true"></i>Favoritos ({totalFavoritos})
          </button>
        </div>
      </div>

      <div className="loja-actions-group">
        <label className="loja-sort">
          <span>Ordenar por:</span>
          <select value={ordem} onChange={(evento) => aoMudarOrdem(evento.target.value)} aria-label="Ordenar jogos">
            {ORDENACOES.map(({ valor, rotulo }) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>
          <i className="bi bi-chevron-down" aria-hidden="true"></i>
        </label>

        <div className="loja-search">
          <i className="bi bi-search" aria-hidden="true"></i>
          <input type="search" value={busca} onChange={(evento) => aoMudarBusca(evento.target.value)} placeholder="Buscar jogos" aria-label="Buscar jogo por nome" />
        </div>
      </div>
    </div>
  );
}
