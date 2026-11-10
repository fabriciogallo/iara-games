import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AvisoRapido from "./AvisoRapido";
import CarrinhoGaveta from "./CarrinhoGaveta";
import Navbar from "./Navbar";
import Rodape from "./Rodape";

export default function Layout() {
  const { pathname } = useLocation();
  const conteudo = useRef(null);

  // Trocar de página começa sempre no topo (a paginação da loja tem o próprio scroll)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  function focarConteudo(evento) {
    evento.preventDefault();
    conteudo.current?.focus();
  }

  return (
    <>
      <a className="pular-conteudo" href="#conteudo" onClick={focarConteudo}>
        Pular para o conteúdo
      </a>
      <Navbar />
      <div id="conteudo" ref={conteudo} tabIndex={-1}>
        <Outlet />
      </div>
      <Rodape />
      <CarrinhoGaveta />
      <AvisoRapido />
    </>
  );
}
