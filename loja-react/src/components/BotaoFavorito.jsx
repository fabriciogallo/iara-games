import { useAvisos } from "../context/AvisosContext";
import { useFavoritos } from "../context/FavoritosContext";

// Coração sobre a capa do card. Na página do jogo o botão é o "Adicionar aos favoritos" do PainelCompra.
export default function BotaoFavorito({ jogo }) {
  const { favoritos, alternar } = useFavoritos();
  const { avisar } = useAvisos();
  const favorito = favoritos.has(jogo.id);

  function aoClicar(evento) {
    evento.stopPropagation();
    alternar(jogo.id);
    avisar(favorito ? `${jogo.nome} saiu dos favoritos.` : `${jogo.nome} entrou nos favoritos.`);
  }

  return (
    <button
      type="button"
      className={`card-favorito${favorito ? " ativo" : ""}`}
      aria-pressed={favorito}
      aria-label={favorito ? `Tirar ${jogo.nome} dos favoritos` : `Adicionar ${jogo.nome} aos favoritos`}
      onClick={aoClicar}
    >
      <i className={`bi ${favorito ? "bi-heart-fill" : "bi-heart"}`} aria-hidden="true"></i>
    </button>
  );
}
