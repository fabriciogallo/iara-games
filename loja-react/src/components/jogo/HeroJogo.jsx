// Capa grande da página do jogo: gêneros, título, desenvolvedora, data e nota
export default function HeroJogo({ detalhes }) {
  return (
    <section
      className="hero-interna"
      style={{ backgroundImage: `url("${detalhes.heroImagem}")`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-tags">
          {detalhes.tags.map((tag) => (
            <span className="hero-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <h1 className="hero-title">{detalhes.titulo}</h1>
        {detalhes.subtitulo && <p className="hero-sub">{detalhes.subtitulo}</p>}

        <div className="hero-meta">
          <span>
            Desenvolvedora: <strong>{detalhes.desenvolvedora}</strong>
          </span>
          <span>
            Data de lançamento: <strong>{detalhes.lancamento}</strong>
          </span>
          {detalhes.nota && (
            <span>
              Nota: <span className="stars-yellow">{detalhes.nota}</span>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
