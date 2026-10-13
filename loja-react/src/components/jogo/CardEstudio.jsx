export default function CardEstudio({ estudio }) {
  return (
    <div className="dev-card">
      <div className="dev-logo">
        <img src={estudio.logo} alt={`Ícone de ${estudio.nome}`} />
      </div>
      <div>
        <p className="dev-name">{estudio.nome}</p>
        <p className="dev-desc">{estudio.descricao}</p>
        {estudio.links.map((link) => (
          <a href={link.url} target="_blank" rel="noreferrer" className="dev-link" key={link.url}>
            {link.rotulo}
          </a>
        ))}
      </div>
    </div>
  );
}
