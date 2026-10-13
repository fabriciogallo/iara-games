export default function AvaliacoesComunidade({ avaliacoes, notaGlobal }) {
  return (
    <section>
      <div className="community-header">
        <h2 className="community-title">O que a comunidade está dizendo</h2>
        {notaGlobal && (
          <div className="text-end">
            <div className="global-score-number">{notaGlobal}</div>
            <div className="global-score-label">Nota Global</div>
          </div>
        )}
      </div>

      {avaliacoes.length === 0 ? (
        <p className="text-secondary">Ainda não há análises deste jogo.</p>
      ) : (
        avaliacoes.map((avaliacao) => (
          <article className="review-card recommend" key={avaliacao.autor}>
            <div className="d-flex align-items-flex-start justify-content-between gap-3 mb-3">
              <div>
                <div className="d-flex align-items-flex-start gap-3 mb-2">
                  <div className="review-avatar" style={{ background: avaliacao.avatarFundo, color: avaliacao.avatarCor }} aria-hidden="true">
                    {avaliacao.letra}
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className={avaliacao.recomenda ? "recommend-icon" : "no-recommend-icon"}>
                      <i className={`bi ${avaliacao.recomenda ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-down-fill"}`} aria-hidden="true"></i>
                    </div>
                    <p className="recommend-title mb-0">{avaliacao.recomenda ? "Recomenda" : "Não recomenda"}</p>
                    <p className="recommend-hours mb-0">{avaliacao.horas}</p>
                  </div>
                </div>
                <p className="review-name mx-1 mt-2 mb-0">{avaliacao.autor}</p>
              </div>
            </div>
            <p className="review-text">{avaliacao.texto}</p>
          </article>
        ))
      )}
    </section>
  );
}
