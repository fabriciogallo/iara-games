import { Link } from "react-router-dom";
import { useCarrinho } from "../../context/CarrinhoContext";
import { formatarPreco } from "../../utils/moeda";
import { urlDaImagem } from "../../utils/imagens";

// Jogos que ainda não têm página completa: mostra o básico e deixa comprar, igual ao card da loja
export default function EmDesenvolvimento({ jogo }) {
  const { adicionar } = useCarrinho();

  return (
    <main className="py-5">
      <div className="container text-center py-5">
        <img src={urlDaImagem(jogo.imagem)} alt={`Capa do jogo ${jogo.nome}`} className="em-desenvolvimento-capa mb-4" />
        <h1 className="fw-bold mb-1">{jogo.nome}</h1>
        <p className="text-secondary mb-1">
          {jogo.estudio} · {jogo.categoria}
        </p>
        <p className="lead text-warning mb-4">{formatarPreco(jogo.preco)}</p>

        <p className="mb-4 text-secondary">
          <i className="bi bi-tools me-2" aria-hidden="true"></i>
          Estamos preparando a página de detalhes deste jogo. Volte em breve para conferir!
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button type="button" className="btn btn-warning fw-bold px-4 py-2" onClick={() => adicionar(jogo)}>
            {Number(jogo.preco) === 0 ? "Jogar agora" : "Adicionar ao carrinho"}
          </button>
          <Link to="/" className="btn btn-outline-light px-4 py-2">
            Voltar para a loja
          </Link>
        </div>
      </div>
    </main>
  );
}
