import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const AvisosContext = createContext(null);

const DURACAO_MS = 2800;

// Aviso rápido no canto da tela ("Dandara entrou nos favoritos"). Um aviso novo substitui o anterior.
export function AvisosProvider({ children }) {
  const [aviso, setAviso] = useState(null);
  const relogio = useRef(null);

  const avisar = useCallback((texto) => {
    clearTimeout(relogio.current);
    setAviso({ texto, id: Date.now() });
    relogio.current = setTimeout(() => setAviso(null), DURACAO_MS);
  }, []);

  const valor = useMemo(() => ({ aviso, avisar }), [aviso, avisar]);
  return <AvisosContext.Provider value={valor}>{children}</AvisosContext.Provider>;
}

export function useAvisos() {
  const contexto = useContext(AvisosContext);
  if (!contexto) throw new Error("useAvisos precisa estar dentro de <AvisosProvider>");
  return contexto;
}
