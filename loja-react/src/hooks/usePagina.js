import { useEffect } from "react";

// Título da aba do navegador
export function useTituloDaPagina(titulo) {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}

// Algumas telas precisam de uma classe no <body> (ex.: "pagina-interna" põe a navbar por cima da capa do jogo)
export function useClasseNoBody(classe, ativa = true) {
  useEffect(() => {
    if (!ativa) return undefined;
    document.body.classList.add(classe);
    return () => document.body.classList.remove(classe);
  }, [classe, ativa]);
}
