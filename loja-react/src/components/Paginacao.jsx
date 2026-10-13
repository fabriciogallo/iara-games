import { paginasVisiveis } from "../utils/catalogo";

export default function Paginacao({ pagina, totalPaginas, aoMudar }) {
  if (totalPaginas <= 1) return null;

  return (
    <nav className="loja-pagination" aria-label="Paginação de jogos">
      <button type="button" className="loja-page-btn" disabled={pagina === 1} aria-label="Página anterior" onClick={() => aoMudar(pagina - 1)}>
        <i className="bi bi-chevron-left" aria-hidden="true"></i>
      </button>

      {paginasVisiveis(pagina, totalPaginas).map((item, indice) =>
        item === "..." ? (
          <span className="loja-page-btn is-ellipsis" key={`reticencias-${indice}`} aria-hidden="true">
            ...
          </span>
        ) : (
          <button
            type="button"
            key={item}
            className={`loja-page-btn${item === pagina ? " active" : ""}`}
            aria-label={`Página ${item}`}
            aria-current={item === pagina ? "page" : undefined}
            onClick={() => aoMudar(item)}
          >
            {item}
          </button>
        ),
      )}

      <button type="button" className="loja-page-btn" disabled={pagina === totalPaginas} aria-label="Próxima página" onClick={() => aoMudar(pagina + 1)}>
        <i className="bi bi-chevron-right" aria-hidden="true"></i>
      </button>
    </nav>
  );
}
