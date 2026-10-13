// A primeira imagem ocupa duas linhas da grade (classe "tall"); as outras ficam menores ao lado
export default function GaleriaImagens({ imagens, titulo }) {
  if (imagens.length === 0) return null;

  return (
    <div className="mb-5">
      <h2 className="gallery-section-title">Imagens</h2>
      <div className="gallery-grid">
        {imagens.map((src, indice) => (
          <div className={`gallery-item${indice === 0 ? " tall" : ""}`} key={src}>
            <img src={src} alt={`Cena ${indice + 1} de ${titulo}`} className="gallery-img" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
