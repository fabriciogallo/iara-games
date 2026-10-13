import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext";
import { formatarMoeda } from "../utils/moeda";
import { urlDaImagem } from "../utils/imagens";

// O carrinho lateral que abre ao adicionar um jogo. Usa as classes do offcanvas do Bootstrap, mas quem abre e fecha é o React.
export default function CarrinhoGaveta() {
  const { itens, resumo, gavetaAberta, fecharGaveta, mudarQuantidade, remover } = useCarrinho();
  const botaoFechar = useRef(null);

  useEffect(() => {
    if (!gavetaAberta) return undefined;

    botaoFechar.current?.focus();
    const aoApertarTecla = (evento) => {
      if (evento.key === "Escape") fecharGaveta();
    };
    document.addEventListener("keydown", aoApertarTecla);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", aoApertarTecla);
      document.body.style.overflow = "";
    };
  }, [gavetaAberta, fecharGaveta]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end offcanvas-carrinho text-white${gavetaAberta ? " show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-gaveta"
        tabIndex={-1}
        inert={!gavetaAberta}
        style={{ backgroundColor: "#0d111a" }}
      >
        <div className="offcanvas-header border-bottom border-secondary border-opacity-50">
          <h5 className="offcanvas-title text-warning fw-bold" id="titulo-gaveta">
            <i className="bi bi-cart3 me-2" aria-hidden="true"></i>Seu carrinho
          </h5>
          <button ref={botaoFechar} type="button" className="btn-close btn-close-white" aria-label="Fechar carrinho" onClick={fecharGaveta}></button>
        </div>

        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <div>
            {itens.length === 0 ? (
              <div id="carrinho-vazio">
                <i className="bi bi-cart-x display-4 d-block mb-3" aria-hidden="true"></i>
                <p>Seu carrinho está vazio no momento.</p>
              </div>
            ) : (
              <ul className="list-unstyled m-0">
                {itens.map((item) => (
                  <li className="carrinho-item" key={item.id}>
                    <img src={urlDaImagem(item.imagem)} alt="" className="carrinho-item-img" />
                    <div>
                      <p className="carrinho-item-nome">{item.nome}</p>
                      <p className="carrinho-item-preco">{formatarMoeda(item.preco * item.quantidade)}</p>
                      <div className="carrinho-item-qtd">
                        <button type="button" className="btn-qtd" aria-label={`Diminuir a quantidade de ${item.nome}`} onClick={() => mudarQuantidade(item.id, -1)}>
                          -
                        </button>
                        <span aria-label={`${item.quantidade} no carrinho`}>{item.quantidade}</span>
                        <button type="button" className="btn-qtd" aria-label={`Aumentar a quantidade de ${item.nome}`} onClick={() => mudarQuantidade(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button type="button" className="carrinho-item-remover" title="Remover item" aria-label={`Remover ${item.nome} do carrinho`} onClick={() => remover(item.id)}>
                      <i className="bi bi-trash" aria-hidden="true"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="carrinho-rodape pt-3 border-top border-secondary border-opacity-50">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-secondary fw-semibold">Subtotal:</span>
              <span className="fs-5 fw-bold text-warning">{formatarMoeda(resumo.subtotal)}</span>
            </div>
            <Link to="/carrinho" className="btn btn-warning w-100 fw-bold py-2" onClick={fecharGaveta}>
              Ver carrinho completo <i className="bi bi-arrow-right ms-1" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>

      {gavetaAberta && <div className="offcanvas-backdrop fade show" onClick={fecharGaveta}></div>}
    </>
  );
}
