import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { CHAVES, gravarJson, gravarTexto } from "../utils/armazenamento";
import { calcularResumo, carrinhoReducer, lerEstadoSalvo, validarCupom } from "../utils/carrinho";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [estado, despachar] = useReducer(carrinhoReducer, undefined, lerEstadoSalvo);
  const [gavetaAberta, setGavetaAberta] = useState(false);

  useEffect(() => {
    gravarJson(CHAVES.carrinho, estado.itens);
    gravarTexto(CHAVES.cupom, estado.cupom);
  }, [estado]);

  // A loja estática (ou outra aba) mexeu no carrinho: acompanha
  useEffect(() => {
    function aoMudarOArmazenamento(evento) {
      if (evento.key === CHAVES.carrinho || evento.key === CHAVES.cupom) {
        despachar({ tipo: "substituir", estado: lerEstadoSalvo() });
      }
    }
    window.addEventListener("storage", aoMudarOArmazenamento);
    return () => window.removeEventListener("storage", aoMudarOArmazenamento);
  }, []);

  const adicionar = useCallback((jogo) => {
    despachar({ tipo: "adicionar", jogo });
    setGavetaAberta(true);
  }, []);
  const remover = useCallback((id) => despachar({ tipo: "remover", id }), []);
  const mudarQuantidade = useCallback((id, mudanca) => despachar({ tipo: "quantidade", id, mudanca }), []);
  const limpar = useCallback(() => despachar({ tipo: "limpar" }), []);
  const abrirGaveta = useCallback(() => setGavetaAberta(true), []);
  const fecharGaveta = useCallback(() => setGavetaAberta(false), []);

  // Devolve a mensagem pra tela mostrar. Cupom errado tira o que estava aplicado; campo vazio não mexe em nada.
  const aplicarCupom = useCallback((texto) => {
    const resultado = validarCupom(texto);
    if (resultado.status === "ok") despachar({ tipo: "cupom", cupom: resultado.codigo });
    else if (resultado.status === "invalido") despachar({ tipo: "cupom", cupom: null });
    return resultado;
  }, []);

  const valor = useMemo(
    () => ({
      itens: estado.itens,
      cupom: estado.cupom,
      resumo: calcularResumo(estado.itens, estado.cupom),
      gavetaAberta,
      adicionar,
      remover,
      mudarQuantidade,
      limpar,
      aplicarCupom,
      abrirGaveta,
      fecharGaveta,
    }),
    [estado, gavetaAberta, adicionar, remover, mudarQuantidade, limpar, aplicarCupom, abrirGaveta, fecharGaveta],
  );

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>;
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) throw new Error("useCarrinho precisa estar dentro de <CarrinhoProvider>");
  return contexto;
}
