import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CardJogo from "../components/CardJogo";
import { useCarrinho } from "../context/CarrinhoContext";
import { useTituloDaPagina } from "../hooks/usePagina";
import { escolherRecomendados, obterTodosJogos } from "../utils/catalogo";
import { formatarMoeda } from "../utils/moeda";
import { urlDaImagem } from "../utils/imagens";

export default function Carrinho() {
  useTituloDaPagina("Carrinho — Iara Games");

  const { itens, resumo, cupom, mudarQuantidade, remover, aplicarCupom, limpar } = useCarrinho();
  const [codigo, setCodigo] = useState(cupom ?? "");
  const [resultadoCupom, setResultadoCupom] = useState(null);
  const [pedido, setPedido] = useState(null);

  const todos = useMemo(obterTodosJogos, []);
  const idsNoCarrinho = itens.map((item) => item.id).join("|");
  // Sorteia de novo só quando o conteúdo do carrinho muda (senão as sugestões trocariam a cada clique)
  const recomendados = useMemo(() => escolherRecomendados(todos, idsNoCarrinho.split("|")), [todos, idsNoCarrinho]);

  function enviarCupom(evento) {
    evento.preventDefault();
    setResultadoCupom(aplicarCupom(codigo));
  }

  function finalizar() {
    setPedido({ numero: `IARA-${Date.now().toString(36).toUpperCase()}`, total: resumo.total, itens: resumo.totalItens });
    limpar();
  }

  const mensagemCupom = resultadoCupom
    ? { texto: resultadoCupom.mensagem, ok: resultadoCupom.status === "ok" }
    : cupom
      ? { texto: `Cupom ${cupom} ativo (-${resumo.percentual * 100}% de desconto)!`, ok: true }
      : null;

  if (pedido) {
    return (
      <main className="carrinho-pg-hero">
        <div className="pedido-confirmado" role="status">
          <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
          <h1>Pedido de demonstração finalizado!</h1>
          <p>
            Obrigado por apoiar os jogos brasileiros. Pedido <strong>{pedido.numero}</strong>: {pedido.itens} {pedido.itens === 1 ? "item" : "itens"},{" "}
            <strong>{formatarMoeda(pedido.total)}</strong>.
          </p>
          <p className="text-secondary small">Este é um projeto de estudo: nenhuma cobrança foi feita.</p>
          <Link to="/" className="carrinho-pg-vazio-btn">
            Continuar explorando <i className="bi bi-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="carrinho-pg-hero">
        <h1 className="carrinho-pg-hero-title">Seu carrinho de compras</h1>

        <div className="carrinho-pg-layout">
          <div>
            {itens.length === 0 ? (
              <div id="carrinho-pagina-vazio">
                <i className="bi bi-cart-x" aria-hidden="true"></i>
                <h2>Seu carrinho está vazio</h2>
                <p>Explore o catálogo e encontre o próximo jogo brasileiro para chamar de seu.</p>
                <Link to="/" className="carrinho-pg-vazio-btn">
                  Explorar jogos <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            ) : (
              <ul className="carrinho-pg-lista list-unstyled">
                {itens.map((item) => (
                  <li className="carrinho-pg-item" key={item.id}>
                    <img src={urlDaImagem(item.imagem)} alt={`Capa do jogo ${item.nome}`} className="carrinho-pg-item-img" />
                    <div className="carrinho-pg-item-info">
                      <div className="carrinho-pg-item-topo">
                        <div>
                          <h3 className="carrinho-pg-item-nome">{item.nome}</h3>
                          <p className="carrinho-pg-item-plataforma">Edição Digital PC</p>
                        </div>
                        <div className="carrinho-pg-item-preco-col">
                          <p className="carrinho-pg-item-preco">{formatarMoeda(item.preco * item.quantidade)}</p>
                          <p className="carrinho-pg-item-qtd-label">
                            {item.quantidade} {item.quantidade === 1 ? "item" : "itens"}
                          </p>
                        </div>
                      </div>
                      <div className="carrinho-pg-item-rodape">
                        <div className="carrinho-pg-item-qtd">
                          <button type="button" className="btn-qtd" aria-label={`Diminuir a quantidade de ${item.nome}`} onClick={() => mudarQuantidade(item.id, -1)}>
                            -
                          </button>
                          <span>{item.quantidade}</span>
                          <button type="button" className="btn-qtd" aria-label={`Aumentar a quantidade de ${item.nome}`} onClick={() => mudarQuantidade(item.id, 1)}>
                            +
                          </button>
                        </div>
                        <button type="button" className="carrinho-pg-remover" aria-label={`Remover ${item.nome} do carrinho`} onClick={() => remover(item.id)}>
                          Remover <i className="bi bi-trash ms-1" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {itens.length > 0 && (
            <div className="carrinho-pg-resumo">
              <div className="carrinho-pg-box">
                <h2 className="h3">Resumo</h2>
                <hr />
                <div className="carrinho-pg-linha">
                  <span>Subtotal ({resumo.totalItens} itens)</span>
                  <span>{formatarMoeda(resumo.subtotal)}</span>
                </div>
                <div className="carrinho-pg-linha">
                  <span>Taxas</span>
                  <span>{formatarMoeda(resumo.taxa)}</span>
                </div>
              </div>

              <form className="carrinho-pg-box" onSubmit={enviarCupom}>
                <h2 className="h3">Cupom de desconto</h2>
                <hr />
                <input
                  type="text"
                  id="cupom-input"
                  value={codigo}
                  onChange={(evento) => setCodigo(evento.target.value)}
                  placeholder="Digite o código"
                  aria-label="Código do cupom"
                  autoComplete="off"
                />
                <button type="submit" id="cupom-aplicar">
                  Aplicar
                </button>
                <p id="cupom-msg" className={mensagemCupom ? (mensagemCupom.ok ? "cupom-msg-sucesso" : "cupom-msg-erro") : ""} role="status">
                  {mensagemCupom?.texto}
                </p>
              </form>

              <div className="carrinho-pg-box">
                <h2 className="h3">Total</h2>
                <hr />
                <div className="carrinho-pg-linha destaque">
                  <span>Desconto</span>
                  <span>{formatarMoeda(resumo.desconto)}</span>
                </div>
                <div className="carrinho-pg-linha">
                  <span>Total</span>
                  <span>{formatarMoeda(resumo.total)}</span>
                </div>
                <hr />
                <button type="button" id="carrinho-continuar" onClick={finalizar}>
                  Continuar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="carrinho-pg-recomendados">
          <h2 className="carrinho-pg-recomendados-title">{itens.length === 0 ? "Jogos para você explorar" : "Recomendado com base na sua compra"}</h2>
          <div className="carrinho-pg-recomendados-grid">
            {recomendados.map((jogo) => (
              <CardJogo key={jogo.id} jogo={jogo} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
