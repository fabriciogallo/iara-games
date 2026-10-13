import { useAvisos } from "../../context/AvisosContext";
import { useCarrinho } from "../../context/CarrinhoContext";
import { useFavoritos } from "../../context/FavoritosContext";
import { formatarPreco } from "../../utils/moeda";

// Coluna da direita: preço, comprar, favoritar, requisitos do sistema e plataformas
export default function PainelCompra({ jogo, detalhes }) {
  const { adicionar } = useCarrinho();
  const { favoritos, alternar } = useFavoritos();
  const { avisar } = useAvisos();
  const favorito = favoritos.has(jogo.id);
  const gratuito = Number(jogo.preco) === 0;

  function favoritar() {
    alternar(jogo.id);
    avisar(favorito ? `${jogo.nome} saiu dos favoritos.` : `${jogo.nome} entrou nos favoritos.`);
  }

  return (
    <div className="col-lg-4">
      <div className="sidebar-sticky">
        <div className="sidebar-card">
          <div className="price-row">
            <span className="price-label">Preço do jogo</span>
            <span className="price-value">{formatarPreco(jogo.preco)}</span>
          </div>

          <button type="button" className="btn-buy" onClick={() => adicionar(jogo)}>
            <i className="bi bi-cart-fill" aria-hidden="true"></i>
            {gratuito ? "Jogar agora" : "Comprar jogo"}
          </button>
          <button type="button" className="btn-wish" aria-pressed={favorito} onClick={favoritar}>
            <i className={`bi ${favorito ? "bi-heart-fill" : "bi-heart"}`} aria-hidden="true"></i>
            {favorito ? "Nos favoritos" : "Adicionar aos favoritos"}
          </button>

          <hr className="sidebar-divider" />

          <div className="sidebar-section-header">
            <i className="bi bi-display" aria-hidden="true"></i>
            <h2 className="sidebar-section-label">Especificações do Sistema</h2>
          </div>
          <div className="specs-grid">
            {detalhes.specs.map((spec) => (
              <div key={spec.rotulo}>
                <p className="spec-label">{spec.rotulo}</p>
                <p className="spec-value">{spec.valor}</p>
              </div>
            ))}
          </div>

          <div className="sidebar-section-header">
            <i className="bi bi-device-ssd" aria-hidden="true"></i>
            <h2 className="sidebar-section-label">Disponível para</h2>
          </div>
          <div className="platform-btns">
            {detalhes.plataformas.map((icone) => (
              <div className="platform-btn" key={icone}>
                <i className={`bi ${icone}`} aria-hidden="true"></i>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
