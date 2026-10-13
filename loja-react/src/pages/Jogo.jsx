import { useMemo } from "react";
import { useParams } from "react-router-dom";
import AvaliacoesComunidade from "../components/jogo/AvaliacoesComunidade";
import CardEstudio from "../components/jogo/CardEstudio";
import EmDesenvolvimento from "../components/jogo/EmDesenvolvimento";
import GaleriaImagens from "../components/jogo/GaleriaImagens";
import HeroJogo from "../components/jogo/HeroJogo";
import PainelCompra from "../components/jogo/PainelCompra";
import { DETALHES } from "../data/detalhes";
import { useClasseNoBody, useTituloDaPagina } from "../hooks/usePagina";
import { obterTodosJogos } from "../utils/catalogo";
import { urlDaImagem } from "../utils/imagens";
import NaoEncontrado from "./NaoEncontrado";

export default function Jogo() {
  const { id } = useParams();
  const jogo = useMemo(() => obterTodosJogos().find((candidato) => candidato.id === id), [id]);
  const detalhes = jogo ? DETALHES[jogo.id] : undefined;

  // "pagina-interna" coloca a navbar por cima da capa (regra do CSS da plataforma)
  useClasseNoBody("pagina-interna", Boolean(detalhes));
  useTituloDaPagina(jogo ? `${jogo.nome} — Iara Games` : "Jogo não encontrado — Iara Games");

  if (!jogo) return <NaoEncontrado mensagem="Não encontramos esse jogo no catálogo." />;
  if (!detalhes) return <EmDesenvolvimento jogo={jogo} />;

  return (
    <main>
      <HeroJogo detalhes={detalhes} />

      <div className="main-content">
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="mb-5">
              <h2 className="description-title">{detalhes.descricaoTitulo}</h2>
              <p className="description-text">{detalhes.descricaoTexto}</p>
            </div>

            {detalhes.classificacao && (
              <div className="row g-3 mb-5">
                <div className="col-md-6">
                  <div className="age-card">
                    <img src={urlDaImagem(detalhes.classificacao.imagem)} alt={detalhes.classificacao.titulo} className="age-badge-img" />
                    <div className="age-text">
                      <p className="age-title">{detalhes.classificacao.titulo}</p>
                      <p className="age-desc">{detalhes.classificacao.descricao}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <GaleriaImagens imagens={detalhes.galeria} titulo={detalhes.titulo} />
            <AvaliacoesComunidade avaliacoes={detalhes.avaliacoes} notaGlobal={detalhes.notaGlobal} />
            <CardEstudio estudio={detalhes.estudio} />
          </div>

          <PainelCompra jogo={jogo} detalhes={detalhes} />
        </div>
      </div>
    </main>
  );
}
