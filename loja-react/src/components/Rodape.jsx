import { Link } from "react-router-dom";
import { urlDaImagem } from "../utils/imagens";
import { urlPlataforma } from "../utils/plataforma";

export default function Rodape() {
  const pagina = (caminho) => urlPlataforma(`pages/${caminho}`);

  return (
    <footer className="halt-footer">
      <div className="halt-footer-grid">
        <div className="halt-footer-brand">
          <div className="halt-footer-logo">
            <img src={urlDaImagem("assets/images/logo-iara-games.svg")} alt="Iara Games" />
            <span>Iara Games</span>
          </div>
          <p>A plataforma de jogos desenvolvidos por brasileiros ou jogos ambientados no Brasil.</p>
        </div>

        <div className="halt-footer-col">
          <h5>Produto</h5>
          <ul>
            <li>
              <Link to="/">Loja</Link>
            </li>
            <li>
              <a href={pagina("add-game.html")}>Adicionar Jogo</a>
            </li>
            <li>
              <Link to="/carrinho">Carrinho</Link>
            </li>
            <li>
              <a href={pagina("suporte.html")}>Suporte</a>
            </li>
          </ul>
        </div>

        <div className="halt-footer-col">
          <h5>Desenvolvedores</h5>
          <ul>
            <li>
              <a href={pagina("add-game.html")}>Publicar Jogo</a>
            </li>
            <li>
              <a href={pagina("suporte.html")}>Documentação</a>
            </li>
            <li>
              <a href={pagina("suporte.html")}>API</a>
            </li>
            <li>
              <a href={pagina("suporte.html")}>Ferramentas</a>
            </li>
          </ul>
        </div>

        <div className="halt-footer-col">
          <h5>Legal</h5>
          <ul>
            <li>
              <a href={pagina("termos-condicoes.html")}>Termos de Uso</a>
            </li>
            <li>
              <a href={pagina("politica-privacidade.html")}>Privacidade</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="halt-footer-bottom">
        <p>© 2026 Iara Games. Todos os direitos reservados.</p>
        <div className="halt-footer-social">
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <i className="bi bi-twitter-x me-1" aria-hidden="true"></i>Twitter
          </a>
          <a href="https://discord.com" target="_blank" rel="noreferrer">
            <i className="bi bi-discord me-1" aria-hidden="true"></i>Discord
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram me-1" aria-hidden="true"></i>Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
