import { Link, useNavigate } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";
import { formatarPreco } from "../utils/moeda";
import { urlDaImagem } from "../utils/imagens";
import BotaoFavorito from "./BotaoFavorito";

// Usado na grade da loja e nas sugestões do carrinho
export default function CardJogo({ jogo }) {
  const { adicionar } = useCarrinho();
  const navegar = useNavigate();
  const gratuito = Number(jogo.preco) === 0;
  const destino = `/jogo/${jogo.id}`;

  // Clicar em qualquer parte do card abre o jogo, menos nos botões e links (que têm a própria ação)
  function aoClicarNoCard(evento) {
    if (!evento.target.closest("a, button")) navegar(destino);
  }

  return (
    <article className="loja-card" onClick={aoClicarNoCard}>
      <div className="loja-card-img">
        <img src={urlDaImagem(jogo.imagem)} alt={`Capa do jogo ${jogo.nome}`} loading="lazy" />
        <BotaoFavorito jogo={jogo} />
      </div>
      <div className="loja-card-body">
        <div>
          <div className="loja-card-top">
            <h3 className="loja-card-name" title={jogo.nome}>
              {jogo.nome}
            </h3>
            <span className="loja-card-rating">
              <i className="bi bi-star-fill" aria-hidden="true"></i>
              {Number(jogo.avaliacao || 4.5).toFixed(1)}
            </span>
          </div>
          <p className="loja-card-studio">{jogo.estudio || "Estúdio Brasileiro"}</p>
          <Link to={destino} className="loja-card-detalhes">
            Ver detalhes <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>

        <span className={`loja-card-price${gratuito ? " is-free" : ""}`}>{formatarPreco(jogo.preco)}</span>

        <button type="button" className="loja-card-btn" onClick={() => adicionar(jogo)}>
          {gratuito ? "Jogar" : "Adicionar"} <span className="visually-hidden">{jogo.nome} ao carrinho</span>
        </button>
      </div>
    </article>
  );
}
