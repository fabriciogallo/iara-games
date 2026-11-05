import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAvisos } from "../context/AvisosContext";
import { useCarrinho } from "../context/CarrinhoContext";
import { urlDaImagem } from "../utils/imagens";
import { urlPlataforma } from "../utils/plataforma";

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { resumo, abrirGaveta } = useCarrinho();
  const { avisar } = useAvisos();
  const { pathname } = useLocation();

  // "Loja" continua marcada na página de um jogo
  const naLoja = pathname === "/" || pathname.startsWith("/jogo");
  const quantidade = resumo.totalItens;

  return (
    <header>
      <nav className="navbar navbar-expand-lg px-3 px-lg-5 py-3" aria-label="Principal">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2" href={urlPlataforma("index.html")}>
            <img src={urlDaImagem("assets/images/logo-iara-games.svg")} alt="Logo da Iara Games" width="56" height="46" />
            <span className="fw-bold fs-3 title text-white">Iara Games</span>
          </a>

          <button
            className="navbar-toggler border-secondary text-white"
            type="button"
            aria-controls="menu-principal"
            aria-expanded={menuAberto}
            aria-label="Abrir menu de navegação"
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${menuAberto ? " show" : ""}`} id="menu-principal">
            <ul className="navbar-nav mx-auto mb-3 mb-lg-0 gap-2 gap-lg-3 text-center">
              <li className="nav-item">
                <a className="nav-link text-white px-3 fw-semibold" href={urlPlataforma("index.html")}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 fw-semibold ${naLoja ? "text-warning active" : "text-white"}`}
                  to="/"
                  aria-current={naLoja ? "page" : undefined}
                  onClick={() => setMenuAberto(false)}
                >
                  Loja
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white px-3 fw-semibold" href={urlPlataforma("pages/add-game.html")}>
                  Desenvolvedor
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white px-3 fw-semibold" href={urlPlataforma("pages/suporte.html")}>
                  Suporte
                </a>
              </li>
            </ul>

            <div className="d-flex justify-content-center align-items-center gap-3">
              <button
                type="button"
                className="carrinho-btn"
                onClick={abrirGaveta}
                aria-label={`Abrir carrinho de compras, ${quantidade} ${quantidade === 1 ? "item" : "itens"}`}
              >
                <span>Carrinho</span>
                <i className="bi bi-cart3" aria-hidden="true"></i>
                <span className="carrinho-contador" style={{ display: quantidade > 0 ? "inline-flex" : "none" }} aria-hidden="true">
                  {quantidade}
                </span>
              </button>
              <button type="button" className="login-btn" onClick={() => avisar("O login chega numa próxima versão da plataforma.")}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
